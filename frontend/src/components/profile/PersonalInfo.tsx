"use client";

import {
  Mail,
  Phone,
  User,
  MapPin,
  Pencil
} from "lucide-react";

export default function PersonalInfo() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Personal Information
        </h2>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#28170D] text-white">
          <Pencil size={16} />
          Edit
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-6">

        <Info
          icon={<User size={18} />}
          label="Full Name"
          value="Atul Kumar"
        />

        <Info
          icon={<Mail size={18} />}
          label="Email"
          value="admin@gmail.com"
        />

        <Info
          icon={<Phone size={18} />}
          label="Phone"
          value="+91 9876543210"
        />

        <Info
          icon={<MapPin size={18} />}
          label="State"
          value="Uttar Pradesh"
        />

      </div>

    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: any) {
  return (
    <div className="border rounded-2xl p-4">

      <div className="flex items-center gap-3">

        {icon}

        <div>
          <p className="text-sm text-gray-500">
            {label}
          </p>

          <p className="font-semibold">
            {value}
          </p>
        </div>

      </div>

    </div>
  );
}