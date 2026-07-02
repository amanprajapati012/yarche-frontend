import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logo3.png"
          alt="Logo"
          width={90}
          height={90}
          className="animate-pulse"
          priority
        />

        <div className="h-1 w-40 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-1/2 animate-[loading_1s_linear_infinite] bg-black" />
        </div>
      </div>
    </div>
  );
}