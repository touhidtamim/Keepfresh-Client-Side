import { Link } from "react-router-dom";

const ActionNotice = ({ message, subMessage, linkText, linkTo }) => {
  return (
    <div className="max-w-3xl mx-auto bg-gray-200 border border-gray-600 px-4 sm:px-6 py-3 my-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 rounded-md text-sm text-center sm:text-left">
      <p className="text-gray-800">
        <span className="mr-2">{message}</span>
        {subMessage && <span className="hidden sm:inline"> {subMessage}</span>}
      </p>
      <Link
        to={linkTo}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default ActionNotice;
