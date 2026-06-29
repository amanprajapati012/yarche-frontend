"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";

import StatsCards from "@/src/components/admin/dashboard/StatsCards";
import RevenueChart from "@/src/components/admin/dashboard/RevenueChart";
import LatestCustomers from "@/src/components/admin/dashboard/LatestCustomers";
import TopProducts from "@/src/components/admin/dashboard/TopProducts";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

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

      const [productsRes, usersRes] = await Promise.all([
        API.get("/products"),
        API.get("/admin/users"),
      ]);

      const productsData = productsRes.data?.products || [];
      const usersData = usersRes.data?.user || [];

      setProducts(productsData);
      setUsers(usersData);

      const totalProducts = productsData.length;
      const totalCustomers = usersData.length;

      const totalRevenue = productsData.reduce(
        (acc: number, product: any) => {
          const variants = product?.variants || [];

          const productRevenue = variants.reduce(
            (sum: number, variant: any) => {
              return (
                sum +
                (variant?.price || 0) *
                  (variant?.quantity || 0)
              );
            },
            0
          );

          return acc + productRevenue;
        },
        0
      );

      setStats({
        totalProducts,
        totalCustomers,
        totalOrders: 0,
        totalRevenue,
      });

      // ===== 12 MONTH CHART DATA =====

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

      const monthlyData = months.map(
        (month, index) => ({
          month,
          revenue:
            Math.round(
              (totalRevenue / 12) *
                (0.7 + Math.random() * 0.6)
            ) || 0,
        })
      );

      setChartData(monthlyData);
    } catch (err) {
      console.log("Dashboard Error:", err);
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
          Overview of your store performance
        </p>
      </div>

      {/* Stats */}
      <StatsCards
        stats={stats}
        loading={loading}
      />

      {/* Revenue + Customers */}
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

      {/* Top Products */}
      <TopProducts
        products={products}
      />
    </div>
  );
}