import React from "react";
import { AddCategory } from "../../components/admin/AddCategory";
import { UpdateCategory } from "../../components/admin/UpdateCategory";
export default function Admin() {
  return (
    <>
      <AddCategory />
      <UpdateCategory />
    </>
  );
}
