/**
 * api.js — lớp giao tiếp API dùng chung cho toàn bộ website.
 *
 * Mọi lời gọi API trong dự án đều nên đi qua hàm `apiRequest()` bên dưới,
 * thay vì gọi `fetch()` trực tiếp ở từng trang. Điều này giúp:
 *  - Tự động gắn Authorization header khi có access token.
 *  - Tự động refresh token khi gặp lỗi 401, rồi gọi lại request ban đầu.
 *  - Đăng xuất & điều hướng về trang login khi refresh token cũng hết hạn.
 *
 * LƯU Ý VỀ ĐỀ BÀI: đề bài không mô tả chi tiết hình dạng JSON trả về của
 * API (ví dụ field tên là "access_token" hay "accessToken", dữ liệu danh
 * sách nằm trực tiếp trong body hay trong "data"...). Các hàm helper phía
 * dưới (extractTokens, extractUser, extractList) được viết để "dò" nhiều
 * khả năng đặt tên phổ biến nhất, để code không bị vỡ nếu API đặt tên
 * khác một chút. Nếu bạn mở DevTools > Network và thấy field thực tế khác,
 * chỉ cần bổ sung thêm case vào các hàm extract* này.
 */

const BASE_URL = "https://spotify.f8team.dev";

const STORAGE_KEYS = {
  access: "nhip_access_token",
  refresh: "nhip_refresh_token",
  user: "nhip_user",
};

/* ------------------------------------------------------------------ */
/* Lưu trữ token / user trong localStorage                             */
/* ------------------------------------------------------------------ */

function getAccessToken() {
  return localStorage.getItem(STORAGE_KEYS.access);
}

function getRefreshToken() {
  return localStorage.getItem(STORAGE_KEYS.refresh);
}

function getStoredUser() {
  const raw = localStorage.getItem(STORAGE_KEYS.user);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function setSession({ accessToken, refreshToken, user } = {}) {
  if (accessToken) localStorage.setItem(STORAGE_KEYS.access, accessToken);
  if (refreshToken) localStorage.setItem(STORAGE_KEYS.refresh, refreshToken);
  if (user) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.access);
  localStorage.removeItem(STORAGE_KEYS.refresh);
  localStorage.removeItem(STORAGE_KEYS.user);
}

function isLoggedIn() {
  return Boolean(getAccessToken());
}

/* ------------------------------------------------------------------ */
/* Helpers để "dò" hình dạng JSON trả về từ API                        */
/* ------------------------------------------------------------------ */

function extractTokens(json) {
  const src = json?.data ?? json ?? {};
  const accessToken =
    src.access_token || src.accessToken || src.token || json?.access_token || json?.accessToken;
  const refreshToken =
    src.refresh_token || src.refreshToken || json?.refresh_token || json?.refreshToken;
  return { accessToken, refreshToken };
}

function extractUser(json) {
  return json?.data?.user || json?.user || json?.data || json || null;
}

/**
 * Cố gắng lấy ra mảng dữ liệu từ nhiều hình dạng response khác nhau:
 *  - [ ... ]                              (mảng thẳng)
 *  - { data: [ ... ] }
 *  - { data: { items: [ ... ] } }
 *  - { <key>: [ ... ] }                   (ví dụ { artists: [...] })
 */
function extractList(json, key) {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.data?.items)) return json.data.items;
  if (Array.isArray(json?.data?.[key])) return json.data[key];
  if (Array.isArray(json?.[key])) return json[key];
  if (Array.isArray(json?.items)) return json.items;
  return [];
}

/* ------------------------------------------------------------------ */
/* Request chính, có auto-refresh khi 401                              */
/* ------------------------------------------------------------------ */

let refreshInFlight = null;

