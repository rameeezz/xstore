import React, { useEffect, useState } from "react";
import { categoriesAPI } from "../../services/api";

export const UpdateCategory = () => {
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [changedCategory, setChangedCategory] = useState<{
    name: string;
  }>({
    name: "",
  });

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    setLoading(true);
    try {
      const data = await categoriesAPI.getAll();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  function handleCategoryDetails(e: any) {
    const { name, value } = e.target;
    setChangedCategory((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(e: any, id: number, newName: string) {
    e.preventDefault();
    if (!id) return;
    setLoading(true);
    try {
      await categoriesAPI.updateCatgeroy(id, newName);
      await getCategories();
      alert("The name changed");
      setChangedCategory({ name: "" });
      setSelectedCategory(null);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        ""
      )}
      {error ? (
        <div className="alert alert-danger mt-5 text-center" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>There are somthing wrong please try again.</p>
          <button className="btn btn-primary btn-sm" onClick={getCategories}>
            Try Again
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="mt-2 p-4 border rounded shadow d-flex justify-content-around align-items-center flex-wrap">
        <div className="dropdown mt-3">
          <label className="me-1">Select category :</label>
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            id="categoryDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedCategory ? selectedCategory.name : "Select a category"}
          </button>
          <ul
            className="dropdown-menu"
            aria-labelledby="categoryDropdown"
            style={{ maxHeight: "280px", overflowY: "auto" }}
          >
            {categories.map((el: any) => (
              <li key={el?.id}>
                <button
                  className="dropdown-item fw-bolder"
                  type="button"
                  onClick={() => setSelectedCategory(el)}
                >
                  {el?.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              handleSubmit(e, selectedCategory.id, changedCategory.name);
            }}
          >
            <div>
              {" "}
              <label htmlFor="name" className="block mb-2 me-2 font-bold">
                Change name of category :
              </label>
              <input
                type="text"
                name="name"
                value={changedCategory.name}
                onChange={(e) => handleCategoryDetails(e)}
                className="w-full p-2 border rounded"
              />
            </div>
          </form>
        </div>
        <div className="w-100 d-flex justify-content-center align-items-center">
          <button
            onClick={(e) => {
              handleSubmit(e, selectedCategory.id, changedCategory.name);
            }}
            className="w-full bg-blue-500 text-dark p-2 rounded hover:bg-blue-600"
          >
            Change it
          </button>
        </div>
      </div>
    </>
  );
};
