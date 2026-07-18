"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Layers, Package, Truck, Tag, Receipt } from "lucide-react";
import API from "@/src/lib/api";
import { toast } from "sonner";
import { getImageUrl } from "@/src/lib/image";

type ComboSubItem = {
    product_id?: string;
    variant_id?: string | null;
    name?: string;
    variant_title?: string;
    quantity: number;
    price: number;
};

type OrderItem = {
    type?: "product" | "combo";

    // product fields
    product_id?: string;
    variant_id?: string | null;
    variant_title?: string;
    isVariant?: boolean;

    // combo fields
    combo_id?: string;
    comboSku?: string;
    comboProducts?: ComboSubItem[];

    // common
    product_name: string;
    category?: string;
    price: number;
    discountedPrice?: number;
    itemTotalPrice?: number;
    image?: { url?: string; public_id?: string } | string;
    quantity: number;
};

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

    items: OrderItem[];
};

const getItemImage = (item: OrderItem) => {
    if (typeof item.image === "string") return item.image;
    return item.image?.url || "";
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
                <p className="text-lg text-[var(--text-secondary)] animate-pulse">
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
            className="min-h-screen p-4 sm:p-6"
            style={{ background: "var(--background)" }}
        >
            <div className="mx-auto max-w-7xl">
                <button
                    onClick={() => router.back()}
                    className="mb-6 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:shadow-md hover:-translate-y-0.5"
                    style={{
                        background: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--foreground)",
                    }}
                >
                    <ArrowLeft size={16} />
                    Back to Orders
                </button>

                {/* HEADER CARD */}
                <div
                    className="rounded-2xl border p-6 shadow-sm"
                    style={{
                        background: "var(--surface)",
                        borderColor: "var(--border)",
                    }}
                >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1
                                className="text-2xl sm:text-3xl font-bold tracking-tight"
                                style={{ color: "var(--foreground)" }}
                            >
                                Order Details
                            </h1>

                            <p
                                className="mt-1.5 text-sm font-mono"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                #{order._id}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            <span
                                className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide"
                                style={{
                                    background: "#dcfce7",
                                    color: "#166534",
                                }}
                            >
                                Payment: {order.paymentStatus}
                            </span>

                            <span
                                className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide"
                                style={{
                                    background: "#dbeafe",
                                    color: "#1d4ed8",
                                }}
                            >
                                Delivery: {order.deliveryStatus}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    {/* Customer Details */}
                    <div
                        className="rounded-2xl border p-6 shadow-sm"
                        style={{
                            background: "var(--surface)",
                            borderColor: "var(--border)",
                        }}
                    >
                        <h2
                            className="mb-5 flex items-center gap-2 text-lg font-semibold"
                            style={{ color: "var(--foreground)" }}
                        >
                            <Package size={18} />
                            Customer Details
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                                    Full Name
                                </p>

                                <p className="mt-0.5 font-medium text-[var(--foreground)]">
                                    {order.fullName}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                                    Mobile
                                </p>

                                <p className="mt-0.5 font-medium text-[var(--foreground)]">
                                    {order.mobile}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                                    Payment Mode
                                </p>

                                <p className="mt-0.5 font-medium text-[var(--foreground)]">
                                    {order.paymentMode}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                                    Transaction No
                                </p>

                                <p className="mt-0.5 font-medium text-[var(--foreground)] break-all">
                                    {order.transactionNo || "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                                    Total Quantity
                                </p>

                                <p className="mt-0.5 font-medium text-[var(--foreground)]">
                                    {order.itemQuantity}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                                    Order Date
                                </p>

                                <p className="mt-0.5 font-medium text-[var(--foreground)]">
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div
                        className="rounded-2xl border p-6 shadow-sm"
                        style={{
                            background: "var(--surface)",
                            borderColor: "var(--border)",
                        }}
                    >
                        <h2
                            className="mb-5 flex items-center gap-2 text-lg font-semibold"
                            style={{ color: "var(--foreground)" }}
                        >
                            <Truck size={18} />
                            Shipping Address
                        </h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between gap-4">
                                <span className="text-[var(--text-secondary)]">Name</span>
                                <span className="font-medium text-right" style={{ color: "var(--foreground)" }}>{order.address?.fullName || "-"}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-[var(--text-secondary)]">Mobile</span>
                                <span className="font-medium text-right" style={{ color: "var(--foreground)" }}>{order.address?.mobile || "-"}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-[var(--text-secondary)]">Email</span>
                                <span className="font-medium text-right" style={{ color: "var(--foreground)" }}>{order.address?.email || "-"}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-[var(--text-secondary)]">Address</span>
                                <span className="font-medium text-right" style={{ color: "var(--foreground)" }}>{order.address?.addressLine || "-"}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-[var(--text-secondary)]">Landmark</span>
                                <span className="font-medium text-right" style={{ color: "var(--foreground)" }}>{order.address?.landmark || "-"}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-[var(--text-secondary)]">District</span>
                                <span className="font-medium text-right" style={{ color: "var(--foreground)" }}>{order.address?.district || "-"}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-[var(--text-secondary)]">City</span>
                                <span className="font-medium text-right" style={{ color: "var(--foreground)" }}>{order.address?.city || "-"}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-[var(--text-secondary)]">State</span>
                                <span className="font-medium text-right" style={{ color: "var(--foreground)" }}>{order.address?.state || "-"}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-[var(--text-secondary)]">Country</span>
                                <span className="font-medium text-right" style={{ color: "var(--foreground)" }}>{order.address?.country || "-"}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-[var(--text-secondary)]">Pincode</span>
                                <span className="font-medium text-right" style={{ color: "var(--foreground)" }}>{order.address?.pincode || "-"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ORDERED PRODUCTS */}
                <div className="mt-6">
                    <div
                        className="overflow-hidden rounded-2xl border shadow-sm"
                        style={{
                            background: "var(--surface)",
                            borderColor: "var(--border)",
                        }}
                    >
                        {/* HEADER */}
                        <div
                            className="flex items-center gap-2 border-b px-6 py-4"
                            style={{ borderColor: "var(--border)" }}
                        >
                            <Receipt size={18} style={{ color: "var(--foreground)" }} />
                            <h2
                                className="text-lg font-semibold"
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
                                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide">Product</th>
                                        <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wide">Qty</th>
                                        <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide">Price</th>
                                        <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide">Discounted</th>
                                        <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide">Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {order.items?.map((item, index) => {
                                        const isCombo = item.type === "combo";

                                        return (
                                            <tr
                                                key={index}
                                                className="border-t align-top transition hover:bg-[var(--input-bg)]/40"
                                                style={{ borderColor: "var(--border)" }}
                                            >
                                                {/* PRODUCT */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-start gap-3">
                                                        <img
                                                            src={getImageUrl(getItemImage(item))}
                                                            alt={item.product_name}
                                                            className="h-14 w-14 flex-shrink-0 rounded-xl border object-cover"
                                                            style={{ borderColor: "var(--border)" }}
                                                        />

                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                {isCombo && (
                                                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#2d1a10] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                                                                        <Layers size={10} />
                                                                        Combo
                                                                    </span>
                                                                )}

                                                                <p
                                                                    className="font-medium"
                                                                    style={{ color: "var(--foreground)" }}
                                                                >
                                                                    {isCombo
                                                                        ? item.product_name
                                                                        : item.variant_title || item.product_name}
                                                                </p>
                                                            </div>

                                                            {!isCombo && item.variant_title && (
                                                                <p
                                                                    className="mt-0.5 text-xs"
                                                                    style={{ color: "var(--text-secondary)" }}
                                                                >
                                                                    Product: {item.product_name}
                                                                </p>
                                                            )}

                                                            {isCombo && item.comboSku && (
                                                                <p
                                                                    className="mt-0.5 flex items-center gap-1 text-xs"
                                                                    style={{ color: "var(--text-secondary)" }}
                                                                >
                                                                    <Tag size={10} />
                                                                    {item.comboSku}
                                                                </p>
                                                            )}

                                                            {!isCombo && (
                                                                <p
                                                                    className="mt-0.5 text-xs"
                                                                    style={{ color: "var(--text-secondary)" }}
                                                                >
                                                                    {item.category || ""}
                                                                </p>
                                                            )}

                                                            {/* COMBO SUB-ITEMS BREAKDOWN */}
                                                            {isCombo && !!item.comboProducts?.length && (
                                                                <div
                                                                    className="mt-2.5 space-y-1.5 rounded-xl border p-2.5"
                                                                    style={{
                                                                        background: "var(--input-bg)",
                                                                        borderColor: "var(--border)",
                                                                    }}
                                                                >
                                                                    {item.comboProducts.map((cp, cpIndex) => (
                                                                        <div
                                                                            key={cpIndex}
                                                                            className="flex items-center justify-between gap-3 text-xs"
                                                                        >
                                                                            <span style={{ color: "var(--foreground)" }}>
                                                                                {cp.name}
                                                                                {cp.variant_title ? ` (${cp.variant_title})` : ""}
                                                                            </span>

                                                                            <span
                                                                                className="flex-shrink-0 font-medium"
                                                                                style={{ color: "var(--text-secondary)" }}
                                                                            >
                                                                                x{cp.quantity} · ₹{cp.price}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* QTY */}
                                                <td
                                                    className="px-5 py-4 text-center font-medium"
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
                                                    className="px-5 py-4 text-right font-medium"
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
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SUMMARY */}
                    <div className="mt-6 flex justify-end">
                        <div
                            className="w-full max-w-md rounded-2xl border p-6 shadow-sm"
                            style={{
                                background: "var(--surface)",
                                borderColor: "var(--border)",
                            }}
                        >
                            <h2
                                className="mb-5 text-lg font-semibold"
                                style={{ color: "var(--foreground)" }}
                            >
                                Order Summary
                            </h2>

                            <div className="space-y-3 text-sm">
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