import { useShop } from "../context/ShopContext";
import { categories } from "../data/products";

export default function SearchBar() {
  const { state, dispatch } = useShop();

  return (
    <div className="flex-1 max-w-xl flex items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Bạn tìm gì hôm nay?"
          value={state.searchKeyword}
          onChange={(e) =>
            dispatch({
              type: "SET_FILTER",
              payload: { keyword: e.target.value },
            })
          }
          className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#ee4d2d] focus:ring-1 focus:ring-[#ee4d2d] transition-colors bg-white"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Category Dropdown */}
      <select
        value={state.selectedCategory}
        onChange={(e) =>
          dispatch({
            type: "SET_FILTER",
            payload: { category: e.target.value },
          })
        }
        className="hidden sm:block px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white focus:outline-none focus:border-[#ee4d2d] cursor-pointer"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
