import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="bg-white dark:bg-gray-800 shadow-md w-full lg:w-64 px-4 py-4 lg:px-6 lg:py-8 flex flex-col lg:min-h-screen">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Food Dashboard
        </h2>

        <nav className="flex flex-wrap lg:flex-col gap-2 lg:gap-3 text-sm font-medium">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition flex items-center ${
                isActive
                  ? "bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Overview
          </NavLink>

          <NavLink
            to="/dashboard/my-profile"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition flex items-center ${
                isActive
                  ? "bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            My Profile
          </NavLink>

          <NavLink
            to="/dashboard/add-foods"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition flex items-center ${
                isActive
                  ? "bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Foods
          </NavLink>

          <NavLink
            to="/dashboard/my-foods"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition flex items-center ${
                isActive
                  ? "bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            My Added Foods
          </NavLink>

          <NavLink
            to="/dashboard/expired-items"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition flex items-center ${
                isActive
                  ? "bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Expired Items
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
