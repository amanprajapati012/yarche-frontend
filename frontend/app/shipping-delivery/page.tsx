import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery | Yarche",
  description:
    "Learn about Yarche's shipping, delivery timelines, order processing, and shipment tracking policy.",
};

export default function ShippingDeliveryPage() {
  return (
    <div className="min-h-screen bg-[#faf7f2] py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3b2a1d]">
            Shipping & Delivery
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-7">
            Thank you for shopping with Yarche. We are committed to delivering
            your handcrafted products safely and on time across India.
          </p>
        </div>

        <div className="space-y-8">
          {/* Shipping Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-[#3b2a1d] mb-4">
              Shipping Coverage
            </h2>

            <p className="text-gray-600 leading-7">
              We currently ship our products across India. We are continuously
              working to expand our delivery network to serve more customers.
            </p>
          </div>

          {/* Processing */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-[#3b2a1d] mb-4">
              Order Processing Time
            </h2>

            <p className="text-gray-600 leading-7">
              All orders are processed within <strong>2–4 business days</strong>.
              Orders are not processed or shipped on weekends or public
              holidays.
            </p>

            <p className="mt-4 text-gray-600 leading-7">
              During festivals, sales, or periods of high order volume,
              processing and delivery may take a little longer. If your order is
              significantly delayed, our team will inform you via email or
              phone.
            </p>
          </div>

          {/* Shipping Charges */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-[#3b2a1d] mb-4">
              Shipping Charges
            </h2>

            <p className="text-gray-600 leading-7">
              <strong>Free Shipping</strong> is available across India. There
              are <strong>no hidden shipping charges</strong>.
            </p>
          </div>

          {/* Delivery */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-[#3b2a1d] mb-4">
              Estimated Delivery Time
            </h2>

            <p className="text-gray-600 leading-7">
              Orders are generally delivered within{" "}
              <strong>4–6 working days</strong> after dispatch, depending on
              your delivery location.
            </p>

            <p className="mt-4 text-gray-600 leading-7">
              Delivery timelines may occasionally vary due to weather
              conditions, courier delays, or other unforeseen circumstances.
            </p>
          </div>

          {/* Tracking */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-[#3b2a1d] mb-4">
              Shipment Confirmation & Order Tracking
            </h2>

            <p className="text-gray-600 leading-7">
              Once your order has been shipped, you will receive a{" "}
              <strong>Shipment Confirmation Email and SMS</strong> containing
              your tracking details.
            </p>

            <p className="mt-4 text-gray-600 leading-7">
              Your tracking number will become active within{" "}
              <strong>24 hours</strong> after dispatch, allowing you to monitor
              your shipment in real time.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-[#8B5E3C] rounded-2xl text-white text-center p-8">
            <h2 className="text-2xl font-semibold mb-3">
              Need Help With Your Order?
            </h2>

            <p className="text-gray-200 mb-6">
              If you have any questions regarding shipping or delivery, our
              customer support team is always happy to assist you.
            </p>

            <a
              href="/contact"
              className="inline-block bg-white text-[#8B5E3C] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}