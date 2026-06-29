"use client";

import {
  Home,
  Building2,
  MapPin,
  Phone,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react";

interface AddressCardProps {
  data: any;
  onEdit: (data: any) => void;
  onDelete: (id: string) => void;
}

export default function AddressCard({
  data,
  onEdit,
  onDelete,
}: AddressCardProps) {
  const getTypeIcon = () => {
    switch (data.type?.toLowerCase()) {
      case "home":
        return <Home size={18} />;
      case "office":
        return <Building2 size={18} />;
      default:
        return <MapPin size={18} />;
    }
  };

  const getTypeName = () => {
    switch (data.type?.toLowerCase()) {
      case "home":
        return "Home";
      case "office":
        return "Office";
      default:
        return "Other";
    }
  };

  return (
    <div
      className="
        bg-[var(--background)] 
        border-2
        border-[#d8b98c]
        rounded-2xl
        p-5
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      {/* Top */}

      <div className="flex justify-between items-start">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-footer text-white flex items-center justify-center">
            {getTypeIcon()}
          </div>

          <div>

            <h3 className="font-bold text-lg text-foreground">
              {data.name}
            </h3>

            <div className="flex items-center gap-2 mt-1">

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  bg-footer
                  text-white
                "
              >
                {getTypeName()}
              </span>

              {data.isDefault && (
                <span
                  className="
                    flex
                    items-center
                    gap-1
                    px-3
                    py-1
                    rounded-full
                    bg-green-600
                    text-white
                    text-xs
                    font-semibold
                  "
                >
                  <CheckCircle2 size={13} />
                  Default
                </span>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Address */}

      <div className="mt-5 space-y-3">

        <div className="flex gap-3">

          <MapPin
            size={18}
            className="text-foreground mt-1 flex-shrink-0"
          />

          <div className="text-[#4d3725] leading-6">

            <p>{data.addressLine}</p>

            {data.landmark && (
              <p>
                <strong>Landmark:</strong> {data.landmark}
              </p>
            )}

            <p>
              {data.city}, {data.district}
            </p>

            <p>
              {data.state}, {data.country}
            </p>

            <p>{data.pincode}</p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Phone size={18} className="text-foreground" />

          <span className="text-foreground font-medium">
            {data.mobile}
          </span>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex gap-3 mt-6">

        <button
          onClick={() => onEdit(data)}
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-footer
            text-white
            py-3
            font-semibold
            hover:bg-[#3c2515]
            transition
          "
        >
          <Pencil size={17} />
          Edit
        </button>

        <button
          onClick={() => onDelete(data._id)}
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border-2
            border-red-600
            text-red-600
            py-3
            font-semibold
            hover:bg-red-600
            hover:text-white
            transition
          "
        >
          <Trash2 size={17} />
          Delete
        </button>

      </div>
    </div>
  );
}