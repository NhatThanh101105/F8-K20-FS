const homeState = {
  artist: [],
  album: [],
  track: [],
  playlist: [],
};

document.addEventListener("DOMContentLoaded", () => {
  renderTopbar("home");
  setGreeting();
  setupSectionToggles();
  setupSearch();

  loadSection({
    mount: "#row-artists",
    countMount: "#count-artists",
    fetcher: () => Api.getArtists({ limit: 20, offset: 0 }),
    cardType: "artist",
    emptyLabel: "nghệ sĩ",
  });
  loadSection({
    mount: "#row-albums",
    countMount: "#count-albums",
    fetcher: () => Api.getAlbums({ limit: 20, offset: 0 }),
    cardType: "album",
    emptyLabel: "album",
  });
  loadSection({
    mount: "#row-tracks",
    countMount: "#count-tracks",
    fetcher: () => Api.getTracks({ limit: 50, offset: 0 }),
    cardType: "track",
    emptyLabel: "bài hát",
  });
  loadSection({
    mount: "#row-playlists",
    countMount: "#count-playlists",
    fetcher: () => Api.getPlaylists({ limit: 50, offset: 0 }),
    cardType: "playlist",
    emptyLabel: "playlist",
  });
});

function setGreeting() {
  const el = document.querySelector("#greeting");
  const user = getStoredUser();
  if (!el) return;
  el.textContent = user
    ? `Chào mừng trở lại, ${user.display_name || user.username}`
    : "Khám phá kho nhạc — đăng nhập để lưu lại lựa chọn của bạn";
}

/* ------------------------------------------------------------------ */
/* "Xem tất cả" — chuyển 1 section giữa hàng cuộn ngang <-> lưới       */
/* ------------------------------------------------------------------ */

function setupSectionToggles() {
  document.querySelectorAll("[data-toggle-for]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = document.querySelector(`#${btn.dataset.toggleFor}`);
      if (!row) return;
      
      const expanded = !row.classList.contains("grid");
      if (expanded) {
        row.classList.remove("flex", "overflow-x-auto", "pb-[6px]", "scroll-smooth", "scroll-row");
        row.classList.add("grid", "grid-cols-[repeat(auto-fill,minmax(150px,1fr))]");
      } else {
        row.classList.remove("grid", "grid-cols-[repeat(auto-fill,minmax(150px,1fr))]");
        row.classList.add("flex", "overflow-x-auto", "pb-[6px]", "scroll-smooth", "scroll-row");
      }
      
      btn.textContent = expanded ? "Thu gọn" : "Xem tất cả";
    });
  });
}

/* ------------------------------------------------------------------ */
/* Tìm kiếm cục bộ trên dữ liệu đã tải (API không cung cấp endpoint     */
/* search riêng, nên lọc theo tên/tiêu đề trên 4 danh sách đã có).      */
/* ------------------------------------------------------------------ */

function setupSearch() {
  const input = document.querySelector("#home-search");
  if (!input) return;

  let debounceTimer = null;
  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => applySearch(input.value.trim()), 150);
  });
}

function applySearch(query) {
  const note = document.querySelector("#search-results-note");
  const sections = [
    { key: "artist", mount: "#row-artists", count: "#count-artists" },
    { key: "album", mount: "#row-albums", count: "#count-albums" },
    { key: "track", mount: "#row-tracks", count: "#count-tracks" },
    { key: "playlist", mount: "#row-playlists", count: "#count-playlists" },
  ];

  if (!query) {
    note.classList.add("hidden");
    sections.forEach(({ key, mount, count }) => {
      const el = document.querySelector(mount);
      el.classList.remove("grid", "grid-cols-[repeat(auto-fill,minmax(150px,1fr))]");
      el.classList.add("flex", "overflow-x-auto", "pb-[6px]", "scroll-smooth", "scroll-row");
      renderItemsInto(el, homeState[key], key);
      document.querySelector(count).textContent = homeState[key].length
        ? `${homeState[key].length} mục`
        : "";
    });
    document.querySelectorAll("[data-toggle-for]").forEach((btn) => (btn.textContent = "Xem tất cả"));
    return;
  }

  const q = query.toLowerCase();
  let totalMatches = 0;

  sections.forEach(({ key, mount, count }) => {
    const el = document.querySelector(mount);
    const matches = homeState[key].filter((item) => pickTitle(item).toLowerCase().includes(q));
    totalMatches += matches.length;
    el.classList.remove("flex", "overflow-x-auto", "pb-[6px]", "scroll-smooth", "scroll-row");
    el.classList.add("grid", "grid-cols-[repeat(auto-fill,minmax(150px,1fr))]");
    if (matches.length) {
      renderItemsInto(el, matches, key);
    } else {
      el.innerHTML = `<div class="col-span-full border border-dashed border-borderSubtle rounded-[14px] py-[34px] px-[20px] text-center text-textMuted w-full">Không tìm thấy kết quả phù hợp.</div>`;
    }
    document.querySelector(count).textContent = matches.length ? `${matches.length} mục` : "";
  });

  note.textContent = `Kết quả tìm kiếm cho "${query}" — ${totalMatches} mục phù hợp`;
  note.classList.remove("hidden");
}

/* ------------------------------------------------------------------ */
/* Helpers trích xuất field linh hoạt theo nhiều hình dạng dữ liệu     */
/* ------------------------------------------------------------------ */

function pickImage(item) {
  return (
    item.image_url || item.avatar_url || item.cover_url || item.cover_image ||
    item.thumbnail_url || item.thumbnail || item.image || item.cover || item.avatar || ""
  );
}

function pickTitle(item) {
  return item.name || item.title || item.display_name || "Không tên";
}

