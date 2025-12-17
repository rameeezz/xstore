import React, { useCallback, useEffect, useState } from "react";
import Header from "./../../components/header/Header";
import { categoriesAPI } from "../../services/api.js";
import { MESSAGES } from "../../constants/index.js";
import "../../styles/Home.css";
import SeeMore from './../../components/buttons/SeeMore';

// Reusable Card Component - Capitalized!
const CategoryCard = ({ category }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 cardWidth mt-0 mt-md-3">
      <div className="category-card card h-100 rounded-card shadow-sm border-0">
        <div className="card-img-container">
          <img
            src={category?.image}
            className="card-img-top rounded-img"
            alt={category?.name}
            loading="lazy"
          />
        </div>
        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title fw-bold">{category?.name}</h5>
          <button className="btn btn-primary btn-sm mt-auto">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCategory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await categoriesAPI.getAll();
      setCategory(data);
    } catch (error) {
      setError(MESSAGES.ERROR || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="d-flex justify-content-center align-items-center full-height-container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">{MESSAGES.LOADING}</span>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="alert alert-danger mt-5 text-center" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <button className="btn btn-primary btn-sm" onClick={getCategory}>
            Try Again
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      {/*section category */}
      <div className="container my-3">
        <div
          className="
    d-flex 
    flex-column 
    flex-md-row 
    justify-content-center 
    justify-content-md-between 
    align-items-center 
    p-3 
    gap-2
  "
        >
          <h2 className="fw-bold textColorMain mb-0">Categories</h2>

          <p className="text-muted mb-0 text-md-start text-center textSizeInSmallScreen">
            Shop furniture, electronics, and clothing with ease.
            <span className="d-block">Everything you need, in one store.</span>
          </p>
        </div>
          <div className="d-flex justify-content-end justify-content-lg-end justify-content-md-end mb-2">
            <SeeMore to="categories" word="Categories"/>
          </div>
        {/* showing some of categories */}
        <div className="row gap-md-0 gap-3 justify-content-center">
          {category.length > 0 ? (
            <>
              <CategoryCard category={category[0]} />
              <CategoryCard category={category[1]} />
              <CategoryCard category={category[2]} />
              <CategoryCard category={category[3]} />
              <CategoryCard category={category[4]} />
              <CategoryCard category={category[5]} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
