"use client";

import {
  MapPin,
  Pencil,
  Trash2,
  Plus
} from "lucide-react";

export default function AddressBook() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Address Book
        </h2>

        <button className="bg-[#FF6E23] text-white px-4 py-2 rounded-xl flex items-center gap-2">
          <Plus size={18} />
          Add Address
        </button>

      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-5">

        <div className="border-2 border-[#FF6E23] rounded-2xl p-5 relative">

          <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            Default
          </span>

          <MapPin />

          <h4 className="font-bold mt-3">
            Home Address
          </h4>

          <p className="text-sm mt-2 text-gray-600">
            ABC Colony Near Temple,
            Kanpur,
            Uttar Pradesh,
            208001
          </p>

          <div className="flex gap-3 mt-4">

            <button>
              <Pencil size={18} />
            </button>

            <button>
              <Trash2 size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}