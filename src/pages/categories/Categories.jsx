import React, { useEffect, useState, useCallback } from "react";
import Pagination from "../../components/paginationUI/PaginationUi.jsx";
import { categoriesAPI } from "../../services/api.js";
import { CATEGORIES_PER_PAGE, MESSAGES } from "../../constants/index.js";
import ViewDetails from "../../components/buttons/ViewDetails.jsx";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriesAPI.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message || MESSAGES.ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Show loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center full-height-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">{MESSAGES.LOADING}</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="alert alert-danger mt-5 text-center" role="alert">
        <h4 className="alert-heading">Error</h4>
        <p>{error}</p>
        <button className="btn btn-primary btn-sm" onClick={fetchCategories}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center textColorMain mb-5 ">Categories</h1>

      {categories.length > 0 ? (
        <Pagination
          items={categories}
          itemsPerPage={CATEGORIES_PER_PAGE}
          renderItem={(cat) => (
            <div className="col-lg-4 col-md-6 col-6">
              <div className="category-card card h-100 rounded-card shadow-sm border-0">
                <div className="card-img-container">
                  <img
                    src={cat?.image}
                    className="card-img-top rounded-img"
                    alt={cat?.name}
                    loading="lazy"
                  />
                </div>
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title fw-bold">{cat?.name}</h5>
                  <ViewDetails categoryId={cat?.id} />
                </div>
              </div>
            </div>
          )}
        />
      ) : (
        <div className="alert alert-info text-center" role="alert">
          {MESSAGES.NO_DATA}
        </div>
      )}
    </div>
  );
}
