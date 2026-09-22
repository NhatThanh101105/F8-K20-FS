import { createContext, useContext, useReducer } from "react";
import products from "../data/products";

const ShopContext = createContext(null);

const initialState = {
  products: products,
  cart: [],
  selectedCategory: "Tất cả",
  searchKeyword: "",
};

function shopReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex !== -1) {
        const updatedCart = state.cart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, cart: updatedCart };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity < 1) return state;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case "SET_FILTER": {
      return {
        ...state,
        selectedCategory:
          action.payload.category !== undefined
            ? action.payload.category
            : state.selectedCategory,
        searchKeyword:
          action.payload.keyword !== undefined
            ? action.payload.keyword
            : state.searchKeyword,
      };
    }

    default:
      return state;
  }
}

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}

export default ShopContext;
