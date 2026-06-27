"use client";

import { useState } from "react";
import API from "@/src/lib/api";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setForm((prev) => ({
      ...prev,
      mobile: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.mobile) {
      return toast.error("All fields required");
    }

    if (form.mobile.length !== 10) {
      return toast.error("Mobile must be 10 digits");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be 6+ characters");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const toastId = toast.loading("Creating account...");

    try {
      setLoading(true);

      const res = await API.post("/register", {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
      });

      if (res.data.response === "success") {
        toast.success("Account created 🎉", { id: toastId });

        setTimeout(() => {
          router.push("/auth/login");
        }, 800);
      } else {
        toast.error(res.data.message, { id: toastId });
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Server error",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto bg-orange-500 rounded-xl flex items-center justify-center text-white">
            <User />
          </div>

          <h2 className="text-2xl font-bold mt-3">Create Account</h2>
          <p className="text-sm text-gray-500">
            Join us and start shopping ✨
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Mobile */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleMobileChange}
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Confirm */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-5 text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-orange-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}