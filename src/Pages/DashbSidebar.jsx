import { Link, useLocation } from "react-router-dom";
import { FaBars, FaCross } from "react-icons/fa";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const DashbSidebar = ({ toggleSidebar, setToggleSidebar }) => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className={`fixed h-full bg-primary text-white shadow-lg w-64 z-30 ${toggleSidebar ? "left-0" : "-left-64"} transition-all duration-300`}>
            <div className="p-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <IoCloseSharp className="cursor-pointer text-2xl" onClick={() => setToggleSidebar(!toggleSidebar)} />
                </div>
                <nav >
                        <Link
                            className={`block py-4 px-6 hover:bg-dark w-full cursor-pointer  ${isActive("/dashboard/notice") ? 'font-bold bg-dark' : ''}`}
                            to="/dashboard/notice"
                        >
                            Notice
                        </Link>
                        <Link
                            className={`block py-4 px-6 hover:bg-dark w-full cursor-pointer ${isActive("/dashboard/research") ? 'font-bold bg-dark' : ''}`}
                            to="/dashboard/research"
                        >
                            Research
                        </Link>

                        <Link
                            className="block py-4 px-6 hover:bg-red-500 w-full cursor-pointer"
                            to="/"
                        >
                            Logout
                        </Link>
                    </nav>
            </div>
        </div>
    );
};

export default DashbSidebar;
