# Bài tập Buổi 34 - Routing

Xây dựng 2 website bán hàng với đầy đủ routing, layout, active menu, scroll reset, trang 404 và Tailwind CSS.

## 📁 Cấu trúc

```
buoi34/
├── vanilla-shop/   → Bài 1: Vanilla JavaScript Router Shop
└── my-app/         → Bài 2: React Router Shop
```

---

## Bài 1: Vanilla JavaScript Router Shop

Website bán hàng sử dụng HTML, CSS và JavaScript thuần. Router tự xây dựng bằng History API.

### Cách chạy

```bash
cd vanilla-shop
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:3000`

### Công nghệ

- Vite
- Tailwind CSS
- JavaScript thuần (ES Modules)

### Tính năng

- Custom SPA Router (`history.pushState()` + `popstate`)
- Điều hướng không reload trang (link `data-link`)
- Active menu highlight theo trang hiện tại
- Scroll reset khi chuyển trang
- Giỏ hàng: thêm, xóa, thay đổi số lượng
- Form đăng ký / đăng nhập có validate
- Trang 404

### Các route

| Route | Trang |
|-------|-------|
| `/` | Home Page |
| `/products` | Product List Page |
| `/products/:id` | Product Detail Page |
| `/cart` | Cart Page |
| `/sign-up` | Sign Up Page |
| `/sign-in` | Sign In Page |
| `*` | Not Found Page |

### Layout

- **Default Layout**: Header (navigation menu) + Footer → dùng cho Home, Products, Product Detail, Cart
- **Auth Layout**: Form căn giữa, glassmorphism → dùng cho Sign Up, Sign In

---

## Bài 2: React Router Shop

Website bán hàng sử dụng React, React Router và Tailwind CSS.

### Cách chạy

```bash
cd my-app
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

### Công nghệ

- React 19
- React Router v8
- Vite
- Tailwind CSS

### Tính năng

- React Router với `NavLink` + `end` prop cho active menu
- `useParams()` lấy productId ở Product Detail
- `useContext` + `useReducer` quản lý giỏ hàng
- `ScrollToTop` component reset scroll khi chuyển trang
- Form đăng ký / đăng nhập có validate
- Trang 404

### Các route

| Route | Layout | Component |
|-------|--------|-----------|
| `/` | DefaultLayout | Home |
| `/products` | DefaultLayout | ProductList |
| `/products/:productId` | DefaultLayout | ProductDetail |
| `/cart` | DefaultLayout | Cart |
| `/sign-up` | AuthLayout | SignUp |
| `/sign-in` | AuthLayout | SignIn |
| `*` | — | NotFound |

### Chia component

- `Header` — navigation menu
- `ProductCard` — card sản phẩm trong grid
- `ProductPrice` — format giá VND
- `ScrollToTop` — reset scroll khi route thay đổi
- `CartContext` — quản lý state giỏ hàng

---

## Dữ liệu sản phẩm

8 sản phẩm công nghệ mẫu: MacBook Pro, iPhone, Sony WH-1000XM5, iPad Air, Galaxy Watch, Dell Monitor, Logitech MX Master, Keychron Q1 Pro.
