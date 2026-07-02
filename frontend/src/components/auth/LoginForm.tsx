"use client";

import { useState } from "react";
import API from "@/src/lib/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { Loader2, Mail, Lock, User, LogIn } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);

  const loadingToast = toast.loading("Logging in...");

  try {
    const payload = {
      email: form.identifier.includes("@") ? form.identifier : "",
      mobile: !form.identifier.includes("@") ? form.identifier : "",
      password: form.password,
    };

    // Normal User Login
    const res = await API.post("/login", payload);

    if (res.data.response === "success") {
      setAuth(res.data.user, res.data.token);

      toast.success("Welcome back 👋", {
        id: loadingToast,
      });

      router.push("/");
      return;
    }
  } catch (userErr) {
    try {
      // Admin Login Try
      const adminRes = await API.post("/admin/login", {
        adminUser: form.identifier,
        password: form.password,
      });
      console.log("ADMIN RESPONSE:", adminRes.data);

      if (adminRes.data.response === "success") {
        localStorage.setItem(
          "adminToken",
          adminRes.data.adminToken
        );

        toast.success("Welcome Admin 👑", {
          id: loadingToast,
        });

        router.push("/admin");
        return;
      }
    } catch (adminErr: any) {
      toast.error(
        adminErr?.response?.data?.message || "Invalid credentials",
        {
          id: loadingToast,
        }
      );
    }
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
    
    {/* Background card wrapper */}
    <div className="w-full max-w-md">
      
      {/* Card */}
      <div className="bg-surface rounded-3xl shadow-2xl border border-[#28170d]/10 
                      max-h-[90vh] overflow-y-auto p-6 md:p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto bg-[#ff6e23] rounded-2xl flex items-center justify-center text-white">
            <User size={24} />
          </div>

          <h2 className="text-2xl font-bold text-foreground mt-4">
            Welcome Back
          </h2>

          <p className="text-sm text-foreground/70">
            Login to continue shopping
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          <input
            name="identifier"
            placeholder="Email or Phone Number"
            className="w-full px-4 py-3 rounded-xl bg-white border border-[#28170d]/10 
                       focus:ring-2 focus:ring-[#ff6e32]/40 outline-none"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white border border-[#28170d]/10 
                       focus:ring-2 focus:ring-[#ff6e32]/40 outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-footer text-white py-3 rounded-xl font-semibold 
                       hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm mt-5 text-foreground">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-[#ff6e32] font-semibold">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  </div>
);
}