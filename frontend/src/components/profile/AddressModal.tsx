"use client";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

import { X } from "lucide-react";
import { useState } from "react";

export default function AddressModal({
  open,
  onClose,
}: any) {
  const [center, setCenter] = useState({
    lat: 28.6139,
    lng: 77.209,
  });

  const [form, setForm] = useState({
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!,
  });

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">

      <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden">

        <div className="flex justify-between items-center p-5 border-b">

          <h2 className="font-bold text-xl">
            Add New Address
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="p-6 grid lg:grid-cols-2 gap-6">

          <div className="space-y-4">

            <input
              placeholder="Address"
              className="w-full border rounded-xl p-3"
            />

            <input
              placeholder="City"
              className="w-full border rounded-xl p-3"
            />

            <input
              placeholder="State"
              className="w-full border rounded-xl p-3"
            />

            <input
              placeholder="Pincode"
              className="w-full border rounded-xl p-3"
            />

            <button
              onClick={getCurrentLocation}
              className="w-full bg-[#FF6E23] text-white py-3 rounded-xl"
            >
              Use Current Location
            </button>

          </div>

          <div>

            {isLoaded && (
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{
                  width: "100%",
                  height: "450px",
                }}
              >
                <Marker position={center} />
              </GoogleMap>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}