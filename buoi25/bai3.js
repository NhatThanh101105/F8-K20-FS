const products = [
  { id: 1, name: "Tai nghe Bluetooth", category: "do-dien-tu", price: 350000, inStock: true },
  { id: 2, name: "Áo thun cotton", category: "quan-ao", price: 150000, inStock: true },
  { id: 3, name: "Sách Lập trình JS căn bản", category: "sach", price: 120000, inStock: false },
  { id: 4, name: "Bàn phím cơ", category: "do-dien-tu", price: 890000, inStock: true },
  { id: 5, name: "Quần jean nam", category: "quan-ao", price: 420000, inStock: false },
  { id: 6, name: "Sách Tư duy nhanh và chậm", category: "sach", price: 95000, inStock: true },
];

const categoryLabels = {
  "do-dien-tu": "Đồ điện tử",
  "quan-ao": "Quần áo",
  "sach": "Sách",
};

const searchBox = document.getElementById('search-box');
const categoryFilter = document.getElementById('category-filter');
const sortBtn = document.getElementById('sort-price-btn');
const listEl = document.getElementById('product-list');
const countEl = document.getElementById('result-count');

let sortState = null; // null | 'asc' | 'desc'

function formatPrice(price) {
  return price.toLocaleString('vi-VN') + 'đ';
}

function getFilteredSortedProducts() {
  const keyword = searchBox.value.trim().toLowerCase();
  const category = categoryFilter.value;

  let result = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(keyword);
    const matchCategory = category === 'all' || p.category === category;
    return matchName && matchCategory;
  });

  if (sortState === 'asc') result = [...result].sort((a, b) => a.price - b.price);
  else if (sortState === 'desc') result = [...result].sort((a, b) => b.price - a.price);

  return result;
}

function render() {
  const filtered = getFilteredSortedProducts();
  listEl.innerHTML = '';

  if (filtered.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'Không tìm thấy sản phẩm nào phù hợp.';
    listEl.appendChild(emptyMsg);
  } else {
    filtered.forEach(p => {
      const card = document.createElement('div');

      const name = document.createElement('strong');
      name.textContent = p.name;

      const category = document.createElement('span');
      category.textContent = ` (${categoryLabels[p.category] || p.category}) `;

      const price = document.createElement('span');
      price.textContent = formatPrice(p.price) + ' — ';

      const status = document.createElement('span');
      status.textContent = p.inStock ? 'Còn hàng' : 'Hết hàng';

      card.appendChild(name);
      card.appendChild(category);
      card.appendChild(price);
      card.appendChild(status);
      listEl.appendChild(card);
    });
  }

  countEl.textContent = `Tìm thấy ${filtered.length} sản phẩm`;
}

searchBox.addEventListener('input', render);
categoryFilter.addEventListener('change', render);

sortBtn.addEventListener('click', () => {
  if (sortState === null || sortState === 'desc') {
    sortState = 'asc';
    sortBtn.textContent = 'Giá: Thấp → Cao';
  } else {
    sortState = 'desc';
    sortBtn.textContent = 'Giá: Cao → Thấp';
  }
  render();
});

render();