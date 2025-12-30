import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white border-bottom shadow-sm">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2"
          aria-label="Homepage"
        >
          {/* <LogoMark /> */}
          <strong className="fw-bold mb-0 textColorMain">Xstore</strong>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#primaryNavbar"
          aria-controls="primaryNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="primaryNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                end
                to="/"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/fav-items"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                Favorites
              </NavLink>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <Link to="/cart-page" className="btn btn-outline-dark">
              Cart
            </Link>
            <Link to="/signin" className="btn btn-outline-dark">
              Sign in
            </Link>
            <Link to="/signup" className="btn btn-primary fw-semibold">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// function LogoMark({ size = 28 }) {
//   return (
//     <>
//       <svg
//         width={size}
//         height={size}
//         viewBox="0 0 32 32"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         aria-hidden="true"
//         focusable="false"
//       >
//         <defs>
//           <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0%" stopColor="#22c55e" />
//             <stop offset="50%" stopColor="#3b82f6" />
//             <stop offset="100%" stopColor="#a855f7" />
//           </linearGradient>
//         </defs>
//         <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#lg)" />
//         <path
//           d="M10 17l3.5 3.5L22 12"
//           stroke="white"
//           strokeWidth="2.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     </>
//   );
// }
