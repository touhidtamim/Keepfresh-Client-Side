import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Animated border elements */}
        <div className="absolute inset-0 border-8 border-transparent">
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-gray-800 dark:border-gray-600 animate-border-pulse delay-100"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-gray-800 dark:border-gray-600 animate-border-pulse delay-300"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-gray-700 dark:border-gray-500 animate-border-pulse"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-gray-700 dark:border-gray-500 animate-border-pulse delay-200"></div>
        </div>

        <div className="relative space-y-6 z-10">
          <div className="relative inline-block">
            <h1 className="text-8xl font-bold text-gray-900 dark:text-white relative">
              404
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-400 dark:to-gray-600 rounded-full"></span>
            </h1>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent opacity-20 dark:opacity-30"></div>
          </div>

          <h2 className="text-3xl font-medium text-gray-800 dark:text-gray-200 tracking-tight">
            Lost in the void
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-lg leading-relaxed">
            The page you seek doesn't exist in our realm. Perhaps it's been
            moved or never was.
          </p>

          <button
            onClick={() => navigate("/")}
            className="relative mt-8 cursor-pointer px-8 py-3 text-base font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Return home
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Subtle grid pattern in background */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-grid-gray-400 dark:bg-grid-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
