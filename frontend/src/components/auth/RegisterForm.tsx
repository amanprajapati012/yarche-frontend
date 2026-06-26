"use client";
import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Loader2,
} from "lucide-react";
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

    addressLine: "",
    landmark: "",

    city: "",
    district: "",
    state: "",
    country: "",

    pincode: "",

    latitude: "",
    longitude: "",
  });

  const [locationLoading, setLocationLoading] =
    useState(true);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          const data = await response.json();

          setForm((prev) => ({
            ...prev,
            latitude: String(lat),
            longitude: String(lng),

            addressLine: data.display_name || "",

            city:
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "",

            district: data.address?.county || "",

            state: data.address?.state || "",

            country: data.address?.country || "",

            pincode: data.address?.postcode || "",
          }));
        } catch (error) {
          console.log(error);
        } finally {
          setLocationLoading(false);
        }
      },
      () => {
        setLocationLoading(false);
      }
    );
  };

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

    if (!form.name.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (form.mobile.length !== 10) {
      toast.error("Mobile number must be exactly 10 digits");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const toastId = toast.loading("Creating your account...");

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        password: form.password,

        addressLine: form.addressLine,
        landmark: form.landmark,

        city: form.city,
        district: form.district,
        state: form.state,
        country: form.country,

        pincode: form.pincode,

        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
      };

      const res = await API.post("/register", payload);

      if (res.data.response === "success") {
        toast.success("Account created successfully 🎉", {
          id: toastId,
        });

        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      } else {
        toast.error(res.data.message || "Registration failed", {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Something went wrong",
        {
          id: toastId,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#28170d]/10 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#ff6e32]/40 focus:border-[#ff6e32]/20";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff6e2] px-4 py-8">
      <div className="w-full max-w-md">
        <div
          className="
            bg-[#fff0d3]
            rounded-3xl
            border
            border-[#28170d]/10
            p-6
            md:p-8
            shadow-[0_20px_60px_rgba(40,23,13,0.12)]
          "
        >
          {/* Header */}
          <div className="text-center mb-7">
            <div className="w-16 h-16 mx-auto bg-[#ff6e23] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <User size={28} />
            </div>

            <h2 className="text-3xl font-bold text-[#28170d] mt-4">
              Create Account
            </h2>

            <p className="text-sm text-[#28170d]/70 mt-2">
              Handmade elegance starts here ✨
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#28170d]/50"
              />

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
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#28170d]/50"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Mobile */}
            <div className="relative">
              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#28170d]/50"
              />

              <input
                name="mobile"
                type="tel"
                maxLength={10}
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleMobileChange}
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#28170d]/50"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#28170d]/50"
              />

              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#ff6e23]/10 bg-gradient-to-br from-[#fff8ef] via-white to-[#fff2e7] shadow-sm">
              <div className="p-5 border-b border-[#ff6e23]/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff6e23] text-white shadow-lg">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#28170d]">
                      Delivery Location
                    </h3>

                    <p className="text-xs text-[#28170d]/60">
                      Automatically detected from your device
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                {locationLoading ? (
                  <div className="flex items-center gap-3 text-sm text-[#28170d]/70">
                    <Loader2
                      size={18}
                      className="animate-spin text-[#ff6e23]"
                    />
                    Detecting your current location...
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-white p-4 border border-[#28170d]/5">
                      <p className="text-[11px] uppercase tracking-wider text-[#28170d]/50 mb-2">
                        Address
                      </p>

                      <p className="text-sm leading-6 text-[#28170d]">
                        {form.addressLine || "Location unavailable"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white p-4 border border-[#28170d]/5">
                        <p className="text-[11px] uppercase text-[#28170d]/50">
                          City
                        </p>

                        <p className="font-semibold text-[#28170d] mt-1">
                          {form.city || "-"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-4 border border-[#28170d]/5">
                        <p className="text-[11px] uppercase text-[#28170d]/50">
                          State
                        </p>

                        <p className="font-semibold text-[#28170d] mt-1">
                          {form.state || "-"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-4 border border-[#28170d]/5">
                        <p className="text-[11px] uppercase text-[#28170d]/50">
                          District
                        </p>

                        <p className="font-semibold text-[#28170d] mt-1">
                          {form.district || "-"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-4 border border-[#28170d]/5">
                        <p className="text-[11px] uppercase text-[#28170d]/50">
                          Pincode
                        </p>

                        <p className="font-semibold text-[#28170d] mt-1">
                          {form.pincode || "-"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="w-full rounded-2xl bg-[#ff6e23] py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Refresh Location
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-gradient-to-r
                from-[#28170d]
                to-[#4a2c1d]
                text-white
                py-3
                rounded-xl
                font-semibold
                transition-all
                duration-200
                hover:scale-[1.02]
                hover:shadow-lg
                active:scale-[0.98]
                disabled:opacity-60
                disabled:hover:scale-100
              "
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm mt-6 text-[#28170d]/80">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-[#ff6e32] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}