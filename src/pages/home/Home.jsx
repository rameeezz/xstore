import React, { useCallback, useEffect, useState } from "react";
import Header from "./../../components/header/Header";
import { categoriesAPI } from "../../services/api.js";
import { MESSAGES } from "../../constants/index.js";
import "../../styles/Home.css";
import SeeMore from "./../../components/buttons/SeeMore";
import ViewDetails from "./../../components/buttons/ViewDetails";
import { productApi } from "../../services/api.js";
import CardItem from "./../../components/cardItem/CardItem";

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
          <ViewDetails categoryId={category?.id} />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [categoriesData, productsData] = await Promise.all([
        categoriesAPI.getAll(),
        productApi.getAllProduct(),
      ]);
      setCategories(categoriesData);
      setProducts(productsData);
    } catch (error) {
      setError(MESSAGES.ERROR || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          <button className="btn btn-primary btn-sm" onClick={fetchData}>
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
        {/* category section */}
        <section>
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
              <span className="d-block">
                Everything you need, in one store.
              </span>
            </p>
          </div>
          <div className="d-flex justify-content-end justify-content-lg-end justify-content-md-end mb-2">
            <SeeMore to="categories" word="Categories" />
          </div>
          {/* showing some of categories */}

          <div className="row gap-md-0 gap-3 justify-content-center">
            {categories.length > 0 &&
              categories
                .slice(0, 6)
                .map((category) => (
                  <CategoryCard key={category?.id} category={category} />
                ))}
          </div>
        </section>

        {/* product section */}
        <section>
          <div
            className=" d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center p-3 gap-2 mt-3
  "
          >
            <h2 className="fw-bold textColorMain mb-0">Products</h2>

            <p className="text-muted mb-0 text-md-start text-center textSizeInSmallScreen">
              This product is a sample preview of what we offer.
            </p>
          </div>
          <div className="d-flex justify-content-end justify-content-lg-end justify-content-md-end mb-2">
            <SeeMore to="products" word="Products" />
          </div>
          {/* showing some of Products */}
          <div className="row gap-md-0 gap-3 justify-content-center">
            {products.length > 0 &&
              products
                .slice(0, 6)
                .map((product) => (
                  <CardItem key={product?.id} item={product} />
                ))}
          </div>
        </section>
      </div>
    </>
  );
}
