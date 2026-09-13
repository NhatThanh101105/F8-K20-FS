import { useState } from 'react';
import UserProfileApp from './components/UserProfile/UserProfileApp';
import ProductExplorerApp from './components/ProductExplorer/ProductExplorerApp';

function Home({ onNavigate }) {
  return (
    <div className="min-h-[90vh] bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-slate-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Bài Tập React Component</h1>
        <p className="text-lg text-slate-500 mb-10">Chọn một bài tập để xem giao diện</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => onNavigate('exercise1')}
            className="flex flex-col items-center p-8 bg-indigo-50 rounded-2xl hover:bg-indigo-100 hover:shadow-md transition-all duration-300 border border-indigo-100 group cursor-pointer"
          >
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform shadow-md">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-indigo-900 mb-2">Bài 1</h2>
            <p className="text-indigo-700/80 font-medium text-sm">Single User Profile Card</p>
          </button>

          <button 
            onClick={() => onNavigate('exercise2')}
            className="flex flex-col items-center p-8 bg-teal-50 rounded-2xl hover:bg-teal-100 hover:shadow-md transition-all duration-300 border border-teal-100 group cursor-pointer"
          >
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform shadow-md">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-teal-900 mb-2">Bài 2</h2>
            <p className="text-teal-700/80 font-medium text-sm">E-commerce Product Explorer</p>
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      {/* Header bar shows back button if we are not on home page */}
      {currentPage !== 'home' && (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center text-slate-600 hover:text-indigo-600 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại Trang Chủ
            </button>
            <div className="text-sm font-medium text-slate-400">
              {currentPage === 'exercise1' ? 'Bài 1' : 'Bài 2'}
            </div>
          </div>
        </div>
      )}

      {/* Render the current page */}
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'exercise1' && <UserProfileApp />}
      {currentPage === 'exercise2' && <ProductExplorerApp />}
    </div>
  );
}

export default App;