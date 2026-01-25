import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { adminApi } from "../../services/api";
export default function Admin() {
  const navigate = useNavigate();
  const { userToken } = useLogin();
  const [categoryDetails, setCategoryDetails] = useState({
    name: "",
    image: "",
  });
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!userToken) {
      navigate("/signin");
    }
  }, [userToken, navigate]);
  useEffect(() => {
    if (isAdded) {
      alert("The category is added");
      setIsAdded(false); // optional reset
    }
  }, [isAdded]);
  function handleCategoryDetails(e) {
    setError("")
    const { name, value } = e.target;
    setCategoryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await adminApi.ADD_CATEGORY(categoryDetails);
      setIsAdded(true);
    } catch (error) {
      setError("you should put name and image");
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-4 border rounded shadow"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 me-2 font-bold">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={categoryDetails.name}
            onChange={(e) => handleCategoryDetails(e)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-2 me-2 font-bold">
            Category Image
          </label>
          <input
            type="text"
            name="image"
            value={categoryDetails.image}
            onChange={(e) => handleCategoryDetails(e)}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-dark p-2 rounded hover:bg-blue-600"
        >
          Add Category
        </button>
        {error ? (
          <div class="alert alert-primary mt-3" role="alert">
            {error}
          </div>
        ) : (
          ""
        )}
      </form>
    </>
  );
}
