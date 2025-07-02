import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const LogIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => setFormData({ email: "", password: "" });

  const showErrorAlert = (message) => {
    MySwal.fire({
      icon: "error",
      title: "Login Failed",
      text: message,
      confirmButtonText: "OK",
    });
  };

  const showSuccessAlert = (message) => {
    return MySwal.fire({
      icon: "success",
      title: message,
      timer: 1500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (!formData.email.trim() || !formData.password.trim()) {
        showErrorAlert("Please enter both email and password.");
        return;
      }

      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      await showSuccessAlert("Login Successful!");
      clearForm();
      navigate("/");
    } catch (error) {
      let message = "Something went wrong, please try again.";
      if (error.code === "auth/user-not-found") {
        message = "User not found. Please register first.";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (error.code === "auth/too-many-requests") {
        message =
          "Too many failed login attempts. Please wait and try again later.";
      } else if (error.message) {
        message = error.message;
      }
      showErrorAlert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await signInWithPopup(auth, provider);
      await showSuccessAlert("Google Login Successful!");
      clearForm();
      navigate("/");
    } catch (error) {
      let message = "Google login failed. Please try again.";
      if (error.code === "auth/popup-closed-by-user") {
        message = "Google login popup closed before completion.";
      } else if (error.message) {
        message = error.message;
      }
      showErrorAlert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fbfc] to-[#eef2f5] dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Welcome back to <span className="text-sky-600">Keep Fresh</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your food expiry and reduce waste
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            autoComplete="off"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isLoading}
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-sky-500 focus:border-sky-500 pr-10"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="font-medium text-sm text-sky-600 hover:text-sky-500"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                isLoading
                  ? "bg-sky-400 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-700 cursor-pointer"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Login ...
                </>
              ) : (
                "Log in"
              )}
            </motion.button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full max-w-xs inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
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

export default LogIn;
