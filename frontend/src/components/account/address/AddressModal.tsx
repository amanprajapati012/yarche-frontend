"use client";

import { useEffect, useState } from "react";
import { X, MapPin } from "lucide-react";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

const initialState = {
    _id: "",
    type: "home",
    name: "",
    mobile: "",
    email: "",
    addressLine: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    pincode: "",
    latitude: "",
    longitude: "",
};

interface Props {
    onClose: () => void;
    onSave: (form: any) => void;
    editData?: any;
}

export default function AddressModal({
    onClose,
    onSave,
    editData,
}: Props) {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState(initialState);

    const [errors, setErrors] = useState<any>({});

    /* ================= EDIT ================= */

    useEffect(() => {
        if (editData) {
            setForm({
                _id: editData._id || "",
                type: editData.type || "home",
                name: editData.name || "",
                mobile: editData.mobile || "",
                email: editData.email || "",
                addressLine: editData.addressLine || "",
                landmark: editData.landmark || "",
                city: editData.city || "",
                district: editData.district || "",
                state: editData.state || "",
                country: editData.country || "India",
                pincode: editData.pincode || "",
                latitude: editData.latitude || "",
                longitude: editData.longitude || "",
            });
        } else {
            setForm(initialState);
        }
    }, [editData]);

    /* ================= INPUT ================= */

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev: any) => ({
            ...prev,
            [name]: "",
        }));
    };

    /* ================= VALIDATION ================= */

    const validate = () => {
        const err: any = {};

        if (!form.name.trim()) err.name = "Name is required";

        if (!form.mobile.trim()) err.mobile = "Mobile is required";

        if (!/^[6-9]\d{9}$/.test(form.mobile))
            err.mobile = "Enter valid mobile number";

        if (!form.email.trim()) {
            err.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
        ) {
            err.email = "Invalid Email";
        }

        if (!form.addressLine.trim())
            err.addressLine = "Address is required";

        if (!form.city.trim()) err.city = "City is required";

        if (!form.state.trim()) err.state = "State is required";

        if (!form.pincode.trim()) err.pincode = "Pincode is required";

        if (!/^\d{6}$/.test(form.pincode))
            err.pincode = "Invalid Pincode";

        setErrors(err);

        return Object.keys(err).length === 0;
    };

    /* ================= SAVE ================= */

    const handleSave = () => {
        if (!validate()) return;

        onSave(form);
    };

    /* ================= LOCATION ================= */

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported.");
            return;
        }

        setLoading(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                try {
                    const res = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
                    );

                    const data = await res.json();

                    if (data.results?.length) {
                        const result = data.results[0];

                        const getComponent = (type: string) =>
                            result.address_components.find((x: any) =>
                                x.types.includes(type)
                            )?.long_name || "";

                        setForm((prev) => ({
                            ...prev,
                            latitude: String(lat),
                            longitude: String(lng),
                            addressLine: result.formatted_address,
                            city: getComponent("locality"),
                            district: getComponent(
                                "administrative_area_level_2"
                            ),
                            state: getComponent(
                                "administrative_area_level_1"
                            ),
                            country: getComponent("country"),
                            pincode: getComponent("postal_code"),
                        }));
                    }
                } catch (err) {
                    console.log(err);
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setLoading(false);
                alert("Unable to fetch location.");
            }
        );
    };

    return (
        <div
            className="
    fixed
    left-0
    right-0
    bottom-0
    top-[140px]
    z-[99999]
    bg-black/60
    flex
    justify-center
    items-start
    overflow-y-auto
    p-5
  "
        >
            <div
                className="
    w-full
    max-w-3xl
    rounded-3xl
    bg-[#f7e6c6]
    shadow-2xl
    border
    border-[#d8b98c]
    max-h-[calc(100vh-170px)]
    overflow-y-auto
    relative
    mb-10
  "
            >

                {/* Header */}
                <div className="sticky top-0 bg-[#f2d9b1] border-b border-[#d8b98c] px-6 py-4 flex items-center justify-between rounded-t-3xl">
                    <h2 className="text-2xl font-bold text-[#28170d]">
                        {editData ? "Edit Address" : "Add New Address"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-[#e7cda2] flex items-center justify-center transition"
                    >
                        <X />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">

                    {/* Type */}

                    <div className="mb-5">
                        <label className="block text-sm font-semibold mb-2 text-[#28170d]">
                            Address Type
                        </label>

                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#cfae7d] bg-[#efd6ad] px-4 py-3 outline-none focus:border-[#28170d]"
                        >
                            <option value="home">Home</option>
                            <option value="office">Office</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <Input
                            label="Full Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            error={errors.name}
                        />

                        <Input
                            label="Mobile Number"
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            error={errors.mobile}
                        />
                        <Input
    label="Email Address"
    name="email"
    value={form.email}
    onChange={handleChange}
    error={errors.email}
/>

                        <div className="md:col-span-2">
                            <Input
                                label="Address Line"
                                name="addressLine"
                                value={form.addressLine}
                                onChange={handleChange}
                                error={errors.addressLine}
                            />
                        </div>

                        <Input
                            label="Landmark"
                            name="landmark"
                            value={form.landmark}
                            onChange={handleChange}
                        />

                        <Input
                            label="City"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            error={errors.city}
                        />

                        <Input
                            label="District"
                            name="district"
                            value={form.district}
                            onChange={handleChange}
                        />

                        <Input
                            label="State"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                            error={errors.state}
                        />

                        <Input
                            label="Country"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                        />

                        <Input
                            label="Pincode"
                            name="pincode"
                            value={form.pincode}
                            onChange={handleChange}
                            error={errors.pincode}
                        />

                    </div>

                    {/* Current Location */}

                    <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={loading}
                        className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-[#28170d] text-white py-3 font-semibold hover:bg-[#3a2415] transition"
                    >
                        <MapPin size={18} />

                        {loading ? "Detecting Location..." : "Use Current Location"}
                    </button>

                    {/* Footer */}

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">

                        <button
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-[#28170d] py-3 font-semibold text-[#28170d] hover:bg-[#28170d] hover:text-white transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            className="flex-1 rounded-xl bg-[#28170d] py-3 font-semibold text-white hover:bg-[#3a2415] transition"
                        >
                            {editData ? "Update Address" : "Save Address"}
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}

/* ================= INPUT ================= */

interface InputProps {
    label: string;
    name: string;
    value: string;
    onChange: any;
    error?: string;
}

function Input({
    label,
    name,
    value,
    onChange,
    error,
}: InputProps) {
    return (
        <div>

            <label className="block text-sm font-semibold text-[#28170d] mb-2">
                {label}
            </label>

            <input
                autoComplete="off"
                name={name}
                value={value}
                onChange={onChange}
                className={`
          w-full
          rounded-xl
          border
          px-4
          py-3
          outline-none
          transition
          bg-[#efd6ad]
          text-[#28170d]
          placeholder:text-[#7d5d38]
          ${error
                        ? "border-red-500"
                        : "border-[#cfae7d] focus:border-[#28170d]"
                    }
        `}
            />

            {error && (
                <p className="text-red-600 text-sm mt-1">
                    {error}
                </p>
            )}

        </div>
    );
}