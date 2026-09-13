import Badge from './Badge';

export default function ProductItem({ product }) {
  const isOutOfStock = product.stock === 0 || product.availabilityStatus === "Out of Stock";
  const hasDiscount = product.discountPercentage > 0;
  
  const discountedPrice = hasDiscount 
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  const handleAddToCart = () => {
    alert(`Đã thêm ${product.title} vào giỏ hàng với giá $${discountedPrice.toFixed(2)}!`);
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price);

  const formattedDiscountedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(discountedPrice);

  const imageUrl = product.thumbnail || (product.images && product.images[0]) || '';

  return (
    <div className={`relative bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden flex flex-col transition-all hover:shadow-lg ${isOutOfStock ? 'opacity-60 grayscale-[50%]' : ''}`}>
      {isOutOfStock ? (
        <Badge text="Hết hàng" type="outOfStock" />
      ) : hasDiscount ? (
        <Badge text={`Giảm giá ${Math.round(product.discountPercentage)}%`} type="discount" />
      ) : null}

      <div className="h-48 bg-slate-100 overflow-hidden flex items-center justify-center p-4">
        <img 
          src={imageUrl} 
          alt={product.title} 
          className="max-h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-slate-800 text-lg line-clamp-1 mb-1" title={product.title}>
          {product.title}
        </h3>
        
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            {hasDiscount && (
              <span className="text-sm text-slate-400 line-through block mb-1">
                {formattedPrice}
              </span>
            )}
            <span className="text-lg font-bold text-indigo-600">
              {formattedDiscountedPrice}
            </span>
          </div>
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isOutOfStock 
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
          }`}
        >
          {isOutOfStock ? 'Không thể thêm' : 'Thêm vào giỏ'}
        </button>
      </div>
    </div>
  );
}