function formatDuration(item) {
  const raw = item.duration_ms ?? item.duration;
  if (raw == null) return "";
  const totalSeconds = raw > 1000 ? Math.round(raw / 1000) : Math.round(raw);
  const m = Math.floor(totalSeconds / 60);
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function pickSubtitle(item, cardType) {
  switch (cardType) {
    case "artist":
      return item.genre || item.country || item.bio || "Nghệ sĩ";
    case "album":
      return (
        item.artist?.name || item.artist_name ||
        (item.release_date ? `Phát hành ${String(item.release_date).slice(0, 4)}` : "Album")
      );
    case "track": {
      const artist = item.artist?.name || item.artist_name || item.album?.name || "";
      const duration = formatDuration(item);
      return [artist, duration].filter(Boolean).join(" · ") || "Bài hát";
    }
    case "playlist":
      return (
        item.description ||
        (item.tracks_count || item.total_tracks ? `${item.tracks_count || item.total_tracks} bài hát` : "Playlist")
      );
    default:
      return "";
  }
}

/* ------------------------------------------------------------------ */
/* Render                                                              */
/* ------------------------------------------------------------------ */

function renderSkeletons(mount, count = 8) {
  mount.innerHTML = Array.from({ length: count })
    .map(
      () => `
      <div class="bg-surface border border-transparent rounded-[14px] p-[12px] shrink-0 w-full [.scroll-row_&]:w-[168px] transition-all hover:bg-surface2 hover:border-borderSubtle hover:-translate-y-[2px] group">
        <div class="relative w-full aspect-square rounded-[10px] overflow-hidden bg-gradient-to-br from-[#23232f] to-[#17171f] mb-[10px] bg-surface2 after:absolute after:inset-0 after:-translate-x-full after:bg-[linear-gradient(90deg,transparent,#ffffff10,transparent)] after:animate-skeleton-sweep"></div>
        <div class="h-[12px] rounded-[4px] w-[80%] mb-[6px] relative overflow-hidden bg-surface2 after:absolute after:inset-0 after:-translate-x-full after:bg-[linear-gradient(90deg,transparent,#ffffff10,transparent)] after:animate-skeleton-sweep"></div>
        <div class="h-[10px] rounded-[4px] w-[55%] relative overflow-hidden bg-surface2 after:absolute after:inset-0 after:-translate-x-full after:bg-[linear-gradient(90deg,transparent,#ffffff10,transparent)] after:animate-skeleton-sweep"></div>
      </div>`
    )
    .join("");
}

function renderCard(item, cardType) {
  const image = pickImage(item);
  const title = pickTitle(item);
  const subtitle = pickSubtitle(item, cardType);
  const roundArt = cardType === "artist";

  const artInner = image
    ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(title)}" loading="lazy" class="w-full h-full object-cover" onerror="this.remove();" />`
    : "";

  return `
    <div class="bg-surface border border-transparent rounded-[14px] p-[12px] shrink-0 w-full [.scroll-row_&]:w-[168px] transition-all hover:bg-surface2 hover:border-borderSubtle hover:-translate-y-[2px] group relative">
      <div class="relative w-full aspect-square ${roundArt ? "rounded-full" : "rounded-[10px]"} overflow-hidden bg-gradient-to-br from-[#23232f] to-[#17171f] mb-[10px]">
        ${artInner}
        <div class="absolute bottom-[8px] right-[8px] w-[34px] h-[34px] rounded-full bg-accent flex items-center justify-center opacity-0 translate-y-[6px] transition-all duration-150 ease-out group-hover:opacity-100 group-hover:translate-y-0 shadow-[0_6px_18px_#00000066]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#14141c"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
      <p class="text-[0.86rem] font-bold text-textPrimary overflow-hidden text-ellipsis whitespace-nowrap" title="${escapeHtml(title)}">${escapeHtml(title)}</p>
      <p class="text-[0.76rem] text-textMuted mt-[2px] overflow-hidden text-ellipsis whitespace-nowrap" title="${escapeHtml(subtitle)}">${escapeHtml(subtitle)}</p>
    </div>`;
}

function renderItemsInto(mountEl, items, cardType) {
  mountEl.innerHTML = items.map((item) => renderCard(item, cardType)).join("");
}

function renderEmptyOrError(mount, { isError, label }) {
  mount.innerHTML = `
    <div class="border border-dashed border-borderSubtle rounded-[14px] py-[34px] px-[20px] text-center text-textMuted w-full">
      ${
        isError
          ? `<p class="text-white/70 font-medium mb-1">Không thể tải danh sách ${label}.</p>
             <p class="text-sm">Vui lòng thử tải lại trang.</p>`
          : `<p>Chưa có ${label} nào để hiển thị.</p>`
      }
    </div>`;
}

async function loadSection({ mount, countMount, fetcher, cardType, emptyLabel }) {
  const mountEl = document.querySelector(mount);
  const countEl = countMount ? document.querySelector(countMount) : null;
  if (!mountEl) return;

  renderSkeletons(mountEl);

  try {
    const items = await fetcher();
    homeState[cardType] = items || [];

    if (!items || items.length === 0) {
      renderEmptyOrError(mountEl, { isError: false, label: emptyLabel });
      if (countEl) countEl.textContent = "";
      return;
    }
    renderItemsInto(mountEl, items, cardType);
    if (countEl) countEl.textContent = `${items.length} mục`;
  } catch (err) {
    renderEmptyOrError(mountEl, { isError: true, label: emptyLabel });
    if (countEl) countEl.textContent = "";
    showToast(err.message || `Lỗi khi tải ${emptyLabel}.`);
  }
}
