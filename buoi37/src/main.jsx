import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './index.css';

// Khởi tạo QueryClient một lần duy nhất ngoài component để đảm bảo tính ổn định, không tạo lại khi render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Tránh refetch tự động gây khó chịu khi chuyển tab
      retry: 1, // Thử lại tối đa 1 lần nếu gặp lỗi
    },
  },
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
