"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import SubCategoryForm from "@/src/components/admin/SubCategoryForm";

export default function EditSubCategory() {
  const params = useParams();

  const id = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  const [data, setData] = useState<any>(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const [sub, cats] = await Promise.all([
        API.get(`/admin/productsubcategory/${id}`),
        API.get("/productcategories"),
      ]);

      setData(sub.data?.data);
      setCategories(cats.data?.data || []);
    };

    if (id) fetch();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <SubCategoryForm
      initialData={data}
      categories={categories}
    />
  );
}