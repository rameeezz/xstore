import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import Swal from "sweetalert2";

export default function SignUp() {
  const { signUp } = useLogin();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  function takeUserDetails(e) {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  }
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      await signUp(userDetails);
      Swal.fire({
        title: "Success!",
        text: "Account created successfully!",
        icon: "success",
      }).then(() => {
        navigate("/signin");
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
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
                <h3 className="fw-bold">Create an Account</h3>
                <p className="text-muted">Join Xstore today</p>
              </div>

              <form onSubmit={handleSignUp}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="John Doe"
                    name="name"
                    value={userDetails.name}
                    onChange={(e) => {
                      takeUserDetails(e);
                    }}
                  />
                </div>

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
                    value={userDetails.email}
                    onChange={(e) => {
                      takeUserDetails(e);
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
                    value={userDetails.password}
                    onChange={(e) => {
                      takeUserDetails(e);
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="avatar" className="form-label">
                    Avatar
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="avatar"
                    placeholder="https://example.com/image.png"
                    name="avatar"
                    value={userDetails.avatar}
                    onChange={(e) => takeUserDetails(e)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold"
                >
                  Sign Up
                </button>
              </form>

              <div className="text-center mt-4">
                <span className="text-muted">Already have an account? </span>
                <Link to="/signin" className="text-decoration-none fw-semibold">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
