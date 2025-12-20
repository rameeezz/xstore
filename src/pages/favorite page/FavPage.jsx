import React, { useState, useEffect } from "react";
import CardItem from "./../../components/cardItem/CardItem";

export default function FavPage() {
  const [itemsInFav, setItemsInFav] = useState([]);
  const [showMore, setShowMore] = useState(3);

  useEffect(() => {
    try {
      const favItems = JSON.parse(localStorage.getItem("favorites")) || [];
      setItemsInFav(
        Array.isArray(favItems)
          ? favItems.filter((item) => item && item.id)
          : []
      );
    } catch (error) {
      setItemsInFav([]);
    }
  }, []);

  function deleteAllFav() {
    localStorage.removeItem("favorites");
    setItemsInFav([]);
  }
  function moreProduct() {
    setShowMore((prev) => prev + 3);
  }
  return (
    <>
      <div className="container my-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <h2 className="fw-bold textColorMain mb-0">Your Favorite Items</h2>
          {itemsInFav.length > 0 && (
            <button className="btn btn-danger mt-3 mt-md-0" onClick={deleteAllFav}>
              Delete All Favorites
            </button>
          )}
        </div>
        <div className="row g-4">
          {itemsInFav.length > 0 ? (
            itemsInFav
              .slice(0, showMore)
              .map((item) => <CardItem key={item.id} item={item} />)
          ) : (
            <div className="col-12">
              <p className="text-center text-muted fs-4 mt-5">
                You have no favorite items yet.
              </p>
            </div>
          )}
        </div>
        <div
          className={`d-flex justify-content-center my-5 ${
            showMore >= itemsInFav.length ? "d-none" : ""
          }`}
        >
          <button className="btn btn-primary w-50" onClick={moreProduct}>
            Load More
          </button>
        </div>
      </div>
    </>
  );
}
