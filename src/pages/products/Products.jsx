import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categoriesAPI } from "../../services/api.js";
import { MESSAGES } from "../../constants/index.js";
import Pagination from "../../components/paginationUI/PaginationUi.jsx";
import { PRODUCTS_PER_PAGE } from "../../constants/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Products.css";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [productInCategory, setProductInCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductInCategory = async () => {
    setLoading(true);
    setError(null);
    if (!categoryId) {
      setProductInCategory([]);
      setLoading(false);
      setError(MESSAGES.UNDEFINED_CATEGORYID);
    } else {
      try {
        const data = await categoriesAPI.getProductInCategory(categoryId);
        setProductInCategory(data);
      } catch (error) {
        setError(MESSAGES.ERROR);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchProductInCategory();
  }, [categoryId]);
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
        <button
          className="btn btn-primary btn-sm"
          onClick={fetchProductInCategory}
        >
          Try Again
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="container">
        <Pagination
          items={productInCategory}
          itemsPerPage={PRODUCTS_PER_PAGE}
          renderItem={(cat) => (
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card">
                <div className="position-relative">
                  <div className="position-absolute price-tag backgroundColor shadow rounded-1">
                    <span className="p-2 secondaryColor">{cat?.price}L.E</span>
                  </div>
                  <img
                    src={cat?.images[0]}
                    className="card-img-top"
                    loading="lazy"
                    alt={cat?.title}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{cat?.title}</h5>
                  <p className="card-text">{cat?.description}</p>
                  <div className="w-100 d-flex justify-content-between">
                    <button className="btn btn-primary">Go somewhere</button>
                    <button className="btn btn-primary">
                      <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
}
