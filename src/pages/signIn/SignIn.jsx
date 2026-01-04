import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "./../../hooks/useLogin.js";
import Swal from "sweetalert2";
import { userApi } from "../../services/api.js";
export default function SignIn() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { signIn } = useLogin();
  const navigate = useNavigate();
  function takeLoginData(e) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await signIn(loginData);
      if (response.access_token) {
        const userProfile = await userApi.getProfile(response.access_token);
        localStorage.setItem("userRole", userProfile.role);
        if (userProfile.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Invalid email or password",
        icon: "error",
      });
    }
  }
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold">Welcome Back</h3>
                <p className="text-muted">Sign in to your account</p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    name="email"
                    value={loginData.email}
                    onChange={(e) => {
                      takeLoginData(e);
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    name="password"
                    value={loginData.password}
                    onChange={(e) => {
                      takeLoginData(e);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold"
                >
                  Sign In
                </button>
              </form>

              <div className="text-center mt-4">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/signup" className="text-decoration-none fw-semibold">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
