-- Xóa bảng cũ nếu có. Chỉ chạy trên database dành riêng cho bài này.
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE invoices (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  amount INTEGER NOT NULL,
  status VARCHAR(20) NOT NULL,
  date DATE NOT NULL
);

INSERT INTO customers (id, name) VALUES
  (1, 'Minh'),
  (2, 'Hoa'),
  (3, 'Phúc'),
  (4, 'Lan');

INSERT INTO invoices (id, customer_id, amount, status, date) VALUES
  (1, 1, 120000, 'paid', '2026-11-01'),
  (2, 2, 80000, 'pending', '2026-11-02'),
  (3, 1, 230000, 'paid', '2026-11-03'),
  (4, 3, 150000, 'pending', '2026-11-04'),
  (5, 1, 95000, 'paid', '2026-11-05'),
  (6, 4, 310000, 'paid', '2026-11-06'),
  (7, 2, 175000, 'pending', '2026-11-07'),
  (8, 1, 260000, 'paid', '2026-11-08'),
  (9, 3, 70000, 'pending', '2026-11-09'),
  (10, 1, 420000, 'paid', '2026-11-10'),
  (11, 4, 110000, 'pending', '2026-11-11'),
  (12, 1, 190000, 'paid', '2026-11-12');
