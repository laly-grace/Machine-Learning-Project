import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Add padding-top to prevent content overlap */}
      <div className={`pt-20 ${scrolled ? "pt-16" : "pt-20"}`}></div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gradient-to-r from-purple-900 to-blue-800 shadow-xl py-2"
            : "bg-gradient-to-r from-purple-900 to-blue-800 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with animation */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent">
                    DGLL
                  </span>
                </div>
                <span className="text-white font-bold text-xl tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
                    Machine
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-teal-400">
                    Learning Project
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/"
                      className="relative px-3 py-2 text-sm font-medium text-white group"
                    >
                      <span className="relative z-10">Login</span>
                      <span className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-300 group-hover:w-4/5 group-hover:left-1/10 transition-all duration-300"></span>
                    </Link>
                    <Link
                      to="/register"
                      className="relative px-3 py-2 text-sm font-medium text-white group"
                    >
                      <span className="relative z-10">Register</span>
                      <span className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-pink-400 group-hover:w-4/5 group-hover:left-1/10 transition-all duration-300"></span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      className="relative px-3 py-2 text-sm font-medium text-white group"
                    >
                      <span className="relative z-10">Profile</span>
                      <span className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-teal-300 group-hover:w-4/5 group-hover:left-1/10 transition-all duration-300"></span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="relative px-3 py-2 text-sm font-medium text-white group"
                    >
                      <span className="relative z-10">Logout</span>
                      <span className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-400 group-hover:w-4/5 group-hover:left-1/10 transition-all duration-300"></span>
                    </button>
                  </>
                )}
                {/* Special CTA button */}
                <Link
                  to="/special"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-medium text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-yellow-300 hover:to-pink-400"
                >
                  Special Offer!
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-purple-700 to-blue-700">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            )}
            <Link
              to="/special"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-yellow-400 to-pink-500 mt-2 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Special Offer!
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
