"use client";

import { useEffect, useState } from "react";
import AccountSidebar from "@/src/components/AccountSidebar/AccountSidebar";
import AddressCard from "@/src/components/account/address/AddressCard";
import AddressModal from "@/src/components/account/address/AddressModal";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "@/src/lib/addressApi";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  /* ================= FETCH ================= */

  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const res = await getAddresses();

      setAddresses(res?.data?.data || []);
    } catch (error) {
      console.log(error);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  /* ================= SAVE ================= */

  const handleSave = async (form: any) => {
    try {
      setLoading(true);

      const payload = {
        type: form.type,
        name: form.name,
        mobile: form.mobile,
         email: form.email,   
        addressLine: form.addressLine,
        landmark: form.landmark,
        city: form.city,
        district: form.district,
        state: form.state,
        country: form.country,
        pincode: form.pincode,
        latitude: form.latitude,
        longitude: form.longitude,
      };

      if (form._id) {
        await updateAddress(form._id, payload);
      } else {
        await addAddress(payload);
      }

      setOpen(false);
      setEditData(null);

      await fetchAddresses();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAddress(id);

      setAddresses((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= OPEN ADD ================= */

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  /* ================= OPEN EDIT ================= */

  const handleEdit = (address: any) => {
    setEditData(address);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]  py-8 px-4">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        <AccountSidebar />

        <div className="flex-1">

          {/* HEADER */}

          <div className="bg-[#f2d9b1] rounded-3xl p-6 shadow">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <h1 className="text-3xl font-bold text-foreground">
                  My Addresses
                </h1>

                <p className="text-[#6d533c] mt-1">
                  Manage your saved delivery addresses.
                </p>

              </div>

              <button
                onClick={handleAdd}
                className="px-6 py-3 rounded-xl bg-footer text-white font-semibold hover:opacity-90 transition"
              >
                + Add Address
              </button>

            </div>

          </div>

          {/* BODY */}

          <div className="mt-6">

            {loading ? (

              <div className="text-center py-20 text-foreground">
                Loading Addresses...
              </div>

            ) : addresses.length === 0 ? (

              <div className="bg-[#f2d9b1] rounded-2xl p-12 text-center">

                <h2 className="text-2xl font-bold text-foreground">
                  No Address Found
                </h2>

                <p className="text-[#6d533c] mt-2">
                  Add your first delivery address.
                </p>

                <button
                  onClick={handleAdd}
                  className="mt-6 bg-footer text-white px-6 py-3 rounded-xl"
                >
                  Add Address
                </button>

              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {addresses.map((item) => (

                  <AddressCard
                    key={item._id}
                    data={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

      {/* MODAL */}

      {open && (

        <AddressModal
          editData={editData}
          onClose={() => {
            setOpen(false);
            setEditData(null);
          }}
          onSave={handleSave}
        />

      )}

    </div>
  );
}