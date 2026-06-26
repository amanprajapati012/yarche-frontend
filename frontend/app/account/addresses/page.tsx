import AccountSidebar from "@/src/components/AccountSidebar/AccountSidebar";

const addresses = [
  {
    title: "Home",
    address:
      "123 Main Road, Swaroop Nagar, Kanpur, Uttar Pradesh",
  },
  {
    title: "Office",
    address:
      "IT Park Tower A, Noida Sector 62, Uttar Pradesh",
  },
  {
    title: "Parents Home",
    address:
      "Village Bilhaur, Kanpur Nagar, Uttar Pradesh",
  },
  {
    title: "Other",
    address:
      "Civil Lines, Lucknow, Uttar Pradesh",
  },
];

export default function AddressesPage() {
  return (
    <div className="bg-[#f8f8fb] min-h-screen p-8">
      <div className="max-w-7xl mx-auto flex gap-6">

        <AccountSidebar />

        <div className="flex-1">

          <div className="flex justify-between mb-8">

            <h1 className="text-4xl font-bold">
              My Addresses
            </h1>

            <button className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-violet-600 to-purple-600">
              Add New Address
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {addresses.map((item) => (
              <div
                key={item.title}
                className="bg-white border rounded-3xl p-6"
              >
                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.address}
                </p>

                <div className="flex gap-6 mt-6">
                  <button>Edit</button>
                  <button className="text-red-500">
                    Delete
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}