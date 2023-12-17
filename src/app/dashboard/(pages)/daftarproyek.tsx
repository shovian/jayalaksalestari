import { useEffect, useState } from "react";
import { ITableColumn } from "@/app/(interfaces)/ITableColumn";
import { Proyek } from "../(entities)/proyek";
import { ProyekTable } from "../(component)/table";

const DaftarProyek = () => {
  const [data, setData] = useState<any[]>([]);
  const [dataShown, setDataShown] = useState<any[]>([]);
  useEffect(() => {
    new Proyek().subscribeDatabase(setData);
  }, []);
  useEffect(() => {
    const newData: any[] = [];
    data.map((node, key) => {
      const newNode = { ...node };
      newData.push(newNode);
    });
    setDataShown(newData);
  }, [data]);
  const tableColumns: ITableColumn[] = [
    // { key: "description", label: "Deskripsi" },
    { key: "namaProyek", label: "Nama Proyek" },
    { key: "budgetProyek", label: "Budget Proyek" },
    { key: "cp", label: "Contact Person" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div>
        <ProyekTable header={tableColumns} data={dataShown}></ProyekTable>
      </div>
    </div>
  );
};
export default DaftarProyek;
