import React from 'react';
import UserProfileCard from './components/UserProfileCard/UserProfileCard';
import ProductList from './components/ProductList/ProductList';
import FAQ from './components/FAQ/FAQ';
import './App.css';

function App() {
  // Bài 1: Mock data
  const users = [
    {
      id: 1,
      avatar: 'https://i.pravatar.cc/150?img=11',
      fullName: 'Nguyễn Văn A',
      jobTitle: 'Frontend Developer',
      isOnline: true,
      skills: ['React', 'JavaScript', 'Tailwind']
    },
    {
      id: 2,
      avatar: 'https://i.pravatar.cc/150?img=12',
      fullName: 'Trần Thị B',
      jobTitle: 'UI/UX Designer',
      isOnline: false,
      skills: ['Figma', 'Photoshop', 'CSS']
    }
  ];

  // Bài 2: Mock data
  const products = [
    {
      id: 1,
      name: 'Tai nghe Bluetooth Sony WH-1000XM4',
      price: 6500000,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=400&q=80',
      inStock: true,
      discountPercent: 10
    },
    {
      id: 2,
      name: 'Bàn phím cơ Keychron K2',
      price: 1800000,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80',
      inStock: true,
      discountPercent: 0
    },
    {
      id: 3,
      name: 'Chuột không dây Logitech MX Master 3',
      price: 2400000,
      image: 'https://images.unsplash.com/photo-1527814050087-17936a285d03?auto=format&fit=crop&w=400&q=80',
      inStock: false,
      discountPercent: 15
    },
    {
      id: 4,
      name: 'Màn hình Dell UltraSharp U2720Q',
      price: 12500000,
      image: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&w=400&q=80',
      inStock: true,
      discountPercent: 5
    }
  ];

  // Bài 3: Mock data
  const faqData = [
    {
      id: 1,
      question: 'Props trong React dùng để làm gì?',
      answer: 'Props (viết tắt của properties) là một cách để truyền dữ liệu từ component cha xuống component con trong React. Chúng chỉ đọc (read-only) và không thể thay đổi bởi component con nhận nó.',
      category: 'React',
      isHot: true
    },
    {
      id: 2,
      question: 'State khác với Props như thế nào?',
      answer: 'State là dữ liệu nội bộ của một component, có thể thay đổi được bằng hàm setState hoặc hook useState. Trong khi đó, Props là dữ liệu được truyền từ ngoài vào và không thể thay đổi bởi component nhận nó.',
      category: 'React',
      isHot: false
    },
    {
      id: 3,
      question: 'useEffect dùng để làm gì?',
      answer: 'useEffect là một React Hook cho phép bạn thực hiện các side effects (tác dụng phụ) trong function component, ví dụ như gọi API, thiết lập subscription, hoặc thao tác trực tiếp với DOM.',
      category: 'Hooks',
      isHot: true
    }
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Bài tập React Cơ Bản</h1>
      </header>

      <main>
        {/* Bài 1: UserProfileCard */}
        <section className="section">
          <h2 className="section-title">Bài 1: User Profile Card</h2>
          <div className="users-container">
            {users.map(user => (
              <UserProfileCard
                key={user.id}
                avatar={user.avatar}
                fullName={user.fullName}
                jobTitle={user.jobTitle}
                isOnline={user.isOnline}
                skills={user.skills}
              />
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* Bài 2: ProductList */}
        <section className="section">
          <ProductList products={products} />
        </section>

        <hr className="divider" />

        {/* Bài 3: FAQ / Accordion */}
        <section className="section">
          <FAQ faqData={faqData} />
        </section>
      </main>
      
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} - Hoàn thành bài tập React</p>
      </footer>
    </div>
  );
}

export default App;
