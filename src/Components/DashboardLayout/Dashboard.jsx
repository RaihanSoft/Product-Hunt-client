import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiPlusCircle, FiPackage, FiCheckSquare } from "react-icons/fi";
import { BsMoon, BsSun } from "react-icons/bs";
import useAdmin from "../Hooks/useAdmin";
import useModerator from "../Hooks/useModerator";

const Dashboard = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    // User roles
    const [isAdmin] = useAdmin() // Set this dynamically based on user role
    const [isModerator] = useModerator(); // Set this dynamically based on user role

    // Sidebar links based on roles
    const sidebarLinks = isAdmin
        ? [
              { path: "/dashboard/my-profile", label: "My Profile", icon: <FiUser /> },
              { path: "/dashboard/manage-users", label: "Manage Users", icon: <FiPackage /> }, // Admin link
              { path: "/dashboard/site-stats", label: "Site Statistics", icon: <FiCheckSquare /> }, // Admin link
          ]
        : isModerator
        ? [
              { path: "/dashboard/review-queue", label: "Product Review Queue", icon: <FiCheckSquare /> }, // Moderator link
              { path: "/dashboard/reported-content", label: "Reported Contents", icon: <FiPackage /> }, // Moderator link
          ]
        : [
              { path: "/dashboard/my-profile", label: "My Profile", icon: <FiUser /> },
              { path: "/dashboard/add-product", label: "Add Product", icon: <FiPlusCircle /> },
              { path: "/dashboard/my-products", label: "My Products", icon: <FiPackage /> },
          ];

    return (
        <div
            className={`dashboard-layout flex flex-col lg:flex-row min-h-screen ${
                darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
            }`}
        >
            {/* Sidebar */}
            <aside
                className={`sidebar fixed lg:relative top-0 left-0 h-full lg:h-auto w-64 lg:w-1/5 bg-gradient-to-b from-indigo-600 to-purple-700 text-white shadow-lg p-6 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 transition-transform`}
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                    >
                        {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
                    </button>
                </div>
                <nav>
                    <ul className="space-y-4">
                        {sidebarLinks.map((link, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                                            isActive
                                                ? "bg-white text-indigo-600 font-semibold shadow-md"
                                                : "text-gray-200 hover:text-white hover:bg-indigo-500"
                                        }`
                                    }
                                >
                                    {link.icon}
                                    <span>{link.label}</span>
                                </NavLink>
                            </motion.li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Hamburger Menu for Small Screens */}
            <div className="lg:hidden fixed top-4 left-4 z-50 mt-12">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-3 bg-indigo-600 text-white rounded-full shadow-lg focus:outline-none"
                >
                    {isSidebarOpen ? "Close" : "Menu"}
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6 mt-20 lg:mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};

export default Dashboard;
