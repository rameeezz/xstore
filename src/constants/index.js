// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const APP_NAME = import.meta.env.VITE_APP_NAME || "XStore";

// Pagination Configuration
export const CATEGORIES_PER_PAGE = 6;
export const PRODUCTS_PER_PAGE = 12;

// Timeouts
export const API_TIMEOUT = 10000;
export const LOADING_TIMEOUT = 5000;

// Routes
export const ROUTES = {
  HOME: "/",
  CATEGORIES: "/categories",
  PRODUCTS: "/products",
  PRODUCTS_DETAILS: "/products-details",
  FAV_ITEMS: "/fav-items",
  CART_PAGE:"/cart-page",
  NOT_FOUND: "*",
};

// Messages
export const MESSAGES = {
  LOADING: "Loading...",
  ERROR: "Error fetching data. Please try again.",
  NO_DATA: "No data found.",
  SUCCESS: "Success!",
  UNDEFINED_CATEGORYID: "Please Try Again Later.",
};
