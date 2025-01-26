import logo from "../assets/ph.png";
import { useContext, useRef, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../Provider/Provider";

const Navbar = () => {
    const { user, handleLogOut } = useContext(Context);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const menuRef = useRef(null);
    const profileMenuRef = useRef(null);

    useEffect(() => {
        // Close the profile menu if clicked outside of it
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const links = (
        <>
            <ul className="flex text-lg font-semibold text-gray-900  ">
                <li className="px-4 py-2 hover:text-[#684DF4] ">
                    <NavLink to={'/'}>Home</NavLink>
                </li>
                <li className="px-4 py-2 hover:text-[#684DF4] ">
                    <NavLink to={'/products'}>Products</NavLink>
                </li>
                <li className="px-4 py-2 hover:text-[#684DF4] ">
                    <NavLink to={'/about-us'}>About Us</NavLink>
                </li>
                <li className="px-4 py-2 hover:text-[#684DF4] ">
                    <NavLink to={'/contact-us'}>Contact Us</NavLink>
                </li>
            </ul>
        </>
    );

    return (
        <header className="sticky top-0 z-[2000]  bg-[#E1EAFF]">
            <div className="w-11/12 mx-auto flex justify-between py-2">

                {/* Logo */}
                <Link to={'/'}>
                    <div className="flex items-center">
                        <img className="w-full h-14" src={logo} alt="Logo" />
                        <div className="text-xl font-bold flex text-[#684DF4]"  >Products <span className="text-black" >Hunt</span>.</div>
                    </div>
                </Link>



                {/* Links for larger screens */}
                <div className="hidden lg:flex flex-1 justify-center items-center ">{links}</div>


                <div className="flex items-center justify-center gap-4">
                    {/* User Section */}
                    <div className="flex items-center space-x-4">
                        {user && user?.email ? (
                            <div className="relative group flex items-center space-x-3">
                                {/* User Photo */}
                                <img
                                    className="h-10 w-10 rounded-full cursor-pointer border-2 border-gray-300"
                                    src={user?.photoURL || " "}
                                    alt="User"
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                />
                                {/* Display Name and Logout Button - both visible on click */}
                                {isProfileMenuOpen && (
                                    <div
                                        ref={profileMenuRef}
                                        className="absolute top-12 left-1/6 transform -translate-x-1/2 w-36 text-start bg-white border border-gray-300 rounded-lg shadow-lg p-3 mt-1"
                                    >
                                        <span className="block text-black font-bold">{user?.displayName}</span>
                                        <NavLink to="/dashboard">
                                            <h2 className="font-semibold text-gray-90 mt-2 cursor-pointer hover:text-[#684DF4]">Dashboard</h2>
                                        </NavLink>
                                        <button
                                            onClick={handleLogOut}
                                            className="mt-2 px-2 py-1 bg-[#684DF4] text-white rounded-md"
                                        >
                                            Log-Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink to="/login">
                                <button className="px-2 sm:px-4 py-2 bg-[#684DF4] text-white rounded-md relative overflow-hidden group transition-all duration-500 ease-in-out">
                                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#684DF4] to-black opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></span>
                                    <span className="relative z-10 group-hover:text-gray-200">Login</span>
                                </button>
                            </NavLink>
                        )}
                    </div>

                    {!user && (
                        <div>
                            <NavLink to="/register">
                                <button className="px-2 sm:px-4 py-2 bg-[#684DF4] text-white rounded-md relative overflow-hidden group transition-all duration-500 ease-in-out">
                                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#684DF4] to-black opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></span>
                                    <span className="relative z-10 group-hover:text-gray-200">Register</span>
                                </button>
                            </NavLink>
                        </div>
                    )}

                    <div className="lg:hidden relative">
                        {/* Hamburger / Close Button */}
                        <button
                            className="text-black focus:outline-none"
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle menu"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            )}
                        </button>

                        {/* Dropdown Menu for small screens */}
                        <div
                            ref={menuRef}
                            className={`absolute right-0 mt-5 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transform transition-all  duration-300 ease-in-out ${isMenuOpen
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95 pointer-events-none"
                                }`}
                        >
                            <ul className=" text-md space-y-1 py-4  font-semibold text-gray-900  ">
                                <li className="px-4  hover:text-[#684DF4] ">
                                    <NavLink to={'/'}>Home</NavLink>
                                </li>
                                <li className="px-4  hover:text-[#684DF4] ">
                                    <NavLink to={'/products'}>Products</NavLink>
                                </li>
                                <li className="px-4  hover:text-[#684DF4] ">
                                    <NavLink to={'/about-us'}>About Us</NavLink>
                                </li>
                                <li className="px-4  hover:text-[#684DF4] ">
                                    <NavLink to={'/contact-us'}>Contact Us</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
