import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export default function Admin() {
  const navigate = useNavigate();
  const { userToken } = useLogin();

  useEffect(() => {
    if (!userToken) {
      navigate("/signin");
    }
  }, [userToken, navigate]);
  return <div>Admin</div>;
}
