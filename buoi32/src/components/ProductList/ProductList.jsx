import React from 'react';
import styles from './ProductList.module.css';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => {
  const handleAddToCart = (name, price) => {
    alert(`Đã thêm "${name}" vào giỏ hàng với giá ${price.toLocaleString('vi-VN')}đ`);
  };

  return (
    <div className={styles.productListContainer}>
      <h2 className={styles.sectionTitle}>Danh sách Sản phẩm</h2>
      <div className={styles.productGrid}>
        {products.map(product => (
          <ProductItem 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
