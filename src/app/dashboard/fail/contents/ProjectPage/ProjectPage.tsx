import { TPage } from "@/app/types/TPage";
import GeneralPage from "../GeneralPage";
import React, { useContext, useEffect, useState } from "react";
import { ITable } from "@/app/interfaces/ITable";
import { ITableColumn } from "@/app/interfaces/ITableColumn";
import { createData, createDatas, readAllData } from "../GeneralHandler";
import { FirebaseContext } from "@/app/context/FirebaseContext";
import { FirebaseApp } from "firebase/app";
import AddProject from "./AddProject";
import ViewProject from "./ViewProject";
const pageName = "proyek";
const tableColumns: ITableColumn[] = [
  { key: "name", label: "Nama" },
  { key: "items", label: "Daftar Barang" },
];
async function getData(context: FirebaseApp) {
  return await readAllData(pageName, context);
}
const ProjectPage: React.FC<TPage> = (props) => {
  const [data, setData] = useState(props.table ? props.table.data : []);
  const [addId, setAddId] = useState<string | null>(null);
  const [viewId, setViewId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageTable, setPageTable] = useState({} as ITable);
  const context = useContext(FirebaseContext);
  useEffect(() => {
    getData(context).then((data) => {
      setPageTable({
        columns: tableColumns,
        data: data,
        onViewDetail: handleView,
        onEdit: handleEdit,
      });
      setIsLoading(false);
    });
  }, []);
  function closePopup() {
    document.getElementById("close-button")?.click();
  }
  const handleAdd = (id: string | null) => {
    setAddId(id);
  };
  const handleView = (id: string) => {
    setViewId(id);
  };
  const handleEdit = (id: string) => {
    setEditId(id);
  };
  const handleSubmitAdd = async (event: any) => {
    event.preventDefault();

    setAddId(null);
  };
  const handleSubmitEdit = async (event: any) => {
    event.preventDefault();

    setEditId(null);
  };
  const addComponent = (
    <div>
      <AddProject
        callback={(proj) => {
          createDatas("inventori", proj.items, context);
          createData(pageName, proj, context);
        }}
      />
    </div>
  );

  const viewComponent = <ViewProject />;

  const editComponent = (
    <div>
      <form onSubmit={handleSubmitEdit}>
        {editId &&
          tableColumns.map((item) => {
            const data = pageTable.data;
            const selectedData = data.filter((item) => {
              return item.id === editId;
            })[0];
            if (item.key !== "items")
              return (
                <div key={item.key} className="flex flex-col">
                  <label>{item.label}</label>
                  <input
                    id={item.key}
                    placeholder={item.label}
                    type="text"
                    defaultValue={selectedData[item.key]}
                  ></input>
                </div>
              );
            else
              return (
                <div className="flex flex-col">
                  <label>{item.label}</label>
                  {/* map daftar items here */}
                </div>
              );
          })}
        <button type="submit">ubah data!</button>
      </form>
    </div>
  );

  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <GeneralPage
          canAdd
          addId={addId}
          editId={editId}
          viewId={viewId}
          userType={props.userType}
          name={pageName}
          table={pageTable}
          onAdd={handleAdd}
          viewComponent={viewComponent}
          editComponent={editComponent}
          addComponent={addComponent}
        ></GeneralPage>
      )}
    </div>
  );
};
export default ProjectPage;
