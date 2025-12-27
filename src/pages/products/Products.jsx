import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { categoriesAPI } from "../../services/api.js";
import { MESSAGES } from "../../constants/index.js";
import Pagination from "../../components/paginationUI/PaginationUi.jsx";
import { PRODUCTS_PER_PAGE } from "../../constants/index.js";
import { productApi } from "../../services/api.js";
import CardItem from "./../../components/cardItem/CardItem";
import FilterProducts from "./../../components/buttons/FilterProducts";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (categoryId) {
        data = await categoriesAPI.getProductInCategory(categoryId);
      } else {
        data = await productApi.getAllProduct();
      }
      setProducts(data);
    } catch (error) {
      setError(MESSAGES.ERROR || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">{MESSAGES.LOADING}</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="alert alert-danger mt-5 text-center" role="alert">
        <h4 className="alert-heading">Error</h4>
        <p>{error}</p>
        <button className="btn btn-primary btn-sm" onClick={fetchProducts}>
          Try Again
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="container mt-5 mb-5">
        <h1 className="text-center textColorMain mb-3 ">Products</h1>
        <div className="d-flex flex-wrap justify-content-end mb-3">
          <FilterProducts onFilter={setProducts} />
        </div>
        {products.length === 0 && (
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <div
              className="alert alert-info text-center mt-5 w-75 shadow"
              role="alert"
            >
              <p className="mb-0">{MESSAGES.NO_DATA}</p>
            </div>
          </div>
        )}
        <Pagination
          items={products}
          itemsPerPage={PRODUCTS_PER_PAGE}
          renderItem={(cat) => <CardItem item={cat} />}
        />
      </div>
    </>
  );
}
