"use client";

import { ComboFormData } from "./types";

type Props = {
  formData: ComboFormData;
  setFormData: React.Dispatch<React.SetStateAction<ComboFormData>>;
};

export default function ComboInfo({ formData, setFormData }: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-foreground">
        Combo Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Combo SKU *
          </label>

          <input
            type="text"
            name="comboSku"
            required
            value={formData.comboSku}
            onChange={handleChange}
            placeholder="Enter Combo SKU"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#28170D]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Combo Title *
          </label>

          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Combo Title"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#28170D]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Discounted Price
          </label>

          <input
            type="number"
            name="discountedPrice"
            min={0}
            value={formData.discountedPrice}
            onChange={handleChange}
            placeholder="Leave 0 to auto-use total price"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#28170D]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Landing Price
          </label>

          <input
            type="number"
            name="landingPrice"
            min={0}
            value={formData.landingPrice}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#28170D]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Description *
          </label>

          <textarea
            rows={4}
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Combo Description"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#28170D]"
          />
        </div>
      </div>
    </div>
  );
}