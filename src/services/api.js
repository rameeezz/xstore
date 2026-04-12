import axios from "axios";
import { API_BASE_URL, API_TIMEOUT } from "../constants/index.js";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    try {
      const { data } = await apiClient.get("/categories");
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  },
  getProductInCategory: async (categoryId) => {
    try {
      const { data } = await apiClient.get(
        `/categories/${categoryId}/products`
      );
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch product in category"
      );
    }
  },
  updateCatgeroy: async (categoryId ,newData) => {
    try {
      const { data } = await apiClient.put(
        `/categories/${categoryId}`,newData
      );
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch product in category"
      );
    }
  },
  getById: async (id) => {
    try {
      const { data } = await apiClient.get(`/categories/${id}`);
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch category"
      );
    }
  },
};

// Products API
export const productApi = {
  getAllProduct: async () => {
    try {
      const { data } = await apiClient.get("products/");
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products."
      );
    }
  },
  getOneProduct: async (productID) => {
    try {
      const { data } = await apiClient.get(`products/${productID}`);
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products."
      );
    }
  },
  filterByPrice: async (from, to) => {
    try {
      const { data } = await apiClient.get(
        `products/?price_min=${from}&price_max=${to}`
      );
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data.message ||
          "Something Went Wrong Please Try Agian Later."
      );
    }
  },
  filterByCategory: async (categoryType) => {
    try {
      const { data } = await apiClient.get(
        `products/?categorySlug=${categoryType}`
      );
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Something Went Wrong Please Try Agian Later."
      );
    }
  },
  filterByPriceAndCategory: async (categoryId, minPrice, maxPrice) => {
    try {
      const { data } = await apiClient.get(
        `products/?price_min=${minPrice}&price_max=${maxPrice}&categoryId=${categoryId}`
      );
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Something Went Wrong Please Try Agian Later."
      );
    }
  },
};
export const userApi = {
  Sign_Up: async (userData) => {
    try {
      const { data } = await apiClient.post("/users", userData);
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create user."
      );
    }
  },
  Sign_IN: async (userData) => {
    try {
      const { data } = await apiClient.post("/auth/login", userData);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to sign in.");
    }
  },
  getProfile: async (token) => {
    try {
      const { data } = await apiClient.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error("Failed to fetch user profile.");
    }
  },
};
// admin Api 
export const adminApi = {
 ADD_CATEGORY: async (categoryDetails) => {
    try {
      const { data } = await apiClient.post("/categories", categoryDetails);
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create user."
      );
    }
  },
}
export default apiClient;
