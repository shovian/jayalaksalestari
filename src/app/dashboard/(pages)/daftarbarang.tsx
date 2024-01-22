import { useEffect, useState } from "react";
import { Inventori } from "../(entities)/inventori";
import { ITableColumn } from "../../../../(interfaces)/ITableColumn";
import { BarangTable } from "../(component)/table";
import { Proyek } from "../(entities)/proyek";
import { Barang } from "../(entities)/barang";

const DaftarBarang = () => {
  const [data, setData] = useState<any[]>([]);
  const [dataShown, setDataShown] = useState<any[]>([]);
  useEffect(() => {
    Inventori.subscribeDatabase(setData);
  }, []);
  useEffect(() => {
    const newData: any[] = [];
    data.map((node, key) => {
      Proyek.getNamaProyekById((node as Barang).idProyek).then((namaProyek) => {
        const newNode = {
          ...node,
          namaProyek: namaProyek,
        };
        newData.push(newNode);
        newData.length === data.length ? setDataShown(newData) : {};
      });

      // console.log(newData.length);
    });
  }, [data]);
  const tableColumns: ITableColumn[] = [
    { key: "name", label: "Nama" },
    // { key: "namaProyek", label: "Nama Proyek" },
    { key: "itemType", label: "Jenis Barang" },
    { key: "quantity", label: "Tersedia" },
    { key: "budget", label: "Budget" },
    { key: "price", label: "Harga/Barang" },
    // { key: "description", label: "Deskripsi" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center ">
      <div className="lg:hidden">
        <BarangTable
          header={[tableColumns[0], tableColumns[3]]}
          data={dataShown}
          custom={"mobile"}
        ></BarangTable>
      </div>
      <div className="hidden lg:[display:inline]">
        <BarangTable header={tableColumns} data={dataShown}></BarangTable>
      </div>
    </div>
  );
};
export default DaftarBarang;
