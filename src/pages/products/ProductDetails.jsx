import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productApi } from "../../services/api.js";
import { MESSAGES } from "../../constants/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../../styles/ProductDetailsCss.css";
export default function ProductDetails() {
  const [searchParams] = useSearchParams();
  const productID = searchParams.get("productID");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    if (productID) {
      try {
        const data = await productApi.getOneProduct(productID);
        setProduct(data);
        setSelectedImage(null);
      } catch (error) {
        setError(MESSAGES.ERROR);
      } finally {
        setLoading(false);
      }
    } else {
      setError(MESSAGES.UNDEFINED_CATEGORYID);
      setLoading(false);
    }
  }, [productID]);
  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);
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
          onClick={fetchProductDetails}
        >
          Try Again
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12 ">
            <img
              src={selectedImage || product?.images?.[0]}
              alt={product?.title || "Product Image"}
              className="w-100 h-100 rounded"
              loading="lazy"
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 ">
            <div className="d-flex justify-content-between mt-4">
              <div>
                <h3 className="textColorMain">{product?.title}</h3>
                <span className="text-muted">{product?.price}L.E</span>
              </div>
              <div className="mt-1 mt-md-2">
                {/* make it in single component to use it in more than one place  */}
                <FontAwesomeIcon icon={faHeart} className="cursor-Pointer" />
              </div>
            </div>
            <div className="d-flex flex-row gap-1 mt-4">
              {product?.images?.map((el) => (
                <div
                  key={el}
                  className="w-25 cursor-Pointer"
                  onClick={() => setSelectedImage(el)}
                >
                  <img
                    src={el}
                    alt="photos of product"
                    className="w-100 rounded"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="mt-3">
              <p className="m-0">Description:</p>
              <p className="text-muted mt-1">{product?.description}</p>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <button className="btn btn-primary w-75">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
