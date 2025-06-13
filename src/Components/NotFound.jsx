import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>

        <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>

        <p className="text-gray-600 max-w-md">
          The page you are looking for doesn't exist or has been moved
        </p>

        <button
          onClick={() => navigate("/")}
          className="cursor-pointer mt-6 px-5 py-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
