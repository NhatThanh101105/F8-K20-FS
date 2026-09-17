import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  return (
    <>
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tất cả sản phẩm
            </h1>
            <p className="text-gray-500">
              Khám phá {products.length} sản phẩm công nghệ hàng đầu
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Extra content for scroll testing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Bạn cần tư vấn?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-6">
            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn lựa chọn
            sản phẩm phù hợp nhất.
          </p>
          <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors cursor-pointer">
            📞 Liên hệ ngay: 1900-xxxx
          </div>
        </div>
      </section>
    </>
  );
}
