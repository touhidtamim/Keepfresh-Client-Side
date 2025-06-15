import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBlog, setExpandedBlog] = useState(null);
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

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

  const loadMore = () => {
    setVisibleBlogs((prev) => prev + 3);
  };

  const showLess = () => {
    setVisibleBlogs(6);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setVisibleBlogs(showAll ? 6 : blogs.length);
    if (!showAll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gradient colors that will alternate between cards
  const gradientColors = [
    "from-blue-50 to-white",
    "from-sky-50 to-white",
    "from-blue-50 to-white",
    "from-green-50 to-white",
    "from-purple-50 to-white",
    "from-indigo-50 to-white",
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10">
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
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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

      {/* Results Count */}
      {searchTerm && (
        <p className="text-center text-gray-600">
          Found {filteredBlogs.length}{" "}
          {filteredBlogs.length === 1 ? "result" : "results"}
        </p>
      )}

      {/* Blog List */}
      {filteredBlogs
        .slice(0, visibleBlogs)
        .map(({ id, heading, description, image, tips }, index) => {
          const isEven = index % 2 === 0;
          const isExpanded = expandedBlog === id;
          const gradientClass = gradientColors[index % gradientColors.length];

          return (
            <motion.article
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden bg-gradient-to-br ${gradientClass} shadow-md ${
                isExpanded ? "ring-2 ring-blue-500" : "hover:shadow-lg"
              } transition-all duration-300`}
            >
              <div
                className={`flex flex-col md:flex-row ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Image */}
                <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                  <img
                    src={image}
                    alt={heading}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="md:w-2/3 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {heading}
                  </h2>

                  <p className="text-gray-700 mb-4">
                    {isExpanded
                      ? description
                      : `${description.split("\n")[0]}...`}
                  </p>

                  <button
                    onClick={() => toggleExpand(id)}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform ${
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

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-500"
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
                      <ul className="space-y-2">
                        {tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2 mt-0.5">
                              <svg
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                            <span className="text-gray-600">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}

      {/* Show More/Less Buttons */}
      {filteredBlogs.length > 6 && (
        <div className="flex justify-center gap-4 mt-8">
          {visibleBlogs < filteredBlogs.length ? (
            <>
              <button
                onClick={loadMore}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
              >
                Show More (+3)
              </button>
              <button
                onClick={toggleShowAll}
                className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
              >
                Show All
              </button>
            </>
          ) : (
            <button
              onClick={showLess}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              Show Less
            </button>
          )}
        </div>
      )}

      {/* No Results Message */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-16">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No blogs found
          </h3>
          <p className="mt-1 text-gray-500">
            {searchTerm
              ? "Try different search terms"
              : "No blogs available at the moment"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
