"use client";

import { useEffect, useState } from "react";
import AccountSidebar from "@/src/components/AccountSidebar/AccountSidebar";
import { useAuthStore } from "@/src/store/authStore";
import { User, Mail, Phone, Pencil, X } from "lucide-react";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const hydrate = useAuthStore((state) => state.hydrate);
  const updateUser = useAuthStore((state) => state.updateUser);

  const [openEdit, setOpenEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      updateUser(data.user);
      setOpenEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#fff6e2] p-3 lg:p-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

          <AccountSidebar />

          <div className="flex-1 min-w-0">

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[#28170d]">
                My Profile
              </h1>
              <p className="text-[#28170d]/60 mt-1">
                Manage your account information
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">

              {/* LEFT CARD */}
              <div className="bg-[#fff0d3] border border-[#28170d]/10 rounded-[28px] p-6 text-center min-w-0">
                <div className="w-28 h-28 mx-auto rounded-full bg-[#28170d] text-white flex items-center justify-center">
                  <User size={42} />
                </div>

                <h2 className="text-2xl font-bold text-[#28170d] mt-5 break-words">
                  {user?.name || "-"}
                </h2>

                <p className="text-[#28170d]/70 mt-2 break-all">
                  {user?.email || "-"}
                </p>

                <p className="text-[#28170d] font-medium mt-2">
                  +91 {user?.mobile || "-"}
                </p>
              </div>

              {/* RIGHT CARD */}
              <div className="bg-[#fff0d3] border border-[#28170d]/10 rounded-[28px] p-4 md:p-6 min-w-0">

                {/* top bar */}
                <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-[#28170d]">
                    Personal Information
                  </h2>

                  <button
                    onClick={() => setOpenEdit(true)}
                    className="px-5 py-3 rounded-2xl bg-[#28170d] text-white font-medium flex items-center gap-2"
                  >
                    <Pencil size={18} />
                    Edit Profile
                  </button>
                </div>

                {/* cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <InfoCard icon={<User size={20} />} title="Full Name" value={user?.name} />
                  <InfoCard icon={<Mail size={20} />} title="Email" value={user?.email} />
                  <InfoCard icon={<Phone size={20} />} title="Mobile" value={user?.mobile} />

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {openEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="w-full max-w-lg bg-[#fff0d3] rounded-[30px] p-6">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#28170d]">
                Edit Profile
              </h3>

              <button onClick={() => setOpenEdit(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">

              <InputField
                label="Full Name"
                value={form.name}
                onChange={(e: any) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <InputField
                label="Email"
                type="email"
                value={form.email}
                onChange={(e: any) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <InputField
                label="Mobile"
                value={form.mobile}
                onChange={(e: any) =>
                  setForm({ ...form, mobile: e.target.value })
                }
              />

            </div>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => setOpenEdit(false)}
                className="flex-1 py-3 rounded-2xl border border-[#28170d]/20"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-2xl bg-[#28170d] text-white font-semibold"
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- INFO CARD ---------------- */

function InfoCard({ icon, title, value }: any) {
  return (
    <div className="bg-[#fff6e2] border border-[#28170d]/10 rounded-2xl p-4 flex gap-4 min-w-0">

      <div className="w-12 h-12 rounded-xl bg-[#28170d] text-white flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm text-[#28170d]/60">{title}</p>

        <p className="font-semibold text-[#28170d] break-words">
          {value || "-"}
        </p>
      </div>

    </div>
  );
}

/* ---------------- INPUT ---------------- */

function InputField({ label, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-[#28170d]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full h-12 px-4 rounded-2xl border border-[#28170d]/15 bg-[#fff6e2] outline-none"
      />
    </div>
  );
}