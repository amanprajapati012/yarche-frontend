"use client";

import {
  ImagePlus,
  Hash,
  List,
} from "lucide-react";
import {
  getImageUrl,
  ImageType,
} from "@/src/lib/image";

interface Props {
  image: File | null;
  existingImage: ImageType | null;

  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  removeExistingImage: () => void;
  removeNewImage: () => void;

  features: string[];
  featureInput: string;
  setFeatureInput: (v: string) => void;
  addFeature: () => void;
  removeFeature: (index: number) => void;

  displayOrder: number;
  isActive: boolean;

  handleChange: (
    key: any,
    value: any
  ) => void;
}

export default function BannerImageSection({
  image,
  existingImage,
  handleImageChange,
  removeExistingImage,
  removeNewImage,

  features,
  featureInput,
  setFeatureInput,
  addFeature,
  removeFeature,

  displayOrder,
  isActive,

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
        Banner Image & Settings
      </h3>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* ================= Image Upload ================= */}

        <div>
          <label
            className="flex items-center gap-2 mb-3 font-medium"
            style={{
              color: "var(--foreground)",
            }}
          >
            <ImagePlus size={18} />
            Banner Image
          </label>

          <label
            className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer h-72"
            style={{
              borderColor: "var(--border)",
              background: "var(--background)",
            }}
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                className="h-full w-full object-cover rounded-2xl"
              />
            ) : existingImage ? (
              <img
                src={getImageUrl(existingImage)}
                className="h-full w-full object-cover rounded-2xl"
              />
            ) : (
              <>
                <ImagePlus
                  size={42}
                  style={{
                    color: "var(--text-secondary)",
                  }}
                />

                <p
                  className="mt-3"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Click to Upload Banner
                </p>
              </>
            )}

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          {(image || existingImage) && (
            <button
              type="button"
              onClick={() => {
                if (image) {
                  removeNewImage();
                } else {
                  removeExistingImage();
                }
              }}
              className="mt-3 px-4 py-2 rounded-xl text-white"
              style={{
                background: "#dc2626",
              }}
            >
              Remove Image
            </button>
          )}
        </div>

        {/* ================= Right Side ================= */}

        <div className="space-y-6">

          {/* Features */}

          <div>
            <label
              className="flex items-center gap-2 mb-2 font-medium"
              style={{
                color: "var(--foreground)",
              }}
            >
              <List size={18} />
              Features
            </label>

            <div className="flex gap-2">

              <input
                value={featureInput}
                onChange={(e) =>
                  setFeatureInput(e.target.value)
                }
                placeholder="Enter Feature"
                className="flex-1 rounded-xl px-4 py-3 outline-none border"
                style={{
                  background: "var(--input-bg)",
                  borderColor: "var(--border)",
                }}
              />

              <button
                type="button"
                onClick={addFeature}
                className="px-5 rounded-xl text-white"
                style={{
                  background: "var(--footer)",
                }}
              >
                Add
              </button>

            </div>

            {features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">

                {features.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-full"
                    style={{
                      background: "var(--input-bg)",
                    }}
                  >
                    <span>{item}</span>

                    <button
                      type="button"
                      onClick={() =>
                        removeFeature(index)
                      }
                    >
                      ✕
                    </button>
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* Display Order */}

          <div>
            <label
              className="flex items-center gap-2 mb-2 font-medium"
              style={{
                color: "var(--foreground)",
              }}
            >
              <Hash size={18} />
              Display Order
            </label>

            <input
              type="number"
              value={displayOrder}
              onChange={(e) =>
                handleChange(
                  "displayOrder",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl px-4 py-3 outline-none border"
              style={{
                background: "var(--input-bg)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          {/* Active */}

          <div
            className="flex items-center justify-between rounded-2xl p-4"
            style={{
              background: "var(--background)",
            }}
          >
            <span
              className="font-semibold"
              style={{
                color: "var(--foreground)",
              }}
            >
              Active Banner
            </span>

            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) =>
                handleChange(
                  "isActive",
                  e.target.checked
                )
              }
              className="h-5 w-5"
            />
          </div>

        </div>

      </div>
    </div>
  );
}