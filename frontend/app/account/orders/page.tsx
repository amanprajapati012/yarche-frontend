import AccountSidebar from "@/src/components/AccountSidebar/AccountSidebar";

const orders = [
  {
    id: "#ORD1001",
    date: "23 Jun 2026",
    amount: "₹12,999",
    status: "Delivered",
  },
  {
    id: "#ORD1002",
    date: "15 Jun 2026",
    amount: "₹8,499",
    status: "Processing",
  },
  {
    id: "#ORD1003",
    date: "09 Jun 2026",
    amount: "₹2,199",
    status: "Cancelled",
  },
];

export default function OrdersPage() {
  return (
    <div className="bg-[#f8f8fb] min-h-screen p-8">
      <div className="max-w-7xl mx-auto flex gap-6">

        <AccountSidebar />

        <div className="flex-1">

          <h1 className="text-4xl font-bold mb-8">
            My Orders
          </h1>

          <div className="space-y-5">

            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border rounded-3xl p-6 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-lg">
                    {order.id}
                  </h3>

                  <p className="text-gray-500">
                    {order.date}
                  </p>
                </div>

                <div className="font-semibold">
                  {order.amount}
                </div>

                <div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm
                    ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Processing"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <button className="border rounded-xl px-4 py-2">
                  View Details
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}