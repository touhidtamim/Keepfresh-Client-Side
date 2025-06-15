import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800  ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center group">
            <img
              src="/src/assets/logo-transparent.png"
              alt="logo"
              className="h-12 md:h-14 transition-transform group-hover:scale-105"
            />
          </Link>
          <p className="text-sm leading-relaxed text-gray-400 dark:text-gray-300">
            Every meal matters. KeepFresh helps you save food, time, and the
            planet — one item at a time.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-3 text-[#7adce6] dark:text-[#9ee5ec]">
            Explore
          </h3>
          <div className="space-y-2">
            <Link
              to="/fridge"
              className="block text-gray-400 hover:text-[#7adce6] dark:hover:text-[#9ee5ec] transition-all duration-200 hover:pl-1 hover:glow-text"
            >
              Fridge
            </Link>
            <Link
              to="/blog"
              className="block text-gray-400 hover:text-[#7adce6] dark:hover:text-[#9ee5ec] transition-all duration-200 hover:pl-1 hover:glow-text"
            >
              Blogs
            </Link>
            <Link
              to="/about"
              className="block text-gray-400 hover:text-[#7adce6] dark:hover:text-[#9ee5ec] transition-all duration-200 hover:pl-1 hover:glow-text"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block text-gray-400 hover:text-[#7adce6] dark:hover:text-[#9ee5ec] transition-all duration-200 hover:pl-1 hover:glow-text"
            >
              Contact Us
            </Link>
            <Link
              to="/faq"
              className="block text-gray-400 hover:text-[#7adce6] dark:hover:text-[#9ee5ec] transition-all duration-200 hover:pl-1 hover:glow-text"
            >
              FAQ
            </Link>
          </div>
        </div>

        {/* Legal Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-3 text-[#7adce6] dark:text-[#9ee5ec]">
            Legal
          </h3>
          <div className="space-y-2">
            <Link
              to="/privacy-policy"
              className="block text-gray-400 hover:text-[#7adce6] dark:hover:text-[#9ee5ec] transition-all duration-200 hover:pl-1 hover:glow-text"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms&condition"
              className="block text-gray-400 hover:text-[#7adce6] dark:hover:text-[#9ee5ec] transition-all duration-200 hover:pl-1 hover:glow-text"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Newsletter & Socials */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#7adce6] dark:text-[#9ee5ec]">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-400 dark:text-gray-300">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#7adce6] dark:focus:ring-[#9ee5ec] transition-all"
                required
              />
              <button
                type="submit"
                className="px-5 py-2 cursor-pointer hover:text-black bg-gradient-to-r from-[#3a636b] to-[#2c4d54] text-white rounded-lg hover:from-[#7adce6] hover:to-[#9ee5ec] text-sm font-medium shadow-lg hover:shadow-[#7adce6]/30 transition-all duration-300 whitespace-nowrap hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#7adce6] dark:text-[#9ee5ec]">
              Connect With Us
            </h3>
            <div className="flex gap-5">
              <a
                href="https://web.facebook.com/touhidtamim01"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-900/50 text-blue-400 hover:text-blue-300 transition-all hover:shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://x.com/touhidtamim"
                className="p-2 bg-gray-800 rounded-full hover:bg-sky-900/50 text-sky-400 hover:text-sky-300 transition-all hover:shadow-[0_0_10px_2px_rgba(56,189,248,0.5)]"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>

              <a
                href="mailto:hello@keepfresh.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-green-900/50 text-green-400 hover:text-green-300 transition-all hover:shadow-[0_0_10px_2px_rgba(52,211,153,0.5)]"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 pb-5  bg-black/50  ">
        &copy; {new Date().getFullYear()} KeepFresh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
