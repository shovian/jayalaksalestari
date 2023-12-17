import { useState } from "react";

const ViewProject: React.FC = () => {
  const [project, setproject] = useState<Project>();
  const [totalBudget, setTotalBudget] = useState(0);
  const [currentBudget, setCurrentBudget] = useState(0);
  const [isValid, setIsValid] = useState(false);
  return (
    <div>
      <div className="flex flex-col">
        <label className="text-sm flex flex-row" htmlFor="name">
          Nama Proyek :{" "}
        </label>
        <div>nama</div>
        <label className="text-sm flex flex-row" htmlFor="conper">
          Contact Person :{" "}
        </label>
        <div>cp </div>
        {project?.items.map((item) => {
          return (
            <div key={item.name} className="flex flex-col ">
              <div className="h-2"></div>
              <div className="flex flex-row gap-2">
                <div>
                  {item === project.items[0] && (
                    <label
                      className="text-sm flex flex-row"
                      htmlFor="jenisBarang"
                    >
                      Jenis Barang<div className="text-red-500">*</div>
                    </label>
                  )}
                  <input
                    id="jenisBarang"
                    type="text"
                    placeholder="(mis: Laptop)"
                  />
                </div>
                <div>
                  {item === project.items[0] && (
                    <label
                      className="text-sm flex flex-row"
                      htmlFor="namaBarang"
                    >
                      Nama Barang
                    </label>
                  )}
                  <input
                    id="namaBarang"
                    type="text"
                    placeholder="(mis: Lenovo A22)"
                  />
                </div>
                <div>
                  {item === project.items[0] && (
                    <label
                      className="text-sm flex flex-row"
                      htmlFor="deskripsiBarang"
                    >
                      Deskripsi
                    </label>
                  )}
                  <input
                    id="deskripsiBarang"
                    type="text"
                    placeholder="(mis: I5 4200)"
                  />
                </div>
                <div>
                  {item === project.items[0] && (
                    <label
                      className="text-sm flex flex-row"
                      htmlFor="Jumlah Barang"
                    >
                      Jumlah
                      <div className="text-red-500">*</div>
                    </label>
                  )}
                  <input
                    id="jumlahBarang"
                    className="w-full"
                    type="number"
                    placeholder="(mis: 10)"
                  />
                </div>
                <div>
                  {item === project.items[0] && (
                    <label
                      className="text-sm flex flex-row"
                      htmlFor="budgetBarang"
                    >
                      Budget
                      <div className="text-red-500">*</div>
                    </label>
                  )}
                  <input
                    id="budgetBarang"
                    className="w-32"
                    type="number"
                    placeholder="(mis:3.000.000)"
                    onFocus={(event) => {
                      setCurrentBudget(
                        parseInt(event.target.value ? event.target.value : "0")
                      );
                    }}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      const changedValue = parseInt(
                        event.target.value ? event.target.value : "0"
                      );
                      const totalChange = changedValue - currentBudget;
                      // console.log(changedValue, currentBudget, totalChange);

                      setTotalBudget(totalBudget + totalChange);
                      setCurrentBudget(changedValue);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex flex-row justify-between">
          <div>Budget Proyek:{totalBudget}</div>
        </div>

        <button type="submit">Tambahkan Proyek</button>
      </div>
    </div>
  );
};
export default ViewProject;
