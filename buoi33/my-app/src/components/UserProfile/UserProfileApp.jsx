import { useState, useEffect } from 'react';
import UserProfileCard from './UserProfileCard';

export default function UserProfileApp() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu người dùng');
        }
        const data = await response.json();
        if (isMounted) {
          setUser(data);
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

    fetchUser();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleNext = () => setUserId(prev => prev + 1);
  const handlePrev = () => setUserId(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="py-10 px-4 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Hồ Sơ Người Dùng</h1>
        <p className="text-slate-500">Bài 1: Single User Profile Card</p>
      </div>

      <div className="w-full max-w-md min-h-[450px]">
        {loading && (
          <div className="flex flex-col items-center justify-center h-[400px] text-indigo-600 bg-white rounded-2xl shadow-xl border border-slate-100">
            <svg className="animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="font-medium animate-pulse">Đang tải dữ liệu người dùng...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-center shadow-md">
            <p className="font-semibold">{error}</p>
          </div>
        )}
        
        {!loading && !error && user && (
          <UserProfileCard user={user} />
        )}
      </div>

      <div className="mt-8 flex gap-4">
        <button 
          onClick={handlePrev} 
          disabled={userId === 1}
          className="px-6 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-700 transition-colors"
        >
          User Trước
        </button>
        <button 
          onClick={handleNext}
          className="px-6 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 font-medium text-slate-700 transition-colors"
        >
          User Tiếp Theo
        </button>
      </div>
    </div>
  );
}
