export const metadata = {
  title: "Terms & Conditions | Yarche",
  description:
    "Read the Terms & Conditions governing the use of the Yarche website and services.",
};

export default function TermsAndConditions() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

      <p className="mb-6 text-gray-700 leading-8">
        The terms <strong>"We"</strong>, <strong>"Us"</strong>,{" "}
        <strong>"Our"</strong>, and <strong>"Company"</strong> individually and
        collectively refer to <strong>Yarche</strong>. The terms{" "}
        <strong>"Visitor"</strong> and <strong>"User"</strong> refer to any
        individual accessing or using this website.
      </p>

      <p className="mb-10 text-gray-700 leading-8">
        This page states the Terms and Conditions under which you (Visitor) may
        visit this website ("Website"). Please read these Terms carefully. If
        you do not agree with these Terms and Conditions, please discontinue
        using this Website. Yarche reserves the right to revise these Terms and
        Conditions at any time by updating this page. Users are encouraged to
        review this page periodically, as continued use of the Website
        constitutes acceptance of any changes.
      </p>

      {/* Use of Content */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Use of Content</h2>

        <p className="text-gray-700 leading-8 mb-4">
          All logos, trademarks, brand names, headings, labels, signatures,
          graphics, text, images, designs, icons, and other content appearing on
          this Website are the property of Yarche or are used under appropriate
          license.
        </p>

        <p className="text-gray-700 leading-8">
          You may not copy, reproduce, modify, publish, distribute, display,
          sell, transmit, or otherwise exploit any material from this Website
          for commercial or public purposes without prior written permission
          from Yarche.
        </p>
      </section>

      {/* Acceptable Use */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">
          Acceptable Website Use
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">
            (A) Security Rules
          </h3>

          <p className="text-gray-700 leading-8 mb-4">
            Visitors are prohibited from violating or attempting to violate the
            security of the Website, including but not limited to:
          </p>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-8">
            <li>
              Accessing data or accounts that they are not authorized to use.
            </li>
            <li>
              Attempting to test, scan, or exploit vulnerabilities in any
              system, server, or network without authorization.
            </li>
            <li>
              Interfering with Website services by introducing viruses, Trojan
              horses, malware, or by overloading, flooding, mail bombing, or
              crashing the Website.
            </li>
            <li>
              Sending unsolicited promotional emails or advertisements through
              the Website.
            </li>
          </ul>

          <p className="mt-6 text-gray-700 leading-8">
            Any such violations may result in civil or criminal liability.
            Yarche reserves the right to investigate suspected violations and
            cooperate with law enforcement authorities where necessary.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">
            (B) General Rules
          </h3>

          <p className="text-gray-700 leading-8 mb-4">
            Visitors must not use this Website to:
          </p>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-8">
            <li>
              Upload, distribute, or transmit any material that violates any
              applicable law.
            </li>
            <li>
              Infringe copyrights, trademarks, trade secrets, or other
              intellectual property rights.
            </li>
            <li>
              Violate the privacy or personal rights of any individual.
            </li>
            <li>
              Share defamatory, abusive, obscene, hateful, threatening,
              offensive, or unlawful content.
            </li>
          </ul>
        </div>
      </section>

      {/* Indemnity */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Indemnity</h2>

        <p className="text-gray-700 leading-8">
          By using this Website, you agree to indemnify, defend, and hold
          harmless Yarche, its directors, employees, officers, affiliates, and
          agents from any claims, liabilities, damages, costs, or expenses
          arising out of your use of the Website or your violation of these
          Terms and Conditions.
        </p>
      </section>

      {/* Liability */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Liability</h2>

        <p className="text-gray-700 leading-8 mb-4">
          You acknowledge that Yarche shall not be liable for any direct,
          indirect, incidental, consequential, special, exemplary, or punitive
          damages arising from:
        </p>

        <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-8">
          <li>Your use or inability to use the Website.</li>
          <li>Any products or services purchased through the Website.</li>
          <li>Unauthorized access to your account or personal information.</li>
          <li>Errors, interruptions, or delays in Website operation.</li>
          <li>Loss of profits, business opportunities, or data.</li>
        </ul>

        <p className="mt-6 text-gray-700 leading-8">
          Yarche shall not be responsible for any actions, statements, or
          conduct of third parties using the Website. Where permitted by law,
          the total liability of Yarche shall not exceed the amount paid by the
          user, if any, for the relevant service giving rise to the claim.
        </p>
      </section>

      {/* Disclaimer */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Disclaimer of Consequential Damages
        </h2>

        <p className="text-gray-700 leading-8">
          Under no circumstances shall Yarche, its affiliates, partners,
          employees, licensors, or associated organizations be liable for any
          incidental, indirect, consequential, punitive, or special damages,
          including loss of profits, business interruption, computer failure,
          hardware damage, or loss of data resulting from the use or inability
          to use this Website or any material available on it, regardless of the
          legal theory under which such damages are claimed and even if Yarche
          has been advised of the possibility of such damages.
        </p>
      </section>
    </div>
  );
}