import { useState } from "react";
import DashboardSidebar from "../Sidebar";
import NoticePage from "../Notice/NoticePage";
import { Route, Routes } from "react-router-dom";

function HomePage() {
  const [toggleSidebar, setToggleSidebar] = useState(true);

  return (
    <div className="flex">
      {/* <DashboardSidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} /> */}
      <div className="flex-1 p-6">
        {/* <button onClick={() => setToggleSidebar(!toggleSidebar)} className="p-2 bg-blue-500 text-white">
          Toggle Sidebar
        </button> */}


        <Routes>
          {/* <Route path="/" element={<HomePage/>} /> */}
          <Route path="notice" element={<NoticePage/>} />
        </Routes>

      </div>
    </div>
  );
};

export default HomePage