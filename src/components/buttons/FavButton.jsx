import React, { useState, useEffect } from "react";
import "../../styles/FavButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const FAV_STORAGE_KEY = "favorites";

export default function FavButton({ product }) {
  const [isFav, setIsFav] = useState(false);

  const getFavsFromStorage = () => {
    try {
      return JSON.parse(localStorage.getItem(FAV_STORAGE_KEY)) || [];
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    const existingFavs = getFavsFromStorage();
    const exists = existingFavs.some((item) => item.id === product?.id);
    setIsFav(exists);
  }, [product]);

  function toggleFav() {
    if (product && product?.id) {
      const oldFav = getFavsFromStorage();
      const exists = oldFav.some((item) => item?.id === product?.id);
      let newFavs;
      if (exists) {
        newFavs = oldFav.filter((item) => item?.id !== product?.id);
      } else {
        newFavs = [...oldFav, product];
      }
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(newFavs));
      setIsFav(!exists);
    }
  }
  return (
    <>
      <FontAwesomeIcon
        icon={faHeart}
        className="favorite-icon"
        style={{ color: isFav ? "red" : "white" }}
        onClick={toggleFav}
      />
    </>
  );
}
