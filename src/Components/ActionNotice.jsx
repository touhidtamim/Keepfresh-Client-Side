import { Link } from "react-router-dom";

const ActionNotice = ({ message, subMessage, linkText, linkTo }) => {
  return (
    <section className="py-8 px-2 md:px-4 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-200 dark:bg-gray-800 border border-gray-600 dark:border-gray-500 px-5 py-4 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 sm:gap-0 rounded-md text-sm text-center sm:text-left md:mx-10 lg:mx-auto">
        <p className="flex-1 text-gray-800 dark:text-gray-200 min-w-0">
          <span className="mr-2">{message}</span>
          {subMessage && (
            <span className="hidden sm:inline"> {subMessage}</span>
          )}
        </p>
        <Link
          to={linkTo}
          className="mt-2 sm:mt-0 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-all duration-200 text-sm font-medium whitespace-nowrap"
        >
          {linkText}
        </Link>
      </div>
    </section>
  );
};

export default ActionNotice;
