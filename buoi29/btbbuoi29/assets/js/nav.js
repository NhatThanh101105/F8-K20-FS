/**
 * nav.js — vẽ thanh nav trên cùng (topbar) dùng chung cho cả 4 trang,
 * theo đúng bố cục tham khảo: logo + nút Home bên trái, ô tìm kiếm ở giữa,
 * khu vực đăng nhập / đăng ký (hoặc avatar + đăng xuất) bên phải.
 *
 * Mỗi trang chỉ cần có sẵn <div id="app-topbar"></div> và gọi
 * renderTopbar("home" | "profile" | "login" | "register").
 */

function initials(name) {
  if (!name) return "?";
  const parts = String(name).trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderTopbar(active) {
  const mount = document.querySelector("#app-topbar");
  if (!mount) return;

  const loggedIn = isLoggedIn();
  const user = getStoredUser();



  const searchArea =
    active === "home"
      ? `
      <div class="flex-1 max-w-[420px] relative max-sm:hidden">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-[14px] top-1/2 -translate-y-1/2 text-textMuted">
          <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5" stroke-linecap="round"/>
        </svg>
        <input id="home-search" type="text" placeholder="Tìm nghệ sĩ, album, bài hát, playlist..." autocomplete="off" class="w-full bg-surface border border-borderSubtle rounded-full py-[10px] pr-[16px] pl-[40px] text-[0.86rem] text-textPrimary transition-colors focus:outline-none focus:border-accent" />
      </div>`
      : `<div class="flex-1"></div>`;

  const authArea = loggedIn
    ? `
      <a href="profile.html" class="flex items-center gap-[10px] py-[5px] pr-[6px] pl-[5px] rounded-full border border-borderSubtle bg-surface" title="Xem trang cá nhân">
        <div class="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-accent to-[#ff8a4d] flex items-center justify-center text-[0.72rem] font-bold text-[#14141c] shrink-0 overflow-hidden">${initials(user?.display_name || user?.username)}</div>
        <span class="text-[0.82rem] font-bold max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">${escapeHtml(user?.display_name || user?.username || "Người dùng")}</span>
      </a>
      <button id="btn-logout" class="w-[32px] h-[32px] rounded-full flex items-center justify-center text-textSecondary border border-transparent transition-colors hover:text-accent hover:border-accent" type="button" title="Đăng xuất">
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 17.5 20 12l-5-5.5M20 12H9" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 19H6a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 6 5h6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>`
    : `
      <a href="register.html" class="text-[0.86rem] font-bold text-textSecondary transition-colors hover:text-textPrimary">Đăng ký</a>
      <a href="login.html" class="inline-flex items-center justify-center gap-[8px] bg-accent text-[#17070c] font-bold text-[0.82rem] py-[8px] px-[18px] rounded-full transition-all hover:brightness-[1.08] active:scale-[0.98]">Đăng nhập</a>`;

  mount.innerHTML = `
    <div class="flex-1 flex justify-start">
      <a href="index.html" class="flex items-center gap-[9px] shrink-0 no-underline" title="Trang chủ">
        <svg viewBox="0 0 24 24" fill="#1ed760" class="w-[26px] h-[26px]" aria-hidden="true">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </a>
    </div>
    ${searchArea}
    <div class="flex-1 flex items-center justify-end gap-[14px] shrink-0">${authArea}</div>
  `;

  const logoutBtn = mount.querySelector("#btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      clearSession();
      window.location.href = "login.html";
    });
  }
}

function showToast(message, type = "error") {
  const container = document.querySelector("#toast-root") || createToastRoot();
  const toast = document.createElement("div");
  const baseClass = "bg-surface2 border border-borderSubtle border-l-[3px] py-[12px] px-[16px] rounded-[10px] text-[0.85rem] max-w-[320px] shadow-[0_12px_30px_#00000055] opacity-0 translate-y-[8px] transition-all duration-200 ease-out";
  const typeClass = type === "success" ? "border-l-accent2" : "border-l-accent";
  toast.className = `${baseClass} ${typeClass}`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0", "translate-y-[8px]");
    toast.classList.add("opacity-100", "translate-y-0");
  });
  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-[8px]");
    setTimeout(() => toast.remove(), 250);
  }, 4000);
}

function createToastRoot() {
  const div = document.createElement("div");
  div.id = "toast-root";
  div.className = "fixed bottom-[20px] right-[20px] flex flex-col gap-[8px] z-[100]";
  document.body.appendChild(div);
  return div;
}
