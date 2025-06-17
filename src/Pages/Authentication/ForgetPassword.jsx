import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#f9fbfc] to-[#eef2f5] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Reset your <span className="text-sky-600">password</span>
          </h1>
          <p className="text-gray-600">
            Enter your email to receive a password reset link
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <div className="hidden mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
            Password reset link has been sent to your email
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                placeholder="your@email.com"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Send Reset Link
            </motion.button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-sky-600 hover:text-sky-500"
            >
              Back to Sign In
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-sky-600 hover:text-sky-500"
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
