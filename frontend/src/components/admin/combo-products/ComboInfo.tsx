"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import { ComboFormData } from "./types";

type Props = {
  formData: ComboFormData;
  setFormData: React.Dispatch<
    React.SetStateAction<ComboFormData>
  >;
};

export default function ComboInfo({
  formData,
  setFormData,
}: Props) {
  const [categories, setCategories] =
    useState<any[]>([]);

  const [
    subCategories,
    setSubCategories,
  ] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        e.target.type === "number"
          ? Number(value)
          : value,
    }));
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        "/productcategories"
      );

      setCategories(
        res.data?.data || []
      );
    } catch (err) {
      console.error(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCategories =
    async () => {
      try {
        const res = await API.get(
          "/productsubcategories"
        );

        setSubCategories(
          res.data?.data || []
        );
      } catch (err) {
        console.error(err);
        setSubCategories([]);
      }
    };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const filteredSubCategories =
    subCategories.filter(
      (item) =>
        item.category_id?.category ===
        formData.category
    );

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Combo Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Basic information for your combo
          product.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* SKU */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Combo SKU
          </label>

          <input
            type="text"
            name="productSku"
            value={formData.productSku}
            onChange={handleChange}
            placeholder="Enter SKU"
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>

        {/* Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Combo Name *
          </label>

          <input
            type="text"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Combo Name"
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>

        {/* Title */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Combo Title *
          </label>

          <input
            type="text"
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Combo Title"
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>

        {/* Category */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category *
          </label>

          <select
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category:
                  e.target.value,
                sub_category: "",
              }))
            }
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          >
            <option value="">
              Select Category
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category._id}
                  value={
                    category.category
                  }
                >
                  {category.category}
                </option>
              )
            )}
          </select>
        </div>

        {/* Sub Category */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Sub Category *
          </label>

          <select
            value={
              formData.sub_category
            }
            disabled={
              !formData.category
            }
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                sub_category:
                  e.target.value,
              }))
            }
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
              disabled:bg-gray-100
            "
          >
            <option value="">
              Select Sub Category
            </option>

            {filteredSubCategories.map(
              (sub) => (
                <option
                  key={sub._id}
                  value={
                    sub.sub_category
                  }
                >
                  {sub.sub_category}
                </option>
              )
            )}
          </select>
        </div>

        {/* Price */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Price *
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>

        {/* Discount */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Discounted Price
          </label>

          <input
            type="number"
            name="discountedPrice"
            value={
              formData.discountedPrice
            }
            onChange={handleChange}
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>

        {/* Landing */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Landing Price
          </label>

          <input
            type="number"
            name="landingPrice"
            value={
              formData.landingPrice
            }
            onChange={handleChange}
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>

        {/* Qty */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Quantity
          </label>

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>

        {/* Product Type */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Product Type
          </label>

          <input
            value="Combo Product"
            disabled
            className="
              w-full rounded-xl border
              bg-gray-100
              px-4 py-3
              font-medium
            "
          />

          <input
            type="hidden"
            value="combo"
          />
        </div>

        {/* Short Description */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Short Description *
          </label>

          <textarea
            rows={4}
            required
            name="description"
            value={
              formData.description
            }
            onChange={handleChange}
            placeholder="Short Description"
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>

        {/* Full Description */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Full Description *
          </label>

          <textarea
            rows={8}
            required
            name="full_description"
            value={
              formData.full_description
            }
            onChange={handleChange}
            placeholder="Full Description"
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>
      </div>
    </div>
  );
}