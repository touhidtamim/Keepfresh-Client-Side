import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="prose prose-sky max-w-none">
        <Section title="1. Information We Collect">
          <p>We collect information to provide better services to our users:</p>
          <ul>
            <li>Account information (name, email)</li>
            <li>Food items and expiry dates you enter</li>
            <li>Usage data and preferences</li>
            <li>Device information for technical support</li>
          </ul>
        </Section>

        <Section title="2. How We Use Information">
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Send expiration reminders</li>
            <li>Develop new features</li>
            <li>Ensure service security</li>
          </ul>
        </Section>

        <Section title="3. Data Sharing">
          <p>
            We do not sell your personal data. We may share information with:
          </p>
          <ul>
            <li>Service providers who assist our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Affiliates in case of business transfer</li>
          </ul>
        </Section>

        <Section title="4. Data Security">
          <p>
            We implement industry-standard security measures to protect your
            data, including encryption and access controls.
          </p>
        </Section>

        <Section title="5. Your Rights">
          <p>
            You may request to access, correct, or delete your personal data by
            contacting us at{" "}
            <a
              href="mailto:privacy@keepfresh.app"
              className="text-sky-600 hover:underline"
            >
              privacy@keepfresh.app
            </a>
            .
          </p>
        </Section>

        <Section title="6. Changes to This Policy">
          <p>
            We may update this policy periodically. We'll notify you of
            significant changes through the app or email.
          </p>
        </Section>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-gray-600">
            For any privacy-related questions, please contact our Data
            Protection Officer at{" "}
            <a
              href="mailto:dpo@keepfresh.app"
              className="text-sky-600 hover:underline"
            >
              dpo@keepfresh.app
            </a>
            .
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-sky-700 transition duration-300"
          >
            {/* Left Arrow Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
    {children}
  </div>
);

export default PrivacyPolicy;
