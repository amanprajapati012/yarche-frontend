"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import API from "@/src/lib/api";
import DataTable from "@/src/components/admin/DataTable";

export default function CustomersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/users");

      if (res.data?.response === "success") {
        setUsers(res.data.user);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log("Users fetch error:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Columns (NO ACTIONS)
  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "mobile",
      label: "Mobile",
    },
    {
      key: "city",
      label: "City",
      render: (row: any) => row?.address?.city || "-",
    },
    {
      key: "state",
      label: "State",
      render: (row: any) => row?.address?.state || "-",
    },
    {
      key: "pincode",
      label: "Pincode",
      render: (row: any) => row?.address?.pincode || "-",
    },
    {
      key: "createdAt",
      label: "Joined",
      render: (row: any) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="text-xl font-semibold">
          Customers
        </h1>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
      />
    </div>
  );
}