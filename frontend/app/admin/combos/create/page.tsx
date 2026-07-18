import ComboForm from "@/src/components/admin/combo/ComboForm";
import BackButton from "@/src/components/admin/BackButton";

export default function CreateComboPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />

        <div>
          <h1 className="text-3xl font-bold">Create Combo</h1>
          <p className="text-gray-500">
            Add a new product combo to your store
          </p>
        </div>
      </div>

      <ComboForm />
    </div>
  );
}