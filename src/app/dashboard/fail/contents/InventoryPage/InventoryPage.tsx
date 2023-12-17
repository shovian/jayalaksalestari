import { TPage } from "@/app/types/TPage";
import GeneralPage from "../GeneralPage";
import React, { useContext, useEffect, useState } from "react";
import { ITable } from "@/app/interfaces/ITable";
import { ITableColumn } from "@/app/interfaces/ITableColumn";
import { readAllData } from "../GeneralHandler";
import { FirebaseContext } from "@/app/context/FirebaseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Popup from "@/components/Popup";

const tableColumns: ITableColumn[] = [
  { key: "name", label: "Nama" },
  { key: "itemtype", label: "Jenis Barang" },
  { key: "description", label: "Deskripsi" },
  { key: "quantity", label: "Tersedia" },
  { key: "budget", label: "Budget" },
  { key: "price", label: "Harga/Barang" },
];
const InventoryPage: React.FC<TPage> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [InventoryTable, setInventoryTable] = useState({} as ITable);
  const [assignId, setAssignId] = useState(null);
  const context = useContext(FirebaseContext);
  useEffect(() => {
    readAllData("inventori", context).then((data) => {
      const fetchedData: InventoryItem[] = data;
      setInventoryTable({
        columns: tableColumns,
        data: fetchedData,
        canViewDetail: false,
        customAction: (
          <button className="hover:opacity-50">
            <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
          </button>
        ),
        onCustom: (id) => {
          setAssignId(id);
        },
      });
      setIsLoading(false);
    });
  }, []);
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          <GeneralPage
            canAdd
            userType={props.userType}
            name={"inventori"}
            table={InventoryTable}
          ></GeneralPage>
          <Popup
            id={assignId}
            onClosePopup={function (): void {
              setAssignId(null);
            }}
          >
            <div>{assignId}</div>
          </Popup>
        </div>
      )}
    </div>
  );
};
export default InventoryPage;
