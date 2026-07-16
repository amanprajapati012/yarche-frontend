"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import { compressImage } from "@/src/lib/compressImage";
import { ImageType } from "@/src/lib/image";
import BackButton from "@/src/components/admin/BackButton";

import BannerBasicInfo from "./BannerBasicInfo";
import BannerOfferSection from "./BannerOfferSection";
import BannerImageSection from "./BannerImageSection";
import BannerFooter from "./BannerFooter";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  editData?: any;
  refresh: () => void;
}

export default function BannerModal({
  open,
  setOpen,
  editData,
  refresh,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    topText: "",

    leftOffer: "",
    leftText: "",
    leftCode: "",

    rightOffer: "",
    rightText: "",
    rightCode: "",

    buttonText: "Shop Now",
    link: "/",

    displayOrder: 0,
    isActive: true,
  });

  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] =
    useState<ImageType | null>(null);

  // ===============================
  // Handle Form Change
  // ===============================

  const handleChange = (
    key: keyof typeof form,
    value: any
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ===============================
  // Image Upload
  // ===============================

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const compressed = (await compressImage(file)) as File;

    setImage(compressed);

    e.target.value = "";
  };

  // ===============================
  // Feature
  // ===============================

  const addFeature = () => {
    if (!featureInput.trim()) return;

    setFeatures((prev) => [
      ...prev,
      featureInput.trim(),
    ]);

    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    setFeatures((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // ===============================
  // Remove Images
  // ===============================

  const removeExistingImage = () => {
    setExistingImage(null);
  };

  const removeNewImage = () => {
    setImage(null);
  };

  // ===============================
  // Edit Data
  // ===============================

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        subtitle: editData.subtitle || "",
        description: editData.description || "",
        topText: editData.topText || "",

        leftOffer: editData.leftOffer || "",
        leftText: editData.leftText || "",
        leftCode: editData.leftCode || "",

        rightOffer: editData.rightOffer || "",
        rightText: editData.rightText || "",
        rightCode: editData.rightCode || "",

        buttonText:
          editData.buttonText || "Shop Now",

        link: editData.link || "/",

        displayOrder:
          editData.displayOrder || 0,

        isActive:
          editData.isActive === undefined
            ? true
            : editData.isActive,
      });

      setFeatures(editData.features || []);

      setExistingImage(editData.image || null);

      setImage(null);
    } else {
      setForm({
        title: "",
        subtitle: "",
        description: "",
        topText: "",

        leftOffer: "",
        leftText: "",
        leftCode: "",

        rightOffer: "",
        rightText: "",
        rightCode: "",

        buttonText: "Shop Now",
        link: "/",

        displayOrder: 0,
        isActive: true,
      });

      setFeatures([]);
      setFeatureInput("");

      setImage(null);
      setExistingImage(null);
    }
  }, [editData]);

  // ===============================
  // Submit
  // ===============================

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        fd.append(key, String(value));
      });

      fd.append(
        "features",
        JSON.stringify(features)
      );

      if (existingImage) {
        fd.append(
          "existingImage",
          JSON.stringify(existingImage)
        );
      }

      if (image) {
        fd.append("image", image);
      }

      if (editData?._id) {
        await API.put(
          `/admin/updatebanner/${editData._id}`,
          fd,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      } else {
        await API.post("/admin/banner", fd, {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        });
      }

      refresh();

      setOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-5">

      <div
        className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        style={{
          background: "var(--background)",
        }}
      >
        {/* Header */}

        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-3">
            <BackButton />

            <div>
              <h2
                className="text-2xl font-bold"
                style={{
                  color: "var(--foreground)",
                }}
              >
                {editData
                  ? "Update Banner"
                  : "Create Banner"}
              </h2>

              <p
                style={{
                  color:
                    "var(--text-secondary)",
                }}
              >
                Banner Management
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          <BannerBasicInfo
            form={form}
            handleChange={handleChange}
          />

          <BannerOfferSection
            form={form}
            handleChange={handleChange}
          />

          <BannerImageSection
            image={image}
            existingImage={existingImage}
            handleImageChange={
              handleImageChange
            }
            removeExistingImage={
              removeExistingImage
            }
            removeNewImage={
              removeNewImage
            }
            features={features}
            featureInput={featureInput}
            setFeatureInput={
              setFeatureInput
            }
            addFeature={addFeature}
            removeFeature={removeFeature}
            displayOrder={
              form.displayOrder
            }
            isActive={form.isActive}
            handleChange={handleChange}
          />
        </div>

        <BannerFooter
          loading={loading}
          editData={editData}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}