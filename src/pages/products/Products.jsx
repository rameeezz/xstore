import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { categoriesAPI } from "../../services/api.js";
import { MESSAGES } from "../../constants/index.js";
import Pagination from "../../components/paginationUI/PaginationUi.jsx";
import { PRODUCTS_PER_PAGE } from "../../constants/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Products.css";
import { productApi } from "../../services/api.js";
import ViewDetails from "./../../components/buttons/ViewDetails";
import FavButton from "./../../components/buttons/FavButton";
const ProductCard = ({ item }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card">
        <div className="position-relative">
          <div className="position-absolute fav-tag">
            <FavButton product={item} />
          </div>
          <div className="position-absolute price-tag backgroundColor shadow rounded-1">
            <span className="p-2 secondaryColor">{item?.price}L.E</span>
          </div>
          <img
            src={item?.images[0]}
            className="card-img-top"
            loading="lazy"
            alt={item?.title}
          />
        </div>
        <div className="card-body">
          <h5
            className="card-title"
            title={item?.title}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item?.title}
          </h5>
          <p
            className="card-text"
            title={item?.description}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item?.description}
          </p>
          <div className="w-100 d-flex justify-content-between">
            <ViewDetails productID={item?.id} />
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
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
        <h1 className="text-center textColorMain mb-5 ">Products</h1>
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
          renderItem={(cat) => <ProductCard item={cat} />}
        />
      </div>
    </>
  );
}
