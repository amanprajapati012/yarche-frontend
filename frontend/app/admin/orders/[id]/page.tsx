"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import API from "@/src/lib/api";
import { toast } from "sonner";
import { getImageUrl } from "@/src/lib/image";

type Order = {
    _id: string;
    fullName: string;
    mobile: string | number;
    paymentMode: string;
    paymentStatus: string;
    deliveryStatus: string;
    shipping: number;
    couponDiscount: number;
    couponCode: string;
    totalPrice: number;
    transactionNo: string;
    itemQuantity: number;
    createdAt: string;

    address?: {
        fullName?: string;
        mobile?: string;
        email?: string;
        addressLine?: string;
        landmark?: string;
        district?: string;
        city?: string;
        state?: string;
        country?: string;
        pincode?: string;
    };

    items: any[];
};

export default function OrderDetailsPage() {
    const router = useRouter();
    const params = useParams();

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        try {
            setLoading(true);

            const res = await API.get(`/admin/order/${params.id}`);

            setOrder(res.data?.order || res.data?.data || res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load order");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params?.id) {
            fetchOrder();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ background: "var(--background)" }}
            >
                <p className="text-lg text-[var(--text-secondary)]">
                    Loading order...
                </p>
            </div>
        );
    }

    if (!order) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ background: "var(--background)" }}
            >
                <p className="text-red-500">Order not found.</p>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen p-6"
            style={{ background: "var(--background)" }}
        >
            <div className="mx-auto max-w-7xl">
                <button
                    onClick={() => router.back()}
                    className="mb-6 flex items-center gap-2 rounded-lg border px-4 py-2 transition hover:opacity-90"
                    style={{
                        background: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--foreground)",
                    }}
                >
                    <ArrowLeft size={18} />
                    Back to Orders
                </button>

                <div
                    className="rounded-2xl border p-6"
                    style={{
                        background: "var(--surface)",
                        borderColor: "var(--border)",
                    }}
                >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1
                                className="text-3xl font-bold"
                                style={{ color: "var(--foreground)" }}
                            >
                                Order Details
                            </h1>

                            <p
                                className="mt-2"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Order ID: {order._id}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <span
                                className="rounded-full px-4 py-2 text-sm font-semibold"
                                style={{
                                    background: "#dcfce7",
                                    color: "#166534",
                                }}
                            >
                                Payment : {order.paymentStatus}
                            </span>

                            <span
                                className="rounded-full px-4 py-2 text-sm font-semibold"
                                style={{
                                    background: "#dbeafe",
                                    color: "#1d4ed8",
                                }}
                            >
                                Delivery : {order.deliveryStatus}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    {/* Customer Details */}
                    <div
                        className="rounded-2xl border p-6"
                        style={{
                            background: "var(--surface)",
                            borderColor: "var(--border)",
                        }}
                    >
                        <h2
                            className="mb-5 text-xl font-semibold"
                            style={{ color: "var(--foreground)" }}
                        >
                            Customer Details
                        </h2>

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Full Name
                                </p>

                                <p className="font-medium text-[var(--foreground)]">
                                    {order.fullName}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Mobile
                                </p>

                                <p className="font-medium text-[var(--foreground)]">
                                    {order.mobile}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Payment Mode
                                </p>

                                <p className="font-medium text-[var(--foreground)]">
                                    {order.paymentMode}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Transaction No
                                </p>

                                <p className="font-medium text-[var(--foreground)] break-all">
                                    {order.transactionNo}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Total Quantity
                                </p>

                                <p className="font-medium text-[var(--foreground)]">
                                    {order.itemQuantity}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Order Date
                                </p>

                                <p className="font-medium text-[var(--foreground)]">
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-3">

                        <p><b>Name :</b> {order.address?.fullName}</p>

                        <p><b>Mobile :</b> {order.address?.mobile}</p>

                        <p><b>Email :</b> {order.address?.email || "-"}</p>

                        <p><b>Address :</b> {order.address?.addressLine}</p>

                        <p><b>Landmark :</b> {order.address?.landmark}</p>

                        <p><b>District :</b> {order.address?.district}</p>

                        <p><b>City :</b> {order.address?.city}</p>

                        <p><b>State :</b> {order.address?.state}</p>

                        <p><b>Country :</b> {order.address?.country}</p>

                        <p><b>Pincode :</b> {order.address?.pincode}</p>

                    </div>
                </div>

                <div className="mt-8">
                    <div
                        className="overflow-hidden rounded-2xl border"
                        style={{
                            background: "var(--surface)",
                            borderColor: "var(--border)",
                        }}
                    >
                        {/* HEADER */}
                        <div
                            className="border-b px-6 py-4"
                            style={{ borderColor: "var(--border)" }}
                        >
                            <h2
                                className="text-xl font-semibold"
                                style={{ color: "var(--foreground)" }}
                            >
                                Ordered Products
                            </h2>
                        </div>

                        {/* TABLE */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead
                                    style={{
                                        background: "var(--input-bg)",
                                        color: "var(--foreground)",
                                    }}
                                >
                                    <tr>
                                        <th className="px-5 py-4 text-left">Product</th>
                                        <th className="px-5 py-4 text-center">Qty</th>
                                        <th className="px-5 py-4 text-right">Price</th>
                                        <th className="px-5 py-4 text-right">Discount</th>
                                        <th className="px-5 py-4 text-right">Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {order.items?.map((item: any, index: number) => (
                                        <tr
                                            key={index}
                                            className="border-t"
                                            style={{ borderColor: "var(--border)" }}
                                        >
                                            {/* PRODUCT */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={getImageUrl(item.image)}
                                                        alt={item.product_name || item.name}
                                                        className="h-14 w-14 rounded-lg border object-cover"
                                                        style={{ borderColor: "var(--border)" }}
                                                    />

                                                    <div>
                                                        <p
                                                            className="font-medium"
                                                            style={{ color: "var(--foreground)" }}
                                                        >
                                                            {item.product_name || item.name}
                                                        </p>

                                                        <p
                                                            className="text-xs"
                                                            style={{ color: "var(--text-secondary)" }}
                                                        >
                                                            {item.category || ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* QTY */}
                                            <td
                                                className="px-5 py-4 text-center"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                {item.quantity}
                                            </td>

                                            {/* PRICE */}
                                            <td
                                                className="px-5 py-4 text-right"
                                                style={{ color: "var(--text-secondary)" }}
                                            >
                                                ₹{item.price}
                                            </td>

                                            {/* DISCOUNT */}
                                            <td
                                                className="px-5 py-4 text-right"
                                                style={{ color: "#16a34a" }}
                                            >
                                                ₹{item.discountedPrice ?? "-"}
                                            </td>

                                            {/* TOTAL */}
                                            <td
                                                className="px-5 py-4 text-right font-semibold"
                                                style={{ color: "var(--foreground)" }}
                                            >
                                                ₹{item.itemTotalPrice ?? item.price * item.quantity}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SUMMARY */}
                    <div className="mt-8 flex justify-end">
                        <div
                            className="w-full max-w-md rounded-2xl border p-6"
                            style={{
                                background: "var(--surface)",
                                borderColor: "var(--border)",
                            }}
                        >
                            <h2
                                className="mb-5 text-xl font-semibold"
                                style={{ color: "var(--foreground)" }}
                            >
                                Order Summary
                            </h2>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-secondary)]">Shipping</span>
                                    <span style={{ color: "var(--foreground)" }}>
                                        ₹{order.shipping}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-[var(--text-secondary)]">
                                        Coupon Discount
                                    </span>
                                    <span className="text-green-600">
                                        -₹{order.couponDiscount}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-[var(--text-secondary)]">
                                        Coupon Code
                                    </span>
                                    <span style={{ color: "var(--foreground)" }}>
                                        {order.couponCode || "-"}
                                    </span>
                                </div>

                                <div
                                    className="mt-4 flex justify-between border-t pt-4"
                                    style={{ borderColor: "var(--border)" }}
                                >
                                    <span
                                        className="text-lg font-bold"
                                        style={{ color: "var(--foreground)" }}
                                    >
                                        Grand Total
                                    </span>

                                    <span
                                        className="text-lg font-bold"
                                        style={{ color: "var(--foreground)" }}
                                    >
                                        ₹{order.totalPrice}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
