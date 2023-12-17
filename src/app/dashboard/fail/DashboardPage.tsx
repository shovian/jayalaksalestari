"use client";
import React, { useState } from "react";
import LoginPage from "../../auth/LoginPage";
import Sidebar from "@/components/Sidebar";
import InventoryPage from "./contents/InventoryPage/InventoryPage";
import ProjectPage from "./contents/ProjectPage/ProjectPage";
// import ProjectPage from "./contents/ProjectPage";
// import AttendancePage from "./contents/AttendancePage";
import { TPage } from "@/app/types/TPage";
// import FundRequestPage from "./contents/FundRequestPage";

const DashboardPage: React.FC<TPage> = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Barang");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageSelect = (pageLabel: string) => {
    setSelectedPage(pageLabel);
  };
  // console.log(props.userType);

  const pageContents = [
    { label: "Barang", component: <InventoryPage userType={props.userType} /> },
    { label: "Proyek", component: <ProjectPage userType={props.userType} /> },
    // { label: "Proyek", component: <ProjectPage userType={props.userType} /> },
    // {
    //   label: "Kehadiran",
    //   component: <AttendancePage userType={props.userType} />,
    // },
    // {
    //   label: "Pengajuan Dana",
    //   component: <FundRequestPage userType={props.userType} />,
    // },
  ];

  const selectedPageContent = pageContents.find(
    (content) => content.label === selectedPage
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        selectedPage={selectedPage}
        handlePageSelect={handlePageSelect}
        pageContents={pageContents}
      />

      {/* Hamburger Menu */}
      <div className="lg:hidden">
        <button className="p-4 focus:outline-none" onClick={toggleSidebar}>
          <svg
            className="w-6 h-6 text-indigo-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {selectedPageContent?.component}
      </main>
    </div>
  );
};

export default DashboardPage;
