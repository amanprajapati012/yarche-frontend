import ProductForm from "@/src/components/admin/product/ProductForm";
import BackButton from "@/src/components/admin/BackButton";

export default function CreateProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />

        <div>
          <h1 className="text-3xl font-bold">
            Create Product
          </h1>

          <p className="text-gray-500">
            Add a new product to your store
          </p>
        </div>
      </div>

      <ProductForm />
    </div>
  );
}