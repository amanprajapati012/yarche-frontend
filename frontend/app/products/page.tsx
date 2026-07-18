"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpDown,
} from "lucide-react";

import API from "@/src/lib/api";
import ProductGrid from "@/src/components/product/ProductGrid";
import Loader from "@/src/components/common/Loader";

const PAGE_SIZE = 10;

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-az", label: "Name: A to Z" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const getProducts = async () => {
    try {
      const res = await API.get("/products");

      if (res.data.response === "success") {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ================= CATEGORY LIST =================
  const categories = useMemo(() => {
    const set = new Set<string>();

    products.forEach((p: any) => {
      if (p.category) set.add(p.category);
    });

    return Array.from(set);
  }, [products]);

  // ================= FILTER + SORT =================
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p: any) =>
        p.name?.toLowerCase().includes(q)
      );
    }

    if (category !== "all") {
      result = result.filter((p: any) => p.category === category);
    }

    if (minPrice) {
      result = result.filter(
        (p: any) => (p.discountedPrice ?? p.price) >= Number(minPrice)
      );
    }

    if (maxPrice) {
      result = result.filter(
        (p: any) => (p.discountedPrice ?? p.price) <= Number(maxPrice)
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort(
          (a: any, b: any) =>
            (a.discountedPrice ?? a.price) - (b.discountedPrice ?? b.price)
        );
        break;
      case "price-high":
        result.sort(
          (a: any, b: any) =>
            (b.discountedPrice ?? b.price) - (a.discountedPrice ?? a.price)
        );
        break;
      case "name-az":
        result.sort((a: any, b: any) =>
          (a.name || "").localeCompare(b.name || "")
        );
        break;
      default:
        result.sort(
          (a: any, b: any) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
    }

    return result;
  }, [products, search, category, minPrice, maxPrice, sortBy]);

  // ================= PAGINATION =================
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [search, category, minPrice, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  };

  const activeFilterCount =
    (category !== "all" ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (search ? 1 : 0);

  if (loading) return <Loader />;

  return (
    <div
      className="min-h-screen py-8 sm:py-10"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1
              className="text-3xl sm:text-4xl font-black"
              style={{ color: "var(--foreground)" }}
            >
              All Products
            </h1>
            <p
              className="mt-2 text-sm sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              Explore premium collection curated for you
            </p>
          </div>

          <p
            className="text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* SEARCH + SORT + MOBILE FILTER TOGGLE */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          {/* SEARCH */}
          <div
            className="flex-1 flex items-center gap-2 rounded-2xl px-4 py-3 border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <Search size={18} style={{ color: "var(--text-secondary)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--foreground)" }}
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={16} style={{ color: "var(--text-secondary)" }} />
              </button>
            )}
          </div>

          {/* SORT — desktop */}
          <div
            className="hidden sm:flex items-center gap-2 rounded-2xl px-4 py-3 border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <ArrowUpDown size={16} style={{ color: "var(--text-secondary)" }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none text-sm font-medium cursor-pointer"
              style={{ color: "var(--foreground)" }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* MOBILE FILTER BUTTON */}
          <button
            onClick={() => setFiltersOpen(true)}
            className="sm:hidden flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold text-white relative"
            style={{ background: "var(--footer)" }}
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#FF6E23] text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

          {/* ================= SIDEBAR FILTERS — desktop ================= */}
          <aside className="hidden lg:block">
            <div
              className="sticky top-24 rounded-3xl border p-6 space-y-7"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center justify-between">
                <h2
                  className="text-lg font-bold flex items-center gap-2"
                  style={{ color: "var(--foreground)" }}
                >
                  <SlidersHorizontal size={18} />
                  Filters
                </h2>

                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-semibold text-[#FF6E23] hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* CATEGORY */}
              <div>
                <p
                  className="text-xs uppercase tracking-wide font-bold mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Category
                </p>

                <div className="space-y-1.5">
                  <FilterRadio
                    label="All Categories"
                    checked={category === "all"}
                    onClick={() => setCategory("all")}
                  />

                  {categories.map((cat) => (
                    <FilterRadio
                      key={cat}
                      label={cat}
                      checked={category === cat}
                      onClick={() => setCategory(cat)}
                    />
                  ))}
                </div>
              </div>

              {/* PRICE RANGE */}
              <div>
                <p
                  className="text-xs uppercase tracking-wide font-bold mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Price Range
                </p>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="w-full rounded-xl px-3 py-2 text-sm border outline-none"
                    style={{
                      background: "var(--input-bg)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                  <span style={{ color: "var(--text-secondary)" }}>–</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="w-full rounded-xl px-3 py-2 text-sm border outline-none"
                    style={{
                      background: "var(--input-bg)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* ================= PRODUCT GRID + PAGINATION ================= */}
          <div>
            {paginatedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-5xl mb-3">🔍</div>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  No products found
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Try adjusting your filters
                </p>

                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="mt-5 px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
                    style={{ background: "var(--footer)" }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <ProductGrid products={paginatedProducts} />

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="w-10 h-10 rounded-xl border flex items-center justify-center disabled:opacity-40 transition"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--surface)",
                        color: "var(--foreground)",
                      }}
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {getPageNumbers(page, totalPages).map((p, idx) =>
                      p === "..." ? (
                        <span
                          key={`dots-${idx}`}
                          className="w-10 h-10 flex items-center justify-center text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p as number)}
                          className="w-10 h-10 rounded-xl text-sm font-semibold transition"
                          style={
                            page === p
                              ? { background: "var(--footer)", color: "#fff" }
                              : {
                                  background: "var(--surface)",
                                  color: "var(--foreground)",
                                  border: "1px solid var(--border)",
                                }
                          }
                        >
                          {p}
                        </button>
                      )
                    )}

                    <button
                      disabled={page === totalPages}
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className="w-10 h-10 rounded-xl border flex items-center justify-center disabled:opacity-40 transition"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--surface)",
                        color: "var(--foreground)",
                      }}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setFiltersOpen(false)}
          />

          <div
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto p-6"
            style={{ background: "var(--background)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-lg font-bold flex items-center gap-2"
                style={{ color: "var(--foreground)" }}
              >
                <SlidersHorizontal size={18} />
                Filters
              </h2>

              <button onClick={() => setFiltersOpen(false)}>
                <X size={22} style={{ color: "var(--foreground)" }} />
              </button>
            </div>

            {/* SORT — mobile */}
            <div className="mb-7">
              <p
                className="text-xs uppercase tracking-wide font-bold mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Sort By
              </p>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl px-3 py-3 text-sm border outline-none"
                style={{
                  background: "var(--input-bg)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* CATEGORY — mobile */}
            <div className="mb-7">
              <p
                className="text-xs uppercase tracking-wide font-bold mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Category
              </p>

              <div className="space-y-1.5">
                <FilterRadio
                  label="All Categories"
                  checked={category === "all"}
                  onClick={() => setCategory("all")}
                />

                {categories.map((cat) => (
                  <FilterRadio
                    key={cat}
                    label={cat}
                    checked={category === cat}
                    onClick={() => setCategory(cat)}
                  />
                ))}
              </div>
            </div>

            {/* PRICE — mobile */}
            <div className="mb-8">
              <p
                className="text-xs uppercase tracking-wide font-bold mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Price Range
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  className="w-full rounded-xl px-3 py-3 text-sm border outline-none"
                  style={{
                    background: "var(--input-bg)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
                <span style={{ color: "var(--text-secondary)" }}>–</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  className="w-full rounded-xl px-3 py-3 text-sm border outline-none"
                  style={{
                    background: "var(--input-bg)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  resetFilters();
                  setFiltersOpen(false);
                }}
                className="flex-1 py-3 rounded-xl font-semibold text-sm border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                Clear All
              </button>

              <button
                onClick={() => setFiltersOpen(false)}
                className="flex-1 py-3 rounded-xl font-semibold text-sm text-white"
                style={{ background: "var(--footer)" }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ================= HELPERS =================

function FilterRadio({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-2 py-2 rounded-xl text-sm text-left transition"
      style={
        checked
          ? { background: "var(--input-bg)", color: "var(--foreground)" }
          : { color: "var(--text-secondary)" }
      }
    >
      <span
        className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
        style={{
          borderColor: checked ? "var(--footer)" : "var(--border)",
        }}
      >
        {checked && (
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--footer)" }}
          />
        )}
      </span>
      <span className={checked ? "font-semibold" : ""}>{label}</span>
    </button>
  );
}

function getPageNumbers(current: number, total: number): (number | string)[] {
  const delta = 1;
  const range: (number | string)[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  range.forEach((i) => {
    if (l !== undefined) {
      if ((i as number) - l === 2) {
        rangeWithDots.push(l + 1);
      } else if ((i as number) - l > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i as number;
  });

  return rangeWithDots;
}