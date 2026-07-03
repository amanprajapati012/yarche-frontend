"use client";

import { useEffect, useState } from "react";

import AccountSidebar from "@/src/components/AccountSidebar/AccountSidebar";

import OrderCard from "@/src/components/order/OrderCard";
import OrderSkeleton from "@/src/components/order/OrderSkeleton";
import OrderEmpty from "@/src/components/order/OrderEmpty";

import { useAuthStore } from "@/src/store/authStore";
import { getOrdersByUser } from "@/src/services/order";
import { Order } from "@/src/types/order";

export default function OrdersPage() {
  const user = useAuthStore((state) => state.user);
  const hydrate = useAuthStore((state) => state.hydrate);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (user?.id) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const res = await getOrdersByUser(user!.id);

      if (res.response === "success") {
        setOrders(res.orders);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-background py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">

        <AccountSidebar />

        <div className="flex-1">

          <h1 className="text-4xl font-bold text-foreground">
            My Orders
          </h1>

          <p className="text-foreground/60 mt-2">
            {orders.length} Order{orders.length !== 1 ? "s" : ""}
          </p>

          <div className="mt-8">

            {loading ? (
              <OrderSkeleton />
            ) : orders.length === 0 ? (
              <OrderEmpty />
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}