import {
  addRoute,
  handleRoute,
  setupLinkInterception,
} from "./router.js";
import { renderHomePage } from "./pages/home.js";
import { renderProductListPage } from "./pages/productList.js";
import { renderProductDetailPage } from "./pages/productDetail.js";
import { renderCartPage } from "./pages/cart.js";
import { renderSignUpPage } from "./pages/signUp.js";
import { renderSignInPage } from "./pages/signIn.js";
import { renderNotFoundPage } from "./pages/notFound.js";

// Register routes
addRoute("/", () => renderHomePage());
addRoute("/products", () => renderProductListPage());
addRoute("/products/:id", (params) => renderProductDetailPage(params));
addRoute("/cart", () => renderCartPage());
addRoute("/sign-up", () => renderSignUpPage());
addRoute("/sign-in", () => renderSignInPage());
addRoute("*", () => renderNotFoundPage());

// Setup SPA link interception
setupLinkInterception();

// Handle initial route
handleRoute();
