document.addEventListener("DOMContentLoaded", async () => {
  // Trang cá nhân chỉ truy cập được khi đã đăng nhập
  if (!isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  renderTopbar("profile");

  const loadingEl = document.querySelector("#profile-loading");
  const errorEl = document.querySelector("#profile-error");
  const contentEl = document.querySelector("#profile-content");

  try {
    // getMe() bên trong dùng apiRequest(), nên nếu access token hết hạn
    // sẽ tự động refresh và gọi lại request này giúp mình.
    const user = await Api.getMe();
    if (!user) throw new Error("Không nhận được dữ liệu người dùng.");

    setSession({ user }); // đồng bộ lại cache local với dữ liệu mới nhất
    renderProfile(user);

    loadingEl.classList.add("hidden");
    contentEl.classList.remove("hidden");
  } catch (err) {
    loadingEl.classList.add("hidden");
    errorEl.textContent = err.message || "Không thể tải thông tin cá nhân.";
    errorEl.classList.remove("hidden");
  }
});

const FIELD_LABELS = {
  email: "Email",
  bio: "Giới thiệu",
  country: "Quốc gia",
  created_at: "Ngày tạo tài khoản",
  createdAt: "Ngày tạo tài khoản",
  followers: "Người theo dõi",
  following: "Đang theo dõi",
  role: "Vai trò",
  status: "Trạng thái",
  phone: "Số điện thoại",
  gender: "Giới tính",
  birthday: "Ngày sinh",
};

// Các field đã hiển thị riêng ở phần header, hoặc field kỹ thuật không cần lộ ra
const HIDDEN_FIELDS = new Set([
  "id",
  "_id",
  "password",
  "access_token",
  "refresh_token",
  "accessToken",
  "refreshToken",
  "username",
  "display_name",
  "name",
  "avatar_url",
  "avatar",
  "image_url",
  "image",
  "__v",
  "updated_at",
  "updatedAt",
]);

function renderProfile(user) {
  const displayName = user.display_name || user.name || user.username || "Người dùng";
  const avatarUrl = user.avatar_url || user.avatar || user.image_url || user.image;

  document.querySelector("#profile-name").textContent = displayName;
  document.querySelector("#profile-username").textContent = user.username
    ? `@${user.username}`
    : user.email || "";

  const avatarWrap = document.querySelector("#profile-avatar-wrap");
  if (avatarUrl) {
    avatarWrap.innerHTML = `<img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(displayName)}" style="width:100%;height:100%;object-fit:cover;border-radius:999px;" />`;
  } else {
    avatarWrap.textContent = initials(displayName);
  }

  const dl = document.querySelector("#profile-fields");
  const rows = [];

  if (user.email) {
    rows.push(fieldRow("Email", user.email));
  }

  Object.entries(user).forEach(([key, value]) => {
    if (HIDDEN_FIELDS.has(key)) return;
    if (key === "email") return; // đã hiển thị ở trên
    if (value == null || value === "") return;
    if (typeof value === "object") return; // bỏ qua object/array lồng nhau phức tạp

    const label = FIELD_LABELS[key] || humanizeKey(key);
    rows.push(fieldRow(label, String(value)));
  });

  dl.innerHTML = rows.join("") || `<p class="text-white/50 text-sm">Không có thêm thông tin nào khác.</p>`;
}

function fieldRow(label, value) {
  return `
    <div class="p-4 rounded-xl bg-surface border border-borderSubtle">
      <dt class="text-xs text-white/40 mb-1">${escapeHtml(label)}</dt>
      <dd class="text-sm font-medium">${escapeHtml(value)}</dd>
    </div>`;
}

function humanizeKey(key) {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}
