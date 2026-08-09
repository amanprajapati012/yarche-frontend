import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Yarche",
  description:
    "Read Yarche's Return, Refund, Cancellation and Replacement Policy.",
};

export default function ReturnRefundPage() {
  return (
    <div
      className="min-h-screen py-16"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Return & Refund Policy
          </h1>

          <p
            className="mt-4 max-w-3xl mx-auto leading-7"
            style={{ color: "var(--text-secondary)" }}
          >
            At Yarche, customer satisfaction is our top priority. We carefully
            inspect every handmade product before dispatch. If you experience
            any issue with your order, we're here to help.
          </p>
        </div>

        <div className="space-y-8">
          {/* Refund */}
          <div
            className="rounded-2xl p-8 border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Refund Policy
            </h2>

            <p
              className="leading-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Our focus is on complete customer satisfaction. If you are not
              satisfied with your order, we will review your request and provide
              a replacement or refund where applicable after verifying the
              issue. Please read the product details carefully before placing
              your order.
            </p>
          </div>

          {/* Cancellation */}
          <div
            className="rounded-2xl p-8 border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Cancellation & Refund
            </h2>

            <ul
              className="list-disc pl-6 space-y-3 leading-8"
              style={{ color: "var(--text-secondary)" }}
            >
              <li>
                Orders can be cancelled only before they are dispatched from our
                warehouse.
              </li>

              <li>
                Once the order has been shipped, cancellation requests cannot be
                accepted.
              </li>

              <li>
                Refunds for prepaid orders will be credited to the original
                payment method used during checkout.
              </li>

              <li>
                For cancellation or refund requests, please contact us through
                our Contact Us page or customer support.
              </li>
            </ul>
          </div>

          {/* Replacement */}
          <div
            className="rounded-2xl p-8 border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Replacement Policy
            </h2>

            <ul
              className="list-disc pl-6 space-y-3 leading-8"
              style={{ color: "var(--text-secondary)" }}
            >
              <li>
                Replacement is available only if the product is received damaged,
                broken, or has a manufacturing defect.
              </li>

              <li>
                We will arrange a pickup whenever applicable. After receiving and
                inspecting the product, a replacement item will be shipped.
              </li>

              <li>
                The product must be returned in its original condition with all
                original packaging intact.
              </li>

              <li>
                Replacement requests made after <strong>7 business days</strong>{" "}
                from the date of delivery will not be accepted.
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "var(--footer)" }}
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              Need Help?
            </h2>

            <p className="text-gray-300 mb-6">
              If you have any questions regarding cancellations, refunds, or
              replacements, our support team will be happy to assist you.
            </p>

            <a
              href="/contact"
              className="inline-block rounded-lg px-6 py-3 font-semibold transition"
              style={{
                background: "var(--surface)",
                color: "var(--foreground)",
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}