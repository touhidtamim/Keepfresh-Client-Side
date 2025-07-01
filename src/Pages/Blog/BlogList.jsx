import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBlog, setExpandedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/Blogs.json");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const toggleExpand = (id) => {
    setExpandedBlog(expandedBlog === id ? null : id);
  };

  // Filter by search and category
  const filteredBlogs = blogs
    .filter(
      (blog) =>
        blog.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((blog) => (filter === "all" ? true : blog.category === filter));

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const categories = ["all", ...new Set(blogs.map((b) => b.category))];

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 dark:bg-gray-900 dark:text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 dark:bg-gray-900 dark:text-white">
        <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg">
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
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Error: {error}
        </div>
      </div>
    );

  return (
    // Wrap full viewport with dark bg so no white side gaps in dark mode
    <div className="dark:bg-gray-900 bg-white min-h-screen text-black dark:text-white">
      <div className="max-w-7xl mx-auto p-6 space-y-10">
        {/* Heading */}
        <div className="text-center space-y-2 my-4 md:my-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white">
            Knowledge Today, Less Waste Tomorrow
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Your Ultimate Guide to Smart Food Habits & Mindful Living
          </p>
        </div>

        {/* Search & Filter */}
        <section className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 items-center px-4 sm:px-0">
          {/* Search Bar */}
          <div className="relative flex-grow w-full">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filter dropdown */}
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-56 py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
            aria-label="Filter blogs by category"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </section>

        {/* Blog Cards Grid */}
        <section className="flex flex-col gap-6 max-w-4xl mx-auto px-4 sm:px-0">
          {currentBlogs.map(
            ({ id, heading, description, image, tips }, index) => {
              const isExpanded = expandedBlog === id;
              return (
                <motion.article
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row rounded-lg shadow-md bg-gradient-to-br from-white to-sky-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden
          ${
            isExpanded ? "ring-2 ring-blue-600" : "hover:shadow-lg"
          } transition-shadow duration-300 min-h-[320px]`}
                >
                  <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                    <img
                      src={image}
                      alt={heading}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
                  </div>

                  <div className="md:w-2/3 p-6 flex flex-col">
                    <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
                      {heading}
                    </h2>
                    <p
                      className={`text-gray-700 dark:text-gray-300 flex-grow leading-relaxed ${
                        isExpanded ? "line-clamp-none" : "line-clamp-4"
                      }`}
                    >
                      {description}
                    </p>

                    <button
                      onClick={() => toggleExpand(id)}
                      className="mt-4 self-start text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 font-semibold flex items-center gap-1"
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isExpanded && tips && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="mt-6"
                      >
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                          <svg
                            className="w-6 h-6 text-blue-600 dark:text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          Key Tips
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                          {tips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </motion.article>
              );
            }
          )}
        </section>

        {/* Pagination */}
        {filteredBlogs.length > blogsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-10 px-4 sm:px-0">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
