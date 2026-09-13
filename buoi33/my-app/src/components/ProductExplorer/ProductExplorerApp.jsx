import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ProductList from './ProductList';

export default function ProductExplorerApp() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Track the actual query being submitted
  const [submittedQuery, setSubmittedQuery] = useState('');

  useEffect(() => {
    let isMounted = true;
    
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = submittedQuery.trim() === '' 
          ? 'https://dummyjson.com/products?limit=10'
          : `https://dummyjson.com/products/search?q=${encodeURIComponent(submittedQuery)}`;
          
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Không thể tải danh sách sản phẩm');
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setProducts(data.products || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [submittedQuery]);

  const handleSearchSubmit = () => {
    setSubmittedQuery(searchTerm);
  };

  return (
    <div className="py-10 px-4 bg-white min-h-[600px]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Sản Phẩm E-commerce</h1>
          <p className="text-slate-500">Bài 2: E-commerce Product Explorer</p>
        </div>

        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          onSearchSubmit={handleSearchSubmit} 
        />

        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-center shadow-md">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
            <svg className="animate-spin h-12 w-12 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="font-medium animate-pulse text-lg">Đang tải danh sách sản phẩm...</p>
          </div>
        ) : !error ? (
          <ProductList products={products} />
        ) : null}
      </div>
    </div>
  );
}
