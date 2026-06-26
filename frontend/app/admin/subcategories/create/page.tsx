"use client";

import API from "@/src/lib/api";
import { useEffect, useState } from "react";
import SubCategoryForm from "@/src/components/admin/SubCategoryForm";

export default function CreateSubCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get("/productcategories");
      setCategories(res.data?.data || []);
    };

    fetch();
  }, []);

  return (
    <SubCategoryForm categories={categories} />
  );
}