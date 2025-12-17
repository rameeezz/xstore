import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  return <div>Products</div>;
}
