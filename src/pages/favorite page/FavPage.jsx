import React from "react";

export default function FavPage() {
  const itemsInFav = JSON.parse(localStorage.getItem("favorites"));
  console.log(itemsInFav);
  function deleteAllFav() {
    localStorage.removeItem("favorites");
  }
  return (
    <>
      <h1>fav</h1>
      <button className="btn btn-danger" onClick={deleteAllFav}>delete</button>
    </>
  );
}
