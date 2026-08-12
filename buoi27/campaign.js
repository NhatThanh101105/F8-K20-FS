// Lấy query string từ URL
const params = new URLSearchParams(window.location.search);
const contentDiv = document.querySelector('#campaign-content');

// Kiểm tra xem có tham số quảng cáo không
if (params.toString() !== "") {
    const utmSource = params.get('utm_source') || 'Không xác định';
    const utmCampaign = params.get('utm_campaign') || 'Không xác định';

    contentDiv.innerHTML = `
        <div class="grid grid-cols-2 gap-4 text-left bg-gray-100 p-4 rounded-lg mb-6">
            <div>
                <span class="block text-sm text-gray-500 font-semibold">Tên Nguồn (utm_source)</span>
                <span class="text-lg font-medium text-gray-800">${utmSource}</span>
            </div>
            <div>
                <span class="block text-sm text-gray-500 font-semibold">Chiến Dịch (utm_campaign)</span>
                <span class="text-lg font-medium text-gray-800">${utmCampaign}</span>
            </div>
        </div>
        
        <div class="mt-6 border-t pt-6">
            <h2 class="text-xl font-bold mb-4">Sản Phẩm Khuyến Mãi</h2>
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Đồng hồ thông minh" 
                 class="w-full h-64 object-cover rounded-lg shadow-md mb-4 hover:opacity-90 transition">
            <p class="text-gray-600">Khám phá thế hệ đồng hồ thông minh mới nhất với thiết kế tinh xảo và tính năng vượt trội. Đặt hàng ngay hôm nay qua chiến dịch <strong>${utmCampaign}</strong> để nhận ưu đãi!</p>
        </div>
    `;
} else {
    contentDiv.innerHTML = `
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">Không có tham số quảng cáo</span>
        </div>
        <p class="text-gray-500 mt-4 text-sm">Vui lòng truy cập từ trang chủ để có tham số chiến dịch.</p>
    `;
}