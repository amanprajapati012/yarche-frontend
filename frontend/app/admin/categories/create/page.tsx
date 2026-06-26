"use client";

import CategoryForm from "@/src/components/admin/CategoryForm";

export default function CreateCategoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Category</h1>

      <CategoryForm initialData={null} />
    </div>
  );
}