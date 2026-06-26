"use client";

import Link from "next/link";

export default function OrdersTable() {
  return (
    <div className="bg-white rounded-3xl p-6">

      <h2 className="text-xl font-bold mb-5">
        My Orders
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>#YR12345</td>
              <td>22 Jun 2026</td>
              <td>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Delivered
                </span>
              </td>
              <td>₹4,999</td>

              <td>
                <Link
                  href="/orders/YR12345"
                  className="text-[#FF6E23]"
                >
                  View
                </Link>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}