import { ITableColumn } from "../../../../(interfaces)/ITableColumn";
import Table from "../../../../(components)/Table";
import { Inventori } from "../(entities)/inventori";
import Popup from "../../../../(components)/Popup";
import { SetStateAction, useEffect, useState } from "react";
import { Barang } from "../(entities)/barang";
import { Proyek } from "../(entities)/proyek";
import { Permohonan } from "../(entities)/permohonan";
import { User } from "../(entities)/user";

export const BarangTable = (props: {
  header: ITableColumn[];
  data: any[];
  custom?: any;
}) => {
  const [detailPopup, setDetailPopup] = useState<string | null>(null);
  const [detailPopupComponent, setDetailPopupComponent] =
    useState<JSX.Element>();
  const [editPopup, setEditPopup] = useState<string | null>(null);
  const [editPopupComponent, setEditPopupComponent] = useState<JSX.Element>();
  const [createPopup, setCreatePopup] = useState<string | null>(null);
  const [createPopupComponent, setCreatePopupComponent] =
    useState<JSX.Element>();
  const [customPopupComponentType, setCustomPopupComponentType] = useState<
    string | null
  >(null);
  const [assign, setAssign] = useState<string | null>("null");
  const [customPopup, setCustomPopup] = useState<string | null>(null);
  const [customPopupComponent, setCustomPopupComponent] =
    useState<JSX.Element>();
  useEffect(() => {
    Proyek.getAllProyek().then((proyeks) => {
      customPopupComponentType === "assign"
        ? setCustomPopupComponent(
            <Popup
              id={assign}
              onClosePopup={() => {
                setCustomPopupComponent(undefined);
              }}
            >
              <div>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    // console.log(e.target.elements[1].value, customPopup); // this should be changed to put barang into project

                    customPopup
                      ? Inventori.putBarangIntoProyek(
                          customPopup,
                          e.target.elements[1].value,
                          e.target.elements[0].value
                        )
                      : {};
                    setCustomPopupComponent(undefined);
                  }}
                  action="submit"
                >
                  <input
                    id="quantity"
                    type="number"
                    placeholder="Jumlah Barang"
                  ></input>
                  <select name="proyek" id="proyek">
                    {proyeks.map((proyek) => {
                      return proyek.namaProyek ? (
                        <option value={proyek.id as string}>
                          {proyek.namaProyek}
                        </option>
                      ) : (
                        <div></div>
                      );
                    })}
                  </select>
                  <button className="text-white bg-slate-500 flex w-full justify-center p-4 rounded-lg my-4">
                    Tambahkan Barang ke Proyek
                  </button>
                </form>
              </div>
            </Popup>
          )
        : customPopupComponentType === "more"
        ? Inventori.getBarangById(customPopup!).then((barang) => {
            Proyek.getNamaProyekById(barang.idProyek).then((namaProyek) => {
              setCustomPopupComponent(
                <div className="flex h-64 bg-slate-800 text-white flex-col p-4 rounded-lg">
                  {Object.keys(barang).map((key) => {
                    return key === "id" ? (
                      ""
                    ) : (
                      <div>
                        {key === "idProyek" ? "Nama Proyek" : key}
                        {" = "}
                        {key === "idProyek" ? namaProyek : (barang as any)[key]}
                      </div>
                    );
                  })}
                </div>
              );
            });
          })
        : {};
    });
  }, [customPopup, customPopupComponentType]);
  useEffect(() => {
    detailPopup &&
      Inventori.getBarangById(detailPopup).then((barang) => {
        setDetailPopupComponent(<div>{barang.description}</div>);
      });
  }, [detailPopup]);
  useEffect(() => {
    const inv = Inventori;
    // console.log(editPopup);

    editPopup &&
      inv.getBarangById(editPopup).then((barang) => {
        setEditPopupComponent(
          <div>
            <form
              action="submit"
              onSubmit={(e: any) => {
                e.preventDefault();
                const barangNew = new Barang();
                const elementValue: any[] = [];
                for (var i = 0; i < 6; i++) {
                  elementValue.push(e.target.elements[i].value);
                }

                Object.keys(barang).map((attr, key) => {
                  attr != "id" && attr != "idProyek"
                    ? ((barangNew as any)[attr] = elementValue[key - 2])
                    : {};
                });
                inv.updateBarangById(barang.id!, barangNew).then(() => {
                  setEditPopup(null);
                  setEditPopupComponent(undefined);
                });
              }}
            >
              {Object.keys(barang).map((attr, key) => {
                return attr != "id" && attr != "idProyek" ? (
                  <input
                    key={key}
                    type="text"
                    defaultValue={(barang as any)[attr]}
                  />
                ) : null;
              })}
              <button>Ubah Data</button>
            </form>
          </div>
        );
      });
  }, [editPopup]);
  useEffect(() => {
    const inv = Inventori;
    // console.log(editPopup);
    const barang: Barang = new Barang();
    barang.name = "";
    barang.itemType = "";
    barang.price = "";
    barang.quantity = "";
    barang.budget = "";
    barang.description = "";

    setCreatePopupComponent(
      <div>
        <form
          action="submit"
          onSubmit={(e: any) => {
            e.preventDefault();

            const barangNew = new Barang();
            Object.keys(barang).map((attr, key) => {
              (barangNew as any)[attr] = e.target.elements[key].value;
            });
            Inventori.createBarang(barangNew);
          }}
        >
          {Object.keys(barang).map((attr, key) => {
            return (
              <input
                key={key}
                type="text"
                defaultValue={(barang as any)[attr]}
                placeholder={attr}
              />
            );
          })}
          <button>Tambahkan Barang</button>
        </form>
      </div>
    );
  }, [createPopup]);
  return (
    <div>
      <Table
        columns={props.header}
        data={props.data}
        onViewDetail={(id) => {
          setDetailPopup(id);
        }}
        onEdit={(id) => {
          setEditPopup(id);
        }}
        onDelete={(id) => {
          Inventori.deleteBarangById(id);
        }}
        onCustom={(id) => {
          setCustomPopup(id);
        }}
        customAction={
          <div className="flex flex-row gap-4 mx-4">
            {props.custom && (
              <div
                onClick={() => {
                  setCustomPopupComponentType("more");
                }}
                title="more"
                className="cursor-pointer"
              >
                {">"}
              </div>
            )}
            <div
              onClick={() => {
                setCustomPopupComponentType("assign");
              }}
              className="cursor-pointer text-slate-800"
            >
              {"+Proyek"}
            </div>
          </div>
        }
      ></Table>
      <button
        onClick={() => {
          setCreatePopup("0");
        }}
        className="text-white bg-slate-500 flex w-full justify-center p-4 rounded-lg my-4"
      >
        Tambah Barang
      </button>
      <Popup
        id={createPopup}
        onClosePopup={function (): void {
          setCreatePopup(null);
        }}
      >
        {createPopupComponent}
      </Popup>
      <Popup
        id={detailPopup}
        onClosePopup={function (): void {
          setDetailPopup(null);
        }}
      >
        {detailPopupComponent}
      </Popup>
      <Popup
        id={editPopup}
        onClosePopup={function (): void {
          setEditPopupComponent(undefined);
          setEditPopup(null);
        }}
      >
        {editPopupComponent}
      </Popup>

      {customPopupComponent && <div>{customPopupComponent}</div>}
    </div>
  );
};
export const ProyekTable = (props: { header: ITableColumn[]; data: any[] }) => {
  const [detailPopup, setDetailPopup] = useState<string | null>(null);
  const [detailPopupComponent, setDetailPopupComponent] =
    useState<JSX.Element>();
  const [createPopup, setCreatePopup] = useState<string | null>(null);
  const [createPopupComponent, setCreatePopupComponent] =
    useState<JSX.Element>();
  const [editPopup, setEditPopup] = useState<string | null>(null);
  const [editPopupComponent, setEditPopupComponent] = useState<JSX.Element>();
  useEffect(() => {
    detailPopup &&
      new Proyek().getBarangsById(detailPopup).then((barangs) => {
        setDetailPopupComponent(
          <div>
            <div>Barang pada proyek ini:</div>
            {barangs.map((barang, key) => {
              return (
                <div className="flex items-center gap-2" key={key}>
                  <div className="flex w-full">
                    {key + 1}. {barang.name}
                    {" ("}
                    {barang.quantity}
                    {" Unit)"}
                  </div>
                  <div
                    onClick={() => {
                      const inv = Inventori;
                      // console.log(editPopup);

                      barang.id &&
                        inv.getBarangById(barang.id).then((barang) => {
                          setDetailPopupComponent(
                            <div>
                              <form
                                action="submit"
                                onSubmit={(e: any) => {
                                  e.preventDefault();
                                  const barangNew = new Barang();
                                  Object.keys(barang).map((attr, key) => {
                                    attr != "id"
                                      ? ((barangNew as any)[attr] =
                                          e.target.elements[key].value)
                                      : null;
                                  });
                                  inv
                                    .updateBarangById(barang.id!, barangNew)
                                    .then(() => {
                                      setDetailPopup(null);
                                      setDetailPopupComponent(undefined);
                                    });
                                }}
                              >
                                {Object.keys(barang).map((attr, key) => {
                                  return attr != "id" && attr != "idProyek" ? (
                                    <input
                                      key={key}
                                      type="text"
                                      title={attr}
                                      defaultValue={(barang as any)[attr]}
                                    />
                                  ) : null;
                                })}
                                <button className="p-2 mt-2 bg-slate-200 rounded-lg">
                                  Ubah Data
                                </button>
                              </form>
                            </div>
                          );
                        });
                    }}
                    className="bg-slate-200 p-2 rounded-lg cursor-pointer"
                  >
                    Edit
                  </div>
                </div>
              );
            })}
          </div>
        );
      });
    // new Proyek().getBarangById(detailPopup).then((barang) => {
    // });
  }, [detailPopup]);
  useEffect(() => {
    Proyek.getAllProyek().then((proyeks) => {
      // console.log(editPopup);
      const proyek = proyeks.filter((proyek) => {
        return proyek.id === editPopup;
      })[0];
      editPopup &&
        setEditPopupComponent(
          <div>
            <form
              action="submit"
              onSubmit={(e: any) => {
                e.preventDefault();
                const proyekNew = new Proyek();
                Object.keys(proyek).map((attr, key) => {
                  (proyekNew as any)[attr] = e.target.elements[key].value;
                });
                Proyek.updateProyekById(proyek.id!, proyekNew).then(() => {
                  setEditPopup(null);
                  setEditPopupComponent(undefined);
                });
              }}
            >
              {Object.keys(proyek).map((attr, key) => {
                return (
                  <input
                    key={key}
                    type="text"
                    defaultValue={(proyek as any)[attr]}
                  />
                );
              })}
              <button>Ubah Data</button>
            </form>
          </div>
        );
    });
  }, [editPopup]);
  useEffect(() => {
    // console.log(editPopup);
    const proyek: Proyek = new Proyek();
    proyek.namaProyek = "";
    proyek.cp = "";
    proyek.budgetProyek = "";
    setCreatePopupComponent(
      <div>
        <form
          action="submit"
          onSubmit={(e: any) => {
            e.preventDefault();
            const proyekNew = new Proyek();
            Object.keys(proyek).map((attr, key) => {
              (proyekNew as any)[attr] = e.target.elements[key].value;
            });
            Proyek.createProyek(proyekNew);
          }}
        >
          {Object.keys(proyek).map((attr, key) => {
            return (
              <input
                key={key}
                type="text"
                defaultValue={(proyek as any)[attr]}
                placeholder={attr}
              />
            );
          })}
          <button>Tambahkan Proyek</button>
        </form>
      </div>
    );
  }, [createPopup]);
  return (
    <div>
      <Table
        columns={props.header}
        data={props.data}
        onViewDetail={(id) => {
          setDetailPopup(id);
        }}
        onEdit={(id) => {
          setEditPopup(id);
        }}
        onDelete={(id) => {
          Proyek.deleteProyekById(id);
          // new Proyek().deleteBarangById(id);
        }}
      ></Table>
      {User.getCurrentUserRole() === "pemilik" && (
        <button
          onClick={() => {
            setCreatePopup("0");
          }}
          className="text-white bg-slate-500 flex w-full justify-center p-4 rounded-lg my-4"
        >
          Tambah Proyek
        </button>
      )}
      <Popup
        id={createPopup}
        onClosePopup={function (): void {
          setCreatePopup(null);
        }}
      >
        {createPopupComponent}
      </Popup>
      <Popup
        id={detailPopup}
        onClosePopup={function (): void {
          setDetailPopup(null);
        }}
      >
        {detailPopupComponent}
      </Popup>
      <Popup
        id={editPopup}
        onClosePopup={function (): void {
          setEditPopupComponent(undefined);
          setEditPopup(null);
        }}
      >
        {editPopupComponent}
      </Popup>
    </div>
  );
};
export const AbsensiTable = () => {
  return (
    <Table
      columns={[
        { label: "Nama Karyawan", key: "nama" },
        { label: "Status Absensi", key: "status" },
        { label: "Tanggal", key: "date" },
      ]}
      data={[]}
      actionable={false}
    ></Table>
  );
};
export const PengajuanTable = (props: { role?: String }) => {
  const [forceRerender, setForceRerender] = useState(true);
  const [data, setData] = useState<Permohonan[]>([]);
  const [shownData, setShownData] = useState<any[]>([]);
  const [barangDiajukanLength, setBarangDiajukanLength] = useState([0]);
  const [tambahData, setTambahData] = useState<string | null>(null);
  const [keperluanOrBarang, setKeperluanOrBarang] = useState<boolean[]>([]);
  const [barangs, setBarangs] = useState<Barang[]>([]);
  const [customPopup, setCustomPopup] = useState<string | null>(null);

  useEffect(() => {
    customPopup &&
      Permohonan.getPermohonanById(customPopup as String).then((permohonan) => {
        permohonan.setStatus(
          props.role === "adminkeuangan"
            ? "Didanai"
            : props.role === "pemilik"
            ? "Disetujui"
            : "Diajukan"
        );
      });
  }, [customPopup]);
  useEffect(() => {
    Permohonan.subscribeDatabase(setData);
    Inventori.getAllBarangs().then((barangs) => {
      setBarangs(barangs);
    });
  }, []);
  useEffect(() => {
    const tempUserArray: SetStateAction<any[]> = [];
    data.map((node, key) => {
      node.idUser
        ? User.getUserById(node.idUser).then((user) => {
            const tempData = {
              ...node,
              pengaju: user.username,
              pengajuanDate: (node.pengajuanDate as Date).toDateString(),
            };
            tempUserArray.push(tempData);
            data.length === tempUserArray.length
              ? setShownData(tempUserArray)
              : {};
          })
        : {};
      // setShownData({})
    });
  }, [data]);

  return (
    <div>
      <Table
        columns={[
          { label: "Tanggal Pengajuan", key: "pengajuanDate" },
          { label: "Total Dana", key: "totalDana" },
          { label: "Nama Pengaju", key: "pengaju" },
          { label: "Status", key: "status" },
        ]}
        data={shownData}
        actionable={true}
        canEdit={false}
        canDelete={false}
        onCustom={(id) => {
          setCustomPopup(id);
        }}
        customAction={
          props.role && (
            <div className="mx-2 text-slate-800 cursor-pointer">
              {props.role === "adminkeuangan"
                ? "Konfirmasi Transfer"
                : props.role === "pemilik"
                ? "Setujui"
                : ""}
            </div>
          )
        }
      ></Table>

      {props.role === undefined && (
        <button
          className="flex w-full bg-slate-500 p-4 justify-center items-center text-white rounded-lg mt-4"
          onClick={() => {
            setTambahData("0");
          }}
        >
          Buat Pengajuan
        </button>
      )}

      <Popup
        id={customPopup}
        onClosePopup={function () {
          setCustomPopup(null);
        }}
      ></Popup>

      <Popup
        id={tambahData}
        onClosePopup={function (): void {
          setBarangDiajukanLength([0]);
          setTambahData(null);
        }}
      >
        <div>
          <form
            className="grid grid-cols-3"
            onSubmit={(e: any) => {
              e.preventDefault();
              const data: any[] = [];
              const dataLength = e.target.elements.length;
              for (var i = 0; i < dataLength - 2; i++) {
                data.push(e.target.elements[i].value);
                console.log(e.target.elements[i].value);
              }
              Permohonan.getPermohonanById(tambahData as String).then(
                (permohonan: Permohonan) => {
                  permohonan.setLinkDoc(JSON.stringify(data));
                }
              );
              //please add more mechanisms here
            }}
          >
            {barangDiajukanLength.map((v, k) => {
              var a = 0;
              keperluanOrBarang[k] = true;
              return (
                <>
                  <select
                    onChange={(e: any) => {
                      a = e.target.selectedIndex;
                      const tempKOrB = keperluanOrBarang;
                      tempKOrB[k] = a === 0;
                      setKeperluanOrBarang(tempKOrB);
                      setForceRerender((prevState) => !prevState);
                    }}
                    name="Barang/Keperluan"
                    id=""
                  >
                    <option value="barang">Barang</option>
                    <option value="keperluan">Keperluan Lain</option>
                  </select>
                  {keperluanOrBarang[k] ? (
                    <select>
                      {barangs.map((barang, key) => {
                        return <option key={key}>{barang.name}</option>;
                      })}
                    </select>
                  ) : (
                    <input
                      key={k.toString() + "keperluan"}
                      type="text"
                      placeholder="Keperluan"
                    />
                  )}
                  <input
                    key={k.toString() + "fee"}
                    type="text"
                    placeholder="Biaya"
                  />
                </>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setBarangDiajukanLength([...barangDiajukanLength, 0]);
              }}
            >
              +Barang/Keperluan
            </button>
            <button type="submit">Save</button>
          </form>
        </div>
      </Popup>
    </div>
  );
};
