import { useEffect, useState } from "react";
import { User } from "../(entities)/user";

const Sidebar = (props: { pages: { name: String; page: JSX.Element }[] }) => {
  const [selectedPage, setSelectedPage] = useState(0);
  const [isSidebarCollapsed, setIsSideBarCollapsed] = useState(true);
  const [saldo, setSaldo] = useState<String>();
  useEffect(() => {
    User.getUserById(User.getCurrentUserId() as string).then((user) => {
      setSaldo(user.saldo);
    });
  });

  return (
    <div className={`flex flex-row h-screen w-screen`}>
      <div className="flex flex-row ">
        <div
          className={`flex flex-col justify-center bg-slate-200 h-full w-[100%] inline transition-all ${
            isSidebarCollapsed ? " overflow-hidden w-[0%] hidden" : ""
          }`}
        >
          {saldo && (
            <div className=" px-8 py-2 flex mb-10 text-white w-full align-self-end bg-slate-800">
              Saldo: {saldo}
            </div>
          )}
          {props.pages.map((node, key) => {
            return (
              <div
                className={`px-8 py-2 ${
                  key === selectedPage ? "bg-slate-500 text-white" : ""
                } hover:bg-slate-500 hover:text-white cursor-pointer`}
                key={key}
                onClick={() => {
                  setSelectedPage(key);
                }}
              >
                {node.name}
              </div>
            );
          })}
          <div
            onClick={() => {
              User.deleteCurrentUserId();
              User.deleteCurrentUserRole();
              window.location.reload();
            }}
            className=" cursor-pointer px-8 py-2 flex mt-10 text-white w-full align-self-end bg-slate-800"
          >
            Logout
          </div>
        </div>
        <div
          onClick={() => {
            setIsSideBarCollapsed(!isSidebarCollapsed);
          }}
          className="flex bg-slate-800 text-white p-4 items-center cursor-pointer"
        >
          {isSidebarCollapsed ? ">" : "<"}
        </div>
      </div>
      <div className="flex relative flex-col bg-white w-[100%]">
        <h1 className="flex p-8 text-lg bg-slate-200 font-bold">
          {"Jaya Laksa Lestari WMS"}
        </h1>
        {props.pages[selectedPage].page}
      </div>
    </div>
  );
};
export default Sidebar;
