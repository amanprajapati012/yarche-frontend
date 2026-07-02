"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/src/lib/api";
import { useAuthStore } from "@/src/store/authStore";
import OrderSuccess from "@/src/components/orders/OrderSuccess";

export default function Page() {
  const { id } = useParams();

  const { user } = useAuthStore();

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!user || !id) return;

    loadOrder();
  }, [user, id]);

  async function loadOrder() {
    try {
      const userId =
        (user as any)?._id ||
        (user as any)?.id ||
        (user as any)?.user?._id ||
        (user as any)?.user?.id;

      const res = await API.get(`/orderbyuser/${userId}`);

      const selectedOrder = res.data.orders.find(
        (item: any) => item._id === id
      );

      setOrder(selectedOrder);
    } catch (err) {
      console.log(err);
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <OrderSuccess order={order} />;
}