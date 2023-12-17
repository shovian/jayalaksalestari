import React from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
  selectedPage: string;
  handlePageSelect: (pageLabel: string) => void;
  pageContents: { label: string; component: JSX.Element }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  selectedPage,
  handlePageSelect,
  pageContents,
}) => {
  return (
    <aside
      className={`${
        isSidebarOpen ? "block" : "hidden"
      } bg-indigo-700 text-white w-64 flex-shrink-0 lg:block`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <nav className="mt-6">
        <ul>
          {pageContents.map((page, index) => (
            <li key={index} className="py-2 px-4">
              <a
                href="#"
                className={`block hover:text-indigo-200 ${
                  selectedPage === page.label ? "font-bold" : ""
                }`}
                onClick={() => handlePageSelect(page.label)}
              >
                {page.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