async function refreshAccessToken() {
  // Gộp nhiều request 401 xảy ra cùng lúc thành 1 lần gọi refresh-token duy nhất
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    try {
      const res = await fetch(`${BASE_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken, refreshToken }),
      });
      if (!res.ok) return false;

      const json = await res.json().catch(() => null);
      const { accessToken, refreshToken: newRefreshToken } = extractTokens(json);
      if (!accessToken) return false;

      setSession({
        accessToken,
        refreshToken: newRefreshToken || refreshToken,
      });
      return true;
    } catch (err) {
      return false;
    }
  })();

  const result = await refreshInFlight;
  refreshInFlight = null;
  return result;
}

function goToLogin() {
  clearSession();
  const onLoginPage = location.pathname.endsWith("login.html");
  if (!onLoginPage) {
    window.location.href = "login.html";
  }
}

/**
 * @param {string} endpoint  Ví dụ "/api/artists?limit=20&offset=0"
 * @param {RequestInit & { skipAuth?: boolean }} options
 * @param {boolean} _isRetry  Dùng nội bộ để chỉ retry 1 lần, tránh loop vô hạn
 */
async function apiRequest(endpoint, options = {}, _isRetry = false) {
  const { skipAuth = false, headers: customHeaders, ...rest } = options;

  const headers = new Headers(customHeaders || {});
  if (rest.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const token = getAccessToken();
  if (token && !skipAuth) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let res;
  try {
    res = await fetch(`${BASE_URL}${endpoint}`, { ...rest, headers });
  } catch (networkErr) {
    throw new Error("Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng và thử lại.");
  }

  // Access token hết hạn -> thử refresh rồi gọi lại request gốc đúng 1 lần
  if (res.status === 401 && !skipAuth && !_isRetry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiRequest(endpoint, options, true);
    }
    goToLogin();
    throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
  }

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      json?.message ||
      json?.error?.message ||
      (Array.isArray(json?.errors) ? json.errors.join(", ") : null) ||
      "Đã có lỗi xảy ra, vui lòng thử lại.";
    throw new Error(message);
  }

  return json;
}

/* ------------------------------------------------------------------ */
/* Các hàm API cụ thể theo đề bài                                      */
/* ------------------------------------------------------------------ */

const Api = {
  async register({ username, email, password, display_name, bio, country }) {
    const json = await apiRequest("/api/auth/register", {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify({ username, email, password, display_name, bio, country }),
    });
    return json;
  },

  async login({ email, password }) {
    const json = await apiRequest("/api/auth/login", {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify({ email, password }),
    });
    return json;
  },

  async getMe() {
    const json = await apiRequest("/api/users/me");
    return extractUser(json);
  },

  async getArtists({ limit = 20, offset = 0 } = {}) {
    const json = await apiRequest(`/api/artists?limit=${limit}&offset=${offset}`, {
      skipAuth: true,
    });
    return extractList(json, "artists");
  },

  async getAlbums({ limit = 20, offset = 0 } = {}) {
    const json = await apiRequest(`/api/albums?limit=${limit}&offset=${offset}`, {
      skipAuth: true,
    });
    return extractList(json, "albums");
  },

  async getTracks({ limit = 50, offset = 0 } = {}) {
    const json = await apiRequest(`/api/tracks?limit=${limit}&offset=${offset}`, {
      skipAuth: true,
    });
    return extractList(json, "tracks");
  },

  // Đề bài ghi URL của "playlists" trùng với URL của "tracks"
  // (nhiều khả năng là lỗi đánh máy trong đề). Ở đây mình ưu tiên thử
  // endpoint hợp lý /api/playlists trước; nếu không tồn tại (404/lỗi)
  // thì rơi về đúng URL đề bài đã ghi để trang chủ không bao giờ vỡ.
  async getPlaylists({ limit = 50, offset = 0 } = {}) {
    try {
      const json = await apiRequest(`/api/playlists?limit=${limit}&offset=${offset}`, {
        skipAuth: true,
      });
      const list = extractList(json, "playlists");
      if (list.length) return list;
      return list;
    } catch (err) {
      const json = await apiRequest(`/api/tracks?limit=${limit}&offset=${offset}`, {
        skipAuth: true,
      });
      return extractList(json, "tracks");
    }
  },
};
