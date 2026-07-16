"use client";

import {
  Type,
  AlignLeft,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

interface Props {
  form: {
    title: string;
    subtitle: string;
    description: string;
    topText: string;
    buttonText: string;
    link: string;
  };
  handleChange: (
    key: any,
    value: any
  ) => void;
}

export default function BannerBasicInfo({
  form,
  handleChange,
}: Props) {
  return (
    <div
      className="rounded-3xl p-6"
      style={{
        background: "var(--surface)",
      }}
    >
      <h3
        className="text-xl font-bold mb-6"
        style={{
          color: "var(--foreground)",
        }}
      >
        Banner Information
      </h3>

      <div className="grid lg:grid-cols-2 gap-5">

        {/* Title */}
        <div>
          <label
            className="flex items-center gap-2 mb-2 font-medium"
            style={{
              color: "var(--foreground)",
            }}
          >
            <Type size={18} />
            Title
          </label>

          <input
            value={form.title}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
            placeholder="Banner Title"
            className="w-full rounded-xl px-4 py-3 outline-none border"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>

        {/* Subtitle */}
        <div>
          <label
            className="flex items-center gap-2 mb-2 font-medium"
            style={{
              color: "var(--foreground)",
            }}
          >
            <Type size={18} />
            Subtitle
          </label>

          <input
            value={form.subtitle}
            onChange={(e) =>
              handleChange("subtitle", e.target.value)
            }
            placeholder="Subtitle"
            className="w-full rounded-xl px-4 py-3 outline-none border"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>

        {/* Top Text */}
        <div className="lg:col-span-2">
          <label
            className="flex items-center gap-2 mb-2 font-medium"
            style={{
              color: "var(--foreground)",
            }}
          >
            <FileText size={18} />
            Top Text
          </label>

          <input
            value={form.topText}
            onChange={(e) =>
              handleChange("topText", e.target.value)
            }
            placeholder="Top Right Text"
            className="w-full rounded-xl px-4 py-3 outline-none border"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>

        {/* Description */}
        <div className="lg:col-span-2">
          <label
            className="flex items-center gap-2 mb-2 font-medium"
            style={{
              color: "var(--foreground)",
            }}
          >
            <AlignLeft size={18} />
            Description
          </label>

          <textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              handleChange(
                "description",
                e.target.value
              )
            }
            placeholder="Banner Description"
            className="w-full rounded-xl px-4 py-3 outline-none resize-none border"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>

        {/* Button Text */}
        <div>
          <label
            className="flex items-center gap-2 mb-2 font-medium"
            style={{
              color: "var(--foreground)",
            }}
          >
            <Type size={18} />
            Button Text
          </label>

          <input
            value={form.buttonText}
            onChange={(e) =>
              handleChange(
                "buttonText",
                e.target.value
              )
            }
            placeholder="Shop Now"
            className="w-full rounded-xl px-4 py-3 outline-none border"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>

        {/* Link */}
        <div>
          <label
            className="flex items-center gap-2 mb-2 font-medium"
            style={{
              color: "var(--foreground)",
            }}
          >
            <LinkIcon size={18} />
            Redirect Link
          </label>

          <input
            value={form.link}
            onChange={(e) =>
              handleChange("link", e.target.value)
            }
            placeholder="/shop"
            className="w-full rounded-xl px-4 py-3 outline-none border"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>

      </div>
    </div>
  );
}