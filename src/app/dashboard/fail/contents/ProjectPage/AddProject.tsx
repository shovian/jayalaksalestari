import { useState } from "react";

const AddProject: React.FC<{ callback: (proj: Project) => void }> = ({
  callback = (proj) => {},
}) => {
  const [numberOfItems, setNumberOfItems] = useState([0]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [currentBudget, setCurrentBudget] = useState(0);
  return (
    <div>
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          const boolVal: boolean[] = [];
          const newValue: InventoryItem[] = [];
          const jenisBarang: any[] =
            numberOfItems.length > 1
              ? event.target.elements.jenisBarang
              : [{ value: event.target.elements.jenisBarang.value }];
          const namaBarang: any[] =
            numberOfItems.length > 1
              ? event.target.elements.namaBarang
              : [{ value: event.target.elements.namaBarang.value }];
          const deskripsiBarang: any[] =
            numberOfItems.length > 1
              ? event.target.elements.deskripsiBarang
              : [{ value: event.target.elements.deskripsiBarang.value }];
          const jumlahBarang: any[] =
            numberOfItems.length > 1
              ? event.target.elements.jumlahBarang
              : [{ value: event.target.elements.jumlahBarang.value }];
          const budgetBarang: any[] =
            numberOfItems.length > 1
              ? event.target.elements.budgetBarang
              : [{ value: event.target.elements.budgetBarang.value }];
          boolVal.push(event.target.elements.name.value !== "");
          boolVal.push(event.target.elements.conper.value !== "");
          for (let i = 0; i < jenisBarang.length; i++) {
            const node: InventoryItem = {
              itemtype: jenisBarang[i].value,
              name: namaBarang[i].value,
              description: deskripsiBarang[i].value,
              quantity: jumlahBarang[i].value,
              budget: budgetBarang[i].value,
              price: parseInt(""), //TO DO: Bug: This parse returns NaN, fix later
            };
            newValue.push(node);
            boolVal.push(node.itemtype !== "");
            boolVal.push(node.quantity?.toString() !== "");
            boolVal.push(node.budget?.toString() !== "");
          }
          const submitable =
            boolVal.filter((item) => {
              return !item;
            }).length === 0;

          const newProject: Project = {
            name: event.target.elements.name.value,
            items: newValue,
            contactPerson: event.target.elements.conper.value,
            budget: totalBudget,
          };
          submitable && callback(newProject);
          console.log(
            submitable
              ? newProject
              : "Toast: Tolong isi yang wajib (bertanda *)"
          );
        }}
      >
        <div className="flex flex-col">
          <label className="text-sm flex flex-row" htmlFor="name">
            Nama Proyek :{" "}
          </label>
          <div>
            <input id="name" type="text" placeholder="(mis: Raja Brawijaya)" />
          </div>
          <label className="text-sm flex flex-row" htmlFor="conper">
            Contact Person :{" "}
          </label>
          <div>
            <input id="conper" type="text" placeholder="(mis: 089xxxxx)" />
          </div>
          {numberOfItems.map((item) => {
            return (
              <div key={item} className="flex flex-col ">
                <div className="h-2"></div>
                <div className="flex flex-row gap-2">
                  <div>
                    {item === numberOfItems[0] && (
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
                    {item === numberOfItems[0] && (
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
                    {item === numberOfItems[0] && (
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
                    {item === numberOfItems[0] && (
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
                    {item === numberOfItems[0] && (
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
                      name="budgetBarang"
                      className="w-32"
                      type="number"
                      placeholder="(mis:3.000.000)"
                      onFocus={(event) => {
                        setCurrentBudget(
                          parseInt(
                            event.target.value ? event.target.value : "0"
                          )
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
                  <button
                    type="button"
                    onClick={(event) => {
                      if (numberOfItems.length === 1) {
                        //Toast : "Item tidak boleh kosong"
                      } else {
                        event.view.document
                          .getElementsByName("budgetBarang")
                          .forEach((node: any, key) => {
                            if (
                              numberOfItems.findIndex((node) => {
                                return item === node;
                              }) === key
                            )
                              setTotalBudget(
                                totalBudget - parseInt(node.value)
                              );
                          });
                        setNumberOfItems(
                          numberOfItems.filter((node) => {
                            return node !== item;
                          })
                        );
                      }
                      console.log("kugeruu");
                    }}
                    className="text-red-500"
                  >
                    x
                  </button>
                </div>
              </div>
            );
          })}
          <div className="flex flex-row justify-between">
            <button
              type="button"
              onClick={() => {
                setNumberOfItems([
                  ...numberOfItems,
                  numberOfItems[numberOfItems.length - 1] + 1,
                ]);
              }}
            >
              +
            </button>
            <div>Budget Proyek:{totalBudget}</div>
          </div>

          <button type="submit">Tambahkan Proyek</button>
        </div>
      </form>
    </div>
  );
};
export default AddProject;
