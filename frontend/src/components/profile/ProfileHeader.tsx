"use client";

import { Crown } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="bg-gradient-to-r from-[#28170D] to-[#4A2D20] rounded-3xl p-8 text-white">

      <div className="flex items-center gap-5">

        <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-4xl font-bold">
          A
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            Atul Kumar
          </h1>

          <p className="opacity-80">
            admin@gmail.com
          </p>

          <div className="mt-3 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Crown size={18} />
            Premium Customer
          </div>
        </div>

      </div>

    </div>
  );
}