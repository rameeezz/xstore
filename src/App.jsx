import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import ErrorPage from "./pages/error/ErrorPage";
import MasterLayout from "./pages/MasterLayout";
import Categories from './components/categories/Categories';

function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "categories",
          element: <Categories/>,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
