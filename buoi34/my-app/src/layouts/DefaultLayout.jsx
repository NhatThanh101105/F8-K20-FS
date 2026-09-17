import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2026 ReactShop — F8 Buổi 34. Built with ❤️ và React Router.
          </p>
        </div>
      </footer>
    </div>
  );
}
