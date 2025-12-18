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
};
export default apiClient;
