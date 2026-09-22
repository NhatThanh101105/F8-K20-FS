import { useState } from "react";
import ShopApp from "./bai1-shop/ShopApp";
import AudioPlayer from "./bai2-audio/AudioPlayer";
import ModalApp from "./bai3-modal/ModalApp";

const tabs = [
  { id: "bai1", label: "Bài 1: Giỏ hàng" },
  { id: "bai2", label: "Bài 2: Audio Player" },
  { id: "bai3", label: "Bài 3: Modal" },
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
        {activeTab === "bai1" && <ShopApp />}
        {activeTab === "bai2" && <AudioPlayer />}
        {activeTab === "bai3" && <ModalApp />}
      </div>
    </div>
  );
}
