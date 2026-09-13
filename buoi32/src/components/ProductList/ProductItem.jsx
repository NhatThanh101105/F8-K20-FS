import React from 'react';
import styles from './ProductList.module.css';
import Badge from './Badge';

const ProductItem = ({ product, onAddToCart }) => {
  const { name, price, image, inStock, discountPercent } = product;

  const hasDiscount = discountPercent > 0;
  const finalPrice = hasDiscount ? price - (price * discountPercent) / 100 : price;

  const formatPrice = (amount) => {
    return amount.toLocaleString('vi-VN') + 'đ';
  };

  const handleBuy = () => {
    if (inStock) {
      onAddToCart(name, finalPrice);
    }
  };

  return (
    <div className={`${styles.productCard} ${!inStock ? styles.outOfStockCard : ''}`}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.productImage} />
        {!inStock && <Badge type="outOfStock" text="Hết hàng" />}
        {inStock && hasDiscount && <Badge type="discount" text={`Giảm ${discountPercent}%`} />}
      </div>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        
        <div className={styles.priceContainer}>
          {hasDiscount ? (
            <>
              <span className={styles.finalPrice}>{formatPrice(finalPrice)}</span>
              <span className={styles.originalPrice}>{formatPrice(price)}</span>
            </>
          ) : (
            <span className={styles.finalPrice}>{formatPrice(price)}</span>
          )}
        </div>
        
        <button 
          className={styles.buyBtn}
          onClick={handleBuy}
          disabled={!inStock}
        >
          {inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
