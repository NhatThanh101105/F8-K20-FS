// --- 1. LẤY THÔNG TIN TỪ BOM ---
let bomData = {};

function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes("Chrome")) return "Google Chrome";
    if (ua.includes("Firefox")) return "Mozilla Firefox";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Apple Safari";
    if (ua.includes("Edge")) return "Microsoft Edge";
    return "Khác";
}

function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes("Win")) return "Windows";
    if (ua.includes("Mac")) return "MacOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("like Mac")) return "iOS";
    return "Khác";
}

function updateOnlineStatus() {
    const statusEl = document.querySelector('#online-status');
    const iconEl = document.querySelector('#online-icon');
    bomData.isOnline = navigator.onLine;
    
    if(navigator.onLine) {
        statusEl.innerText = 'Online';
        iconEl.className = 'w-3 h-3 rounded-full bg-green-500 inline-block mr-2';
    } else {
        statusEl.innerText = 'Offline';
        iconEl.className = 'w-3 h-3 rounded-full bg-red-500 inline-block mr-2';
    }
}

function initBOMData() {
    // Cơ bản
    bomData.browser = getBrowser();
    bomData.os = getOS();
    bomData.language = navigator.languages.join(', ');
    bomData.screenSize = `${screen.width}x${screen.height}`;
    bomData.orientation = screen.orientation ? screen.orientation.type : 'Không rõ';
    
    document.querySelector('#browser-info').innerText = bomData.browser;
    document.querySelector('#os-info').innerText = bomData.os;
    document.querySelector('#lang-info').innerText = bomData.language;
    document.querySelector('#screen-info').innerText = bomData.screenSize;
    document.querySelector('#orientation-info').innerText = bomData.orientation;

    // Mạng
    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Vị trí
    const geoInfoEl = document.querySelector('#geo-info');
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                bomData.lat = position.coords.latitude;
                bomData.lon = position.coords.longitude;
                geoInfoEl.innerText = `Lat: ${bomData.lat.toFixed(4)}, Lon: ${bomData.lon.toFixed(4)}`;
            },
            (error) => {
                bomData.lat = 'Từ chối';
                bomData.lon = 'Từ chối';
                geoInfoEl.innerText = "Người dùng từ chối cấp quyền vị trí";
            }
        );
    } else {
        geoInfoEl.innerText = "Trình duyệt không hỗ trợ Geolocation";
    }
}

// --- 2. XỬ LÝ SPA (Single Page Application) ---
const homeView = document.querySelector('#home-view');
const fingerprintView = document.querySelector('#fingerprint-view');
const fingerprintDataEl = document.querySelector('#fingerprint-data');

function showView(view) {
    if (view === 'fingerprint') {
        homeView.classList.replace('block', 'hidden');
        fingerprintView.classList.replace('hidden', 'block');
    } else {
        homeView.classList.replace('hidden', 'block');
        fingerprintView.classList.replace('block', 'hidden');
    }
}

// Click đi tới Fingerprint
document.querySelector('#btn-fingerprint').addEventListener('click', () => {
    const stateObj = { 
        view: 'fingerprint', 
        data: bomData 
    };
    history.pushState(stateObj, "Fingerprinting", "?page=fingerprinting");
    renderFingerprint(stateObj.data);
    showView('fingerprint');
});

// Click nút Quay về
document.querySelector('#btn-back').addEventListener('click', () => {
    history.back(); 
});

function renderFingerprint(data) {
    const rawString = `${data.browser}|${data.os}|${data.screenSize}|${data.language}|${data.orientation}|${data.lat}|${data.lon}`;
    fingerprintDataEl.innerText = rawString;
}

window.addEventListener('popstate', (e) => {
    if (e.state && e.state.view === 'fingerprint') {
        renderFingerprint(e.state.data);
        showView('fingerprint');
    } else {
        showView('home');
    }
});

// Chạy khởi tạo khi file được load
initBOMData();