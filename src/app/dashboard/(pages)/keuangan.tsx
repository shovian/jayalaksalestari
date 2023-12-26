import { useEffect, useState } from "react";
import Table from "../../../../(components)/Table";
import { Proyek } from "../(entities)/proyek";
import { Inventori } from "../(entities)/inventori";

const Keuangan = () => {
  const [shownData, setShownData] = useState<any[]>([]);
  useEffect(() => {
    Inventori.getAllBarangs().then((barangs) => {
      Proyek.getAllProyek().then((proyeks) => {
        console.log(proyeks);
        const tempData = [] as any[];
        proyeks.forEach((proyek) => {
          const tempBarangs = barangs.filter((barang) => {
            return barang.idProyek === proyek.id;
          });
          var totalDana: number = 0;
          tempBarangs.forEach((barang) => {
            const dana = parseInt((barang.price || "0") as string);
            totalDana += dana;
          });
          tempData.push({
            namaProyek: proyek.namaProyek,
            totalDana: totalDana,
            totalBudget: proyek.budgetProyek,
          });
          tempData.length === proyeks.length && setShownData(tempData);
        });
      });
    });
  }, []);
  return shownData ? (
    <div className="flex justify-center items-center h-full w-full ">
      <Table
        columns={[
          { key: "namaProyek", label: "Nama Proyek" },
          { key: "totalDana", label: "Total Dana" },
          { key: "totalBudget", label: "Total Budget" },
        ]}
        data={shownData}
        actionable
        canDelete={false}
        canEdit={false}
        onViewDetail={(id) => {
          alert("aaa");
        }}
      ></Table>
    </div>
  ) : (
    <div />
  );
};
export default Keuangan;
