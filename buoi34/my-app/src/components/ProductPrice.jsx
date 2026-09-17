import { formatPrice } from "../utils/formatPrice";

export default function ProductPrice({ price, className = "" }) {
  return (
    <span className={`font-bold text-indigo-600 ${className}`}>
      {formatPrice(price)}
    </span>
  );
}
