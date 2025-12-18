import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useScrollToTop from "./hooks/useScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import MasterLayout from "./pages/MasterLayout";
import Home from "./pages/home/Home";
import Categories from "./pages/categories/Categories";
import ErrorPage from "./pages/error/ErrorPage";
import { ROUTES } from "./constants/index.js";
import "./App.css";
import Products from "./pages/products/Products";
import ProductDetails from './pages/products/ProductDetails';

function AppContent() {
  useScrollToTop(); // Call hook here inside Router
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <MasterLayout>
            <Home />
          </MasterLayout>
        }
      />
      <Route
        path={ROUTES.CATEGORIES}
        element={
          <MasterLayout>
            <Categories />
          </MasterLayout>
        }
      />
      <Route
        path={ROUTES.PRODUCTS}
        element={
          <MasterLayout>
            <Products />
          </MasterLayout>
        }
      />
      <Route
        path={ROUTES.PRODUCTS_DETAILS}
        element={
          <MasterLayout>
            <ProductDetails/>
          </MasterLayout>
        }
      />
      <Route path={ROUTES.NOT_FOUND} element={<ErrorPage />} />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
