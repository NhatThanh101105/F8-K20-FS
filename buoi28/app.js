let skip = 0;
const limit = 15; 
let currentSearch = '';
let currentCategory = '';
let currentSort = '';
let totalProducts = 0;

const grid = document.querySelector('.product-grid');
const loading = document.querySelector('.loading-state');
const errorState = document.querySelector('.error-state');
const searchInput = document.querySelector('.search-input');
const categoryFilter = document.querySelector('.category-filter');
const sortSelect = document.querySelector('.sort-select');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const pageInfo = document.querySelector('.page-info');

const fetchCategories = async () => {
    try {
        const res = await fetch('https://dummyjson.com/products/categories');
        const categories = await res.json();
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.slug || category; 
            option.textContent = category.name || category;
            categoryFilter.appendChild(option);
        });
    } catch (err) {
        console.error('Lỗi tải danh mục:', err);
    }
};

const fetchProducts = async () => {
    try {
        grid.innerHTML = '';
        errorState.classList.add('hidden');
        loading.classList.remove('hidden');
        
        let url = `https://dummyjson.com/products`;
        
        if (currentSearch) {
            url += `/search?q=${currentSearch}&`;
        } else if (currentCategory) {
            url += `/category/${currentCategory}?`;
        } else {
            url += `?`;
        }
        
        url += `limit=${limit}&skip=${skip}`;
        
        if (currentSort) {
            const [field, order] = currentSort.split('-');
            url += `&sortBy=${field}&order=${order}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Không thể kết nối đến máy chủ');
        
        const data = await response.json();
        totalProducts = data.total;
        
        loading.classList.add('hidden');
        
        if (data.products.length === 0) {
            errorState.textContent = 'Không tìm thấy sản phẩm nào.';
            errorState.classList.remove('hidden');
            return;
        }

        renderProducts(data.products);
        updatePagination();

    } catch (error) {
        loading.classList.add('hidden');
        errorState.textContent = 'Đã có lỗi xảy ra: ' + error.message;
        errorState.classList.remove('hidden');
    }
};

const renderProducts = (products) => {
    grid.innerHTML = products.map(product => {
        const salePrice = product.price * (1 - product.discountPercentage / 100);
        
        // Tạo HTML cho sao đánh giá (Rating)
        const ratingStars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
        
        return `
            <a href="detail.html?id=${product.id}" class="bg-white hover:border-[#ee4d2d] border border-transparent shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 flex flex-col relative group">
                <div class="absolute top-0 right-0 w-10 h-10 bg-[rgba(255,212,36,1)] flex flex-col items-center justify-center text-[#ee4d2d] z-10">
                    <span class="text-[10px] leading-none mt-1 font-semibold">GIẢM</span>
                    <span class="text-[11px] font-bold">${Math.round(product.discountPercentage)}%</span>
                    <div class="absolute -bottom-1 w-full border-solid border-t-[4px] border-t-[rgba(255,212,36,1)] border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent"></div>
                </div>

                <div class="relative w-full pt-[100%] bg-gray-50">
                    <img src="${product.thumbnail}" alt="${product.title}" class="absolute top-0 left-0 w-full h-full object-contain mix-blend-multiply" loading="lazy">
                </div>
                
                <div class="p-2 flex-1 flex flex-col">
                    <h3 class="text-xs md:text-sm text-gray-800 line-clamp-2 leading-tight mb-2 group-hover:text-[#ee4d2d] transition-colors">${product.title}</h3>
                    
                    <div class="mt-auto">
                        <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="text-[#ee4d2d] font-medium text-base">
                                <span class="text-xs">$</span>${salePrice.toFixed(2)}
                            </span>
                        </div>
                        
                        <div class="flex items-center justify-between mt-2">
                            <div class="text-[10px] text-yellow-400 tracking-tighter">${ratingStars}</div>
                            <div class="text-[11px] text-gray-500">Kho: ${product.stock}</div>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }).join('');
};

const updatePagination = () => {
    const currentPage = (skip / limit) + 1;
    const maxPage = Math.ceil(totalProducts / limit);
    
    pageInfo.textContent = `${currentPage} / ${maxPage || 1}`;
    btnPrev.disabled = skip === 0;
    btnNext.disabled = skip + limit >= totalProducts;
};

// Event Listeners
let timeout = null;
searchInput.addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        currentSearch = e.target.value.trim();
        currentCategory = '';
        categoryFilter.value = '';
        skip = 0;
        fetchProducts();
    }, 500);
});

categoryFilter.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    currentSearch = ''; 
    searchInput.value = '';
    skip = 0;
    fetchProducts();
});

sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    skip = 0;
    fetchProducts();
});

btnPrev.addEventListener('click', () => {
    if (skip >= limit) {
        skip -= limit;
        fetchProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

btnNext.addEventListener('click', () => {
    if (skip + limit < totalProducts) {
        skip += limit;
        fetchProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

fetchCategories();
fetchProducts();