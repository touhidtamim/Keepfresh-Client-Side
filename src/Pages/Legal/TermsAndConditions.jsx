import { motion } from "framer-motion";
import { Link } from "react-router";

const TermsAndConditions = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
          Terms and Conditions
        </h1>
        <p className="text-lg text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="prose prose-sky max-w-none">
        <Section title="1. Introduction">
          <p>
            Welcome to Keep Fresh ("we," "our," or "us"). These Terms and
            Conditions govern your use of our food waste tracking application
            and services.
          </p>
        </Section>

        <Section title="2. Account Registration">
          <p>
            To use our services, you must register for an account. You agree to
            provide accurate and complete information and keep your password
            secure.
          </p>
        </Section>

        <Section title="3. User Responsibilities">
          <ul>
            <li>Use the service only for lawful purposes</li>
            <li>Don't share your account credentials</li>
            <li>Provide accurate food information</li>
            <li>Comply with all applicable laws</li>
          </ul>
        </Section>

        <Section title="4. Data Collection">
          <p>
            We collect food item data, expiry dates, and usage patterns to
            provide our services. See our{" "}
            <a href="/privacy" className="text-sky-600 hover:underline">
              Privacy Policy
            </a>{" "}
            for details.
          </p>
        </Section>

        <Section title="5. Limitation of Liability">
          <p>
            We are not responsible for any food safety decisions made based on
            our app. Always use your own judgment when consuming food products.
          </p>
        </Section>

        <Section title="6. Changes to Terms">
          <p>
            We may modify these terms at any time. Continued use after changes
            constitutes acceptance of the new terms.
          </p>
        </Section>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-gray-600">
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:legal@keepfresh.app"
              className="text-sky-600 hover:underline"
            >
              legal@keepfresh.app
            </a>
            .
          </p>
        </div>

        {/* Back to Home Button */}
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

export default TermsAndConditions;
