import React from "react";
import { useNavigate } from "react-router-dom";

export default function SeeMore({ to , word}) {
  const navigate = useNavigate();
  
  function navigateToPage() {
    navigate(`/${to}`);
  }

  return (
    <button className="p-0 border-0 text-muted bg-transparent btn btn-sm"
      onClick={navigateToPage}
    >
      See More {word}
    </button>
  );
}
