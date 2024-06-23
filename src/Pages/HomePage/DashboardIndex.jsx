import { Link, Outlet, useLocation } from "react-router-dom";
import DashbSidebar from "../DashbSidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const DashboardIndex = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;


    return (
        <div className="flex ">
            <div className="md:hidden block">
                <DashbSidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
            </div>
            <div className="flex">
                {/* Navbar */}
                <div className="hidden md:flex flex-col h-screen bg-primary text-white shadow-lg w-64 z-30 ">
                    <h1 className="text-2xl font-bold px-6 py-10">Dashboard</h1>
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

                <div className="p-4 flex gap-4">
                    <FaBars className="cursor-pointer text-2xl mb-4 block md:hidden " onClick={() => setToggleSidebar(!toggleSidebar)} />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardIndex;
