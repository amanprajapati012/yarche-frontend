"use client";

import { useRouter } from "next/navigation";
import { User } from "lucide-react";

export default function LatestCustomers({ users }: any) {
  const router = useRouter();

  const latest5 = users?.slice(0, 5) || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-[380px] flex flex-col">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        
        <div>
          <h2 className="text-lg font-semibold text-[#1f1a17]">
            New Customers
          </h2>
          <p className="text-xs text-gray-500">
            Latest registered users
          </p>
        </div>

        {/* small view all button TOP */}
        <button
          onClick={() => router.push("/admin/customers")}
          className="
            text-xs
            px-3 py-1.5
            rounded-full
            bg-[#1f1a17]
            text-white
            hover:opacity-90
            transition
          "
        >
          View All
        </button>
      </div>

      {/* List */}
      <div className="space-y-3 flex-1 overflow-hidden">
        {latest5.map((user: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 transition"
          >
            <div className="min-w-0">
              <p className="font-medium text-sm text-[#1f1a17] truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.email}
              </p>
            </div>

            <span className="text-[11px] text-gray-400 whitespace-nowrap">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}