"use client";

import {
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];

  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;

  loading?: boolean;
  pageSize?: number;
}

export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  loading = false,
  pageSize = 10,
}: DataTableProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // 🔍 FILTER DATA (client-side search)
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(
    filteredData.length / pageSize
  );

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(
      start,
      start + pageSize
    );
  }, [filteredData, page, pageSize]);

  const goNext = () => {
    if (page < totalPages)
      setPage((p) => p + 1);
  };

  const goPrev = () => {
    if (page > 1)
      setPage((p) => p - 1);
  };

  return (
    <div className="rounded-2xl border border-[#ead9b7] bg-white shadow-sm">

      {/* SEARCH BAR */}
      <div className="flex items-center justify-between border-b border-[#f2e4c5] px-5 py-4">
        <h2 className="text-sm font-semibold text-foreground">
          Table
        </h2>

        <div className="relative w-72">
          <Search
            className="absolute left-3 top-2.5 text-gray-400"
            size={16}
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search..."
            className="w-full rounded-lg border pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#28170D]"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-surface">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-4 text-left text-sm font-semibold text-foreground"
                >
                  {column.label}
                </th>
              ))}

              <th className="px-5 py-4 text-right text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-14 text-center text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-14 text-center text-gray-500"
                >
                  No Data Found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-[#f2e4c5] hover:bg-[#fffaf0]"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-5 py-4 text-sm text-gray-700"
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.key]}
                    </td>
                  ))}

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          className="rounded-lg p-2 hover:bg-blue-100"
                        >
                          <Eye size={18} />
                        </button>
                      )}

                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="rounded-lg p-2 hover:bg-yellow-100"
                        >
                          <Edit size={18} />
                        </button>
                      )}

                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="rounded-lg p-2 hover:bg-red-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {!loading && filteredData.length > 0 && (
        <div className="flex items-center justify-between border-t border-[#f2e4c5] px-5 py-4">
          <p className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              onClick={goPrev}
              disabled={page === 1}
              className="rounded border px-3 py-1 text-sm disabled:opacity-40"
            >
              Prev
            </button>

            <button
              onClick={goNext}
              disabled={page === totalPages}
              className="rounded border px-3 py-1 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}