"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";

import StatsCards from "@/src/components/admin/dashboard/StatsCards";
import RevenueChart from "@/src/components/admin/dashboard/RevenueChart";
import LatestCustomers from "@/src/components/admin/dashboard/LatestCustomers";
import TopProducts from "@/src/components/admin/dashboard/TopProducts";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [chartData, setChartData] = useState<any[]>([]);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const [productsRes, usersRes, ordersRes] =
        await Promise.all([
          API.get("/products"),
          API.get("/admin/users"),
          API.get("/orders"),
        ]);

      const productsData =
        productsRes.data?.products || [];

      const usersData =
        usersRes.data?.user || [];

      const ordersData =
        ordersRes.data?.orders || [];

      setUsers(usersData);

      const totalProducts =
        productsData.length;

      const totalCustomers =
        usersData.length;

      const totalOrders =
        ordersData.length;

      // Only Delivered Orders
      const deliveredOrders =
        ordersData.filter(
          (order: any) =>
            order.deliveryStatus ===
            "Delivered"
        );

      const totalRevenue =
        deliveredOrders.reduce(
          (sum: number, order: any) =>
            sum + (order.totalPrice || 0),
          0
        );

      setStats({
        totalProducts,
        totalCustomers,
        totalOrders,
        totalRevenue,
      });

      // ===========================
      // Monthly Revenue
      // ===========================

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const revenueMap =
        new Array(12).fill(0);

      deliveredOrders.forEach(
        (order: any) => {
          if (!order.createdAt) return;

          const month =
            new Date(
              order.createdAt
            ).getMonth();

          revenueMap[month] +=
            order.totalPrice || 0;
        }
      );

      setChartData(
        months.map((month, index) => ({
          month,
          revenue: revenueMap[index],
        }))
      );

      // ====================================
      // TOP SELLING PRODUCTS (REAL DATA)
      // ====================================

      const soldMap: any = {};

      deliveredOrders.forEach((order: any) => {
        order.items?.forEach((item: any) => {
          const key = item.isVariant
            ? `${item.product_id}_${item.variant_id}`
            : String(item.product_id);

          if (!soldMap[key]) {
            soldMap[key] = {
  sold: 0,
  revenue: 0,

  productId: item.product_id,

  variantId: item.variant_id,

  isVariant: item.isVariant,

  productName: item.product_name,

  variantTitle: item.variant_title,
};
          }

          soldMap[key].sold += item.quantity || 0;
          soldMap[key].revenue += item.itemTotalPrice || 0;
        });
      });

      const topSellingProducts = Object.values(soldMap).map((item: any) => {
        const product = productsData.find(
          (p: any) => String(p._id) === String(item.productId)
        );

        if (!product) return null;

        if (item.isVariant) {
          const variant = product.variants?.find(
            (v: any) => String(v._id) === String(item.variantId)
          );

          if (!variant) return null;

          return {
            ...variant,

            _id: variant._id,

            isVariant: true,

            displayName: item.variantTitle,

            productSku: product.productSku,

            sold: item.sold,

            revenue: item.revenue,
          };
        }

        return {
          ...product,

          isVariant: false,

          displayName: item.productName,

          sold: item.sold,

          revenue: item.revenue,
        };
      }).filter(Boolean);

      setTopProducts(
        topSellingProducts
          .sort((a: any, b: any) => b.sold - a.sold)
          .slice(0, 5)
      );


    } catch (err) {
      console.log(
        "Dashboard Error:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Admin Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Overview of your store
          performance
        </p>
      </div>

      {/* Stats */}

      <StatsCards
        stats={stats}
        loading={loading}
      />

      {/* Revenue */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <RevenueChart
            data={chartData}
          />
        </div>

        <div className="lg:col-span-1">
          <LatestCustomers
            users={users}
          />
        </div>
      </div>

      {/* Top Selling Products */}

      <TopProducts
        products={topProducts}
      />
    </div>
  );
}