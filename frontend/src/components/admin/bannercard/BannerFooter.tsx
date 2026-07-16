"use client";

interface Props {
  loading: boolean;
  editData?: any;

  onClose: () => void;
  onSubmit: () => void;
}

export default function BannerFooter({
  loading,
  editData,
  onClose,
  onSubmit,
}: Props) {
  return (
    <div
      className="border-t px-6 py-5 flex items-center justify-end gap-4"
      style={{
        borderColor: "var(--border)",
        background: "var(--background)",
      }}
    >
      {/* Cancel Button */}

      <button
        type="button"
        onClick={onClose}
        disabled={loading}
        className="px-6 py-3 rounded-xl border font-semibold transition-all duration-200 hover:opacity-80 disabled:opacity-60"
        style={{
          borderColor: "var(--border)",
          color: "var(--foreground)",
          background: "transparent",
        }}
      >
        Cancel
      </button>

      {/* Save Button */}

      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="px-8 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:scale-[1.02] disabled:opacity-60"
        style={{
          background: "var(--footer)",
        }}
      >
        {loading
          ? editData
            ? "Updating..."
            : "Creating..."
          : editData
          ? "Update Banner"
          : "Create Banner"}
      </button>
    </div>
  );
}