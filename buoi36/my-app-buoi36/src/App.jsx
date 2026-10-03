import { useState } from "react";
import ProductFilter from "./components/ProductFilter";
import RegisterForm from "./components/RegisterForm";

const tabs = [
  { id: "bai1", label: "Bài 1: Bộ lọc sản phẩm" },
  { id: "bai2", label: "Bài 2: Form đăng ký" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("bai1");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#ee4d2d] text-[#ee4d2d]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div>
        {activeTab === "bai1" && <ProductFilter />}
        {activeTab === "bai2" && <RegisterForm />}
      </div>
    </div>
  );
}