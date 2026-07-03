"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, RefreshCw } from "lucide-react";

import DataTable from "@/src/components/admin/DataTable";

import DeliveryStatusModal from "@/src/components/admin/orders/DeliveryStatusModal";

import API from "@/src/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Order = { _id: string; fullName: string; mobile: string | number; totalPrice: number; paymentMode: string; paymentStatus: string; deliveryStatus: string; shipping: number; couponDiscount: number; createdAt: string; address?: any; items?: any[]; };

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

 

  const [statusOpen, setStatusOpen] = useState(false);
  const [statusOrder, setStatusOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await API.get("/orders");
      console.log(res.data);
console.log(res.data.orders);

      setOrders(res.data?.orders || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

 const columns = useMemo(
  () => [
    {
      key: "_id",
      label: "Order ID",
      render: (row: Order) => row._id.slice(-8).toUpperCase(),
    },
    {
      key: "fullName",
      label: "Customer",
    },
    {
      key: "totalPrice",
      label: "Amount",
      render: (row: Order) => `₹${row.totalPrice}`,
    },
    {
      key: "paymentStatus",
      label: "Payment",
    },
    {
      key: "deliveryStatus",
      label: "Delivery",
    },
  ],
  []
);
    return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-sm text-gray-500">
              Manage customer orders and delivery status.
            </p>
          </div>
        </div>

        <DataTable
  columns={columns}
  data={orders}
  loading={loading}
  onView={(row: Order) => {
  router.push(`/admin/orders/${row._id}`);
}}
  onEdit={(row: Order) => {
    setStatusOrder(row);
    setStatusOpen(true);
  }}
/>
      </div>

      

      <DeliveryStatusModal
        open={statusOpen}
        onClose={() => {
          setStatusOpen(false);
          setStatusOrder(null);
        }}
        order={statusOrder as any}
        onSuccess={fetchOrders}
      />
    </>
  );
}