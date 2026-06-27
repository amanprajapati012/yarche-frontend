"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

import { getAddresses } from "@/src/lib/addressApi";

type FormData = {
  addressId?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

type Address = {
  _id: string;
  type: string;
  name: string;
  mobile: string;
  addressLine: string;
  landmark?: string;
  city: string;
  district?: string;
  state: string;
  country?: string;
  pincode: string;
  isDefault?: boolean;
};

type ShippingFormProps = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
};

export default function ShippingForm({
  form,
  setForm,
}: ShippingFormProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] =
    useState<Address | null>(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);

      const res = await getAddresses();
          console.log("ADDRESS API =>", res.data);

      const list: Address[] = res?.data?.data || [];
          console.log("ADDRESS LIST =>", list);

      setAddresses(list);

      if (list.length) {
        const selected =
          list.find((a) => a.isDefault) || list[0];

        selectAddress(selected);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const selectAddress = (address: Address) => {
    setSelectedAddress(address);

    setForm((prev) => ({
      ...prev,
      addressId: address._id,
      name: address.name,
      phone: address.mobile,
      address: address.addressLine,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    }));
  };

  return (
    <div className="bg-[#ead7b8] border border-[#d8c2a0] rounded-3xl p-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-[#3B281C]">
            Shipping Address
          </h2>

          <p className="text-[#6f5f52] text-sm mt-1">
            Select your saved delivery address
          </p>
        </div>

        <Link
          href="/account/addresses"
          className="text-sm font-semibold underline text-[#3B281C]"
        >
          Manage Address
        </Link>

      </div>

      {loading ? (
        <div className="py-12 text-center">
          Loading Addresses...
        </div>
      ) : addresses.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-[#c8ae89] p-10 text-center">

          <MapPin
            size={45}
            className="mx-auto text-[#3B281C]"
          />

          <h3 className="mt-4 text-2xl font-bold text-[#3B281C]">
            No Address Found
          </h3>

          <p className="mt-2 text-[#6f5f52]">
            Please add an address before checkout.
          </p>

          <Link
            href="/account/addresses"
            className="inline-flex mt-5 bg-[#3B281C] text-white px-6 py-3 rounded-xl"
          >
            Add Address
          </Link>

        </div>

      ) : (

        <>

          <div className="relative mb-6">

            <select
              value={form.addressId}
              onChange={(e) => {
                const address = addresses.find(
                  (a) => a._id === e.target.value
                );

                if (address) {
                  selectAddress(address);
                }
              }}
              className="w-full appearance-none rounded-xl border border-[#d8c2a0] bg-[#e0caa8] px-4 py-3 pr-10 outline-none"
            >
              {addresses.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.type.toUpperCase()} - {item.name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            />

          </div>

          <div className="space-y-4 mb-8">

            {addresses.map((address) => (

              <label
                key={address._id}
                className={`block cursor-pointer rounded-2xl border-2 p-5 transition ${
                  selectedAddress?._id === address._id
                    ? "border-[#3B281C] bg-[#f7ebd9]"
                    : "border-[#d8c2a0] bg-[#e9d3b2]"
                }`}
              >

                <div className="flex gap-4">

                  <input
                    type="radio"
                    checked={selectedAddress?._id === address._id}
                    onChange={() => selectAddress(address)}
                    className="mt-1 accent-[#3B281C]"
                  />

                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <h3 className="font-bold text-lg text-[#3B281C]">
                        {address.name}
                      </h3>

                      {address.isDefault && (
                        <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                          Default
                        </span>
                      )}

                    </div>

                    <p className="mt-2 text-[#6f5f52]">
                      {address.mobile}
                    </p>

                    <p className="mt-2 text-[#6f5f52] leading-6">
                      {address.addressLine}
                      {address.landmark && `, ${address.landmark}`}
                      <br />
                      {address.city}, {address.district}
                      <br />
                      {address.state}, {address.country}
                      <br />
                      {address.pincode}
                    </p>

                    <div className="mt-4 flex gap-3">

                      <button
                        type="button"
                        onClick={() => selectAddress(address)}
                        className="px-4 py-2 rounded-xl bg-[#3B281C] text-white text-sm"
                      >
                        Deliver Here
                      </button>

                      <Link
                        href="/account/addresses"
                        className="px-4 py-2 rounded-xl border border-[#3B281C] text-[#3B281C] text-sm"
                      >
                        Edit
                      </Link>

                    </div>

                  </div>

                </div>

              </label>

            ))}

          </div>

          <div className="grid md:grid-cols-2 gap-4">
                        <Input
              icon={<User size={18} />}
              placeholder="Full Name"
              value={form.name}
              readOnly
            />

            <Input
              icon={<Phone size={18} />}
              placeholder="Phone Number"
              value={form.phone}
              readOnly
            />

            <Input
              icon={<Mail size={18} />}
              placeholder="Email Address"
              value={form.email}
              className="md:col-span-2"
              onChange={(e: any) =>
                setForm((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />

            <Textarea
              icon={<MapPin size={18} />}
              value={form.address}
              className="md:col-span-2"
              readOnly
            />

            <Input
              placeholder="City"
              value={form.city}
              readOnly
            />

            <Input
              placeholder="State"
              value={form.state}
              readOnly
            />

            <Input
              placeholder="Pincode"
              value={form.pincode}
              readOnly
            />

          </div>

        </>

      )}

    </div>

  );
}

/* ================= INPUT ================= */

function Input({
  icon,
  className = "",
  ...props
}: any) {
  return (
    <div className={`relative ${className}`}>

      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f5f52]">
          {icon}
        </div>
      )}

      <input
        {...props}
        className={`
          w-full
          rounded-xl
          border
          border-[#d8c2a0]
          bg-[#e0caa8]
          py-3
          pr-4
          ${icon ? "pl-10" : "pl-4"}
          outline-none
          focus:border-[#3B281C]
        `}
      />

    </div>
  );
}

/* ================= TEXTAREA ================= */

function Textarea({
  icon,
  className = "",
  ...props
}: any) {
  return (
    <div className={`relative ${className}`}>

      {icon && (
        <div className="absolute left-3 top-3 text-[#6f5f52]">
          {icon}
        </div>
      )}

      <textarea
        {...props}
        rows={4}
        className={`
          w-full
          rounded-xl
          border
          border-[#d8c2a0]
          bg-[#e0caa8]
          py-3
          pr-4
          resize-none
          ${icon ? "pl-10" : "pl-4"}
          outline-none
          focus:border-[#3B281C]
        `}
      />

    </div>
  );
}
        