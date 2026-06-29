"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import {
  Tag,
  Percent,
  IndianRupee,
  Calendar,
  Users,
  Gift,
  ToggleLeft,
  ToggleRight,
  UserCheck,
  Hash,
} from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  editData: any;
  refresh: () => void;
}

export default function DiscountForm({
  open,
  setOpen,
  editData,
  refresh,
}: Props) {
  const [form, setForm] = useState<any>({
    code: "",
    type: "percentage",
    value: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    userLimit: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    isActive: true,
  });

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        startDate: editData.startDate
          ? new Date(editData.startDate).toISOString().slice(0, 10)
          : "",
        endDate: editData.endDate
          ? new Date(editData.endDate).toISOString().slice(0, 10)
          : "",
      });
    }
  }, [editData]);

  const handleChange = (key: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        code: form.code?.toUpperCase(),
        type: form.type,
        value: Number(form.value),
        minOrderAmount: Number(form.minOrderAmount || 0),
        maxDiscountAmount: form.maxDiscountAmount
          ? Number(form.maxDiscountAmount)
          : null,
        userLimit: form.userLimit ? Number(form.userLimit) : null,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : null,
        startDate: new Date(form.startDate),
        endDate: new Date(form.endDate),
        isActive: form.isActive,
      };

      if (editData) {
        await API.put(
          `/admin/updateDiscount/${editData._id}`,
          payload
        );
      } else {
        await API.post("/admin/discount", payload);
      }

      setOpen(false);
      refresh();
    } catch (err: any) {
      console.log("Discount Save Error:", err?.response?.data || err.message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        className="w-[900px] rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "#fff6e2" }}
      >
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-[#f2d9a6] flex justify-between items-center">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Gift size={18} />
            {editData ? "Update Discount" : "Create Discount"}
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-foreground font-semibold"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 grid grid-cols-2 gap-4">

          {/* CODE */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface">
            <Tag size={18} color="#28170d" />
            <input
              placeholder="Coupon Code"
              className="w-full outline-none bg-transparent text-foreground"
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value)}
            />
          </div>

          {/* TYPE */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface">
            <Percent size={18} color="#28170d" />
            <select
              className="w-full bg-transparent outline-none text-foreground"
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <option value="percentage">Percentage</option>
              <option value="flat">Flat</option>
            </select>
          </div>

          {/* VALUE */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface">
            <IndianRupee size={18} color="#28170d" />
            <input
              type="number"
              placeholder="Discount Value"
              className="w-full outline-none bg-transparent text-foreground"
              value={form.value}
              onChange={(e) => handleChange("value", e.target.value)}
            />
          </div>

          {/* MIN ORDER */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface">
            <Users size={18} color="#28170d" />
            <input
              type="number"
              placeholder="Minimum Order Amount"
              className="w-full outline-none bg-transparent text-foreground"
              value={form.minOrderAmount}
              onChange={(e) =>
                handleChange("minOrderAmount", e.target.value)
              }
            />
          </div>

          {/* MAX DISCOUNT */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface">
            <Gift size={18} color="#28170d" />
            <input
              type="number"
              placeholder="Max Discount (optional)"
              className="w-full outline-none bg-transparent text-foreground"
              value={form.maxDiscountAmount}
              onChange={(e) =>
                handleChange("maxDiscountAmount", e.target.value)
              }
            />
          </div>

          {/* USER LIMIT */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface">
            <UserCheck size={18} color="#28170d" />
            <input
              type="number"
              placeholder="Max Users Can Use Coupon"
              className="w-full outline-none bg-transparent text-foreground"
              value={form.userLimit}
              onChange={(e) =>
                handleChange("userLimit", e.target.value)
              }
            />
          </div>

          {/* USAGE LIMIT */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface">
            <Hash size={18} color="#28170d" />
            <input
              type="number"
              placeholder="Total Usage Limit"
              className="w-full outline-none bg-transparent text-foreground"
              value={form.usageLimit}
              onChange={(e) =>
                handleChange("usageLimit", e.target.value)
              }
            />
          </div>

          {/* START DATE */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface">
            <Calendar size={18} color="#28170d" />
            <input
              type="date"
              className="w-full outline-none bg-transparent text-foreground"
              value={form.startDate}
              onChange={(e) =>
                handleChange("startDate", e.target.value)
              }
            />
          </div>

          {/* END DATE */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface">
            <Calendar size={18} color="#28170d" />
            <input
              type="date"
              className="w-full outline-none bg-transparent text-foreground"
              value={form.endDate}
              onChange={(e) =>
                handleChange("endDate", e.target.value)
              }
            />
          </div>

          {/* STATUS */}
          <div className="flex items-center justify-between p-3 rounded-xl col-span-2 bg-surface">
            <div className="flex items-center gap-2 text-foreground">
              {form.isActive ? (
                <ToggleRight size={20} />
              ) : (
                <ToggleLeft size={20} />
              )}
              Active Status
            </div>

            <select
              className="bg-transparent outline-none text-foreground"
              value={form.isActive}
              onChange={(e) =>
                handleChange("isActive", e.target.value === "true")
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#f2d9a6]">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg text-foreground font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-footer text-white font-medium hover:opacity-90"
          >
            Save Discount
          </button>
        </div>
      </div>
    </div>
  );
}