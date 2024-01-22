import { ITableColumn } from "../../../../(interfaces)/ITableColumn";
import Table from "../../../../(components)/Table";
import { Inventori } from "../(entities)/inventori";
import Popup from "../../../../(components)/Popup";
import { SetStateAction, useEffect, useState } from "react";
import { Barang } from "../(entities)/barang";
import { Proyek } from "../(entities)/proyek";
import { Permohonan } from "../(entities)/permohonan";
import { User } from "../(entities)/user";
import { Absensi } from "../(entities)/absensi";
import { Timestamp } from "firebase/firestore";
import ImageUploading, { ImageListType } from "react-images-uploading";

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
                    const idBarang = customPopup;
                    const idProyek = e.target.elements[1].value;
                    // console.log(idProyek);

                    idBarang
                      ? Inventori.putBarangIntoProyek(
                          idBarang,
                          idProyek,
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
            barangNew["idProyek"] = "";
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
            {/* <div
              onClick={() => {
                setCustomPopupComponentType("assign");
              }}
              className="cursor-pointer text-slate-800"
            >
              {"+Proyek"}
            </div> */}
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
  const [putBarang, setputBarang] = useState<string | null>(null);
  const [barangs, setBarangs] = useState<Barang[]>([]);

  useEffect(() => {
    Inventori.getAllBarangs().then((barangs) => {
      setBarangs(barangs);
    });
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
            <button
              className="bg-slate-200 p-4 rounded-md"
              onClick={() => {
                setputBarang(detailPopup);
                console.log(putBarang);
              }}
            >
              {"Tambahkan Barang ke Proyek Ini"}
            </button>
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
      <Popup
        id={putBarang}
        onClosePopup={() => {
          setputBarang(null);
        }}
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={(e: any) => {
            e.preventDefault();
            // console.log(e.target.elements[1].value, customPopup); // this should be changed to put barang into project
            const idProyek = putBarang;
            const idBarang = e.target.elements[1].value;
            // console.log(idProyek);

            idProyek
              ? Inventori.putBarangIntoProyek(
                  idBarang,
                  idProyek,
                  e.target.elements[0].value
                )
              : {};
            setputBarang(null);
          }}
          action="submit"
        >
          <input
            id="quantity"
            type="number"
            placeholder="Jumlah Barang"
          ></input>
          <select name="barang" id="barang">
            {barangs.map((barang) => {
              return barang.name ? (
                <option value={barang.id as string}>{barang.name}</option>
              ) : (
                <div></div>
              );
            })}
          </select>
          <button className="text-white bg-slate-500 flex w-full justify-center p-4 rounded-lg my-4">
            Tambahkan Barang ke Proyek
          </button>
        </form>
      </Popup>
    </div>
  );
};
export const AbsensiTable = () => {
  const [data, setData] = useState([]);
  const [shownData, setShownData] = useState([]);

  useEffect(() => {
    Absensi.subscribeDatabase(setData);
  }, []);
  useEffect(() => {
    const tempData: any = [];
    data.map((doc: any, k: number) => {
      // console.log(k, doc);
      doc &&
        User.getNamaById(doc.idKaryawan as string).then((nama) => {
          const tempDoc = doc;
          tempDoc["nama"] = nama;
          const tempDate = doc.date as Timestamp;
          tempDoc["date"] = tempDate.toDate().toUTCString();
          tempData.push(tempDoc);
          if (k == data.length - 1) {
            setShownData(tempData);
          }
        });
    });
  }, [data]);
  return (
    <Table
      columns={[
        { label: "Nama Karyawan", key: "nama" },
        { label: "Status Absensi", key: "status" },
        { label: "Tanggal", key: "date" },
      ]}
      data={shownData}
      actionable={false}
    ></Table>
  );
};
export const PengajuanTable = (props: { role?: String }) => {
  const [forceRerender, setForceRerender] = useState(true);
  const [images, setImages] = useState<ImageListType>([]);
  const [data, setData] = useState<Permohonan[]>([]);
  const [shownData, setShownData] = useState<any[]>([]);
  const [barangDiajukanLength, setBarangDiajukanLength] = useState([0]);
  const [tambahData, setTambahData] = useState<string | null>(null);
  const [keperluanOrBarang, setKeperluanOrBarang] = useState<boolean[]>([]);
  const [barangs, setBarangs] = useState<Barang[]>();
  const [namaProyeks, setNamaProyeks] = useState<String[]>();
  const [customPopup, setCustomPopup] = useState<string | null>(null);
  const [ViewDetail, setViewDetail] = useState<string | null>(null);
  const [currentPermohonanStatus, setCurrentPermohonanStatus] =
    useState<String | null>(null);
  useEffect(() => {
    Permohonan.subscribeDatabase(setData);
    Inventori.getAllBarangs().then((barangs) => {
      setBarangs(barangs);
      const tempNamaProyeks: String[] = [];
      barangs?.forEach((barang) => {
        Proyek.getNamaProyekById(barang.idProyek).then((namaProyek) => {
          tempNamaProyeks.push(namaProyek);
          if (barangs?.length === tempNamaProyeks.length)
            setNamaProyeks(tempNamaProyeks);
        });
      });
    });
  }, []);
  useEffect(() => {
    customPopup &&
      Permohonan.getPermohonanById(customPopup as String).then((permohonan) => {
        setCurrentPermohonanStatus(permohonan.status || null);
        const tempImages = permohonan.bukti
          ? JSON.parse(permohonan.bukti as string)
          : [];
        setImages(tempImages);
        if (props.role === "adminkeuangan") {
          User.getUserById(permohonan.idUser as string).then((user) => {
            user.saldo = permohonan.totalDana;
          });
        } else if (props.role === "staffgudang") {
        }
        switch (props.role) {
          case "adminkeuangan": {
            permohonan.status === "Disetujui" &&
              permohonan.setStatus("Dana Terkirim");
            break;
          }
          case "pemilik": {
            permohonan.status === "Diajukan" &&
              permohonan.setStatus("Disetujui");
            break;
          }
        }
      });
  }, [customPopup]);
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
  var danaTerpakai: String;
  return namaProyeks ? (
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
        onViewDetail={(id) => {
          Permohonan.getPermohonanById(id).then((permohonan) => {
            const tempImages = permohonan.bukti
              ? JSON.parse(permohonan.bukti as string)
              : [];
            setImages(tempImages);
            setViewDetail(id);
            console.log(tempImages);
          });
        }}
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
                : "Upload Nota"}
            </div>
          )
        }
      />

      {props.role === "staffgudang" && (
        <button
          className="flex w-full bg-slate-500 p-4 justify-center items-center text-white rounded-lg mt-4"
          onClick={() => {
            setTambahData("occupied");
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
      >
        {props.role === "staffgudang" ? (
          currentPermohonanStatus === "Dana Terkirim" ? (
            <div>
              <ImageUploading
                multiple
                value={images}
                onChange={(imageList, addUpdateIndex) => {
                  setImages(imageList);
                }}
                maxNumber={10}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <div
                    key={"imglist"}
                    className="upload__image-wrapper flex flex-col max-h-[500px] overflow-auto items-center"
                  >
                    {imageList.map((image, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center image-item"
                      >
                        <img
                          key={index}
                          className="opacity-1 transition-all hover:opacity-0"
                          src={image["data_url"]}
                          onClick={() => {
                            const newImage = new Image();
                            newImage.src = image["data_url"];
                            const w = window.open("");
                            w!.document.write(newImage.outerHTML);
                          }}
                          alt=""
                          width="100"
                        />
                        <div key={index} className="image-item__btn-wrapper">
                          <button onClick={() => onImageUpdate(index)}>
                            Ganti Foto
                          </button>
                          <button
                            className="mx-4 text-red-500"
                            onClick={() => onImageRemove(index)}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className="flex flex-col items-center border-2 p-5 rounded-lg"
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Tambahkan Nota
                      <img
                        height={100}
                        width={100}
                        src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"
                      ></img>
                    </button>
                    <input
                      onChange={(e: any) => {
                        danaTerpakai = e.target.value;
                      }}
                      type="text"
                      placeholder="Dana Terpakai"
                    ></input>
                    <div>
                      <button
                        onClick={() => {
                          Permohonan.getPermohonanById(customPopup!).then(
                            (permohonan) => {
                              User.getUserById(
                                permohonan.idUser as string
                              ).then((user) => {
                                const currentSaldo = parseInt(
                                  (user.saldo || "0") as string
                                );
                                const saldoTerpakai = parseInt(
                                  (danaTerpakai || "0") as string
                                );
                                user.setSaldo(
                                  (currentSaldo - saldoTerpakai).toString()
                                );
                              });
                              permohonan.setBukti(JSON.stringify(imageList));
                            }
                          );
                          setCustomPopup(null);
                        }}
                        className="bg-slate-200 p-2 rounded-lg"
                      >
                        Upload Semua Nota
                      </button>
                    </div>
                  </div>
                )}
              </ImageUploading>
            </div>
          ) : (
            <div>Dana belum terkirim!</div>
          )
        ) : (
          <div></div>
        )}
      </Popup>
      <Popup
        id={ViewDetail}
        onClosePopup={function () {
          setViewDetail(null);
        }}
      >
        <div>
          <ImageUploading
            multiple
            value={images}
            onChange={(imageList, addUpdateIndex) => {
              console.log(imageList, addUpdateIndex);
              setImages(imageList);
            }}
            maxNumber={10}
            dataURLKey="data_url"
          >
            {({ imageList }) => (
              <div
                key={"imglist"}
                className="upload__image-wrapper flex flex-col max-h-[500px] overflow-auto items-center"
              >
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center image-item"
                  >
                    <img
                      key={index}
                      className="opacity-1 transition-all hover:opacity-0"
                      src={image["data_url"]}
                      onClick={() => {
                        const newImage = new Image();
                        newImage.src = image["data_url"];
                        const w = window.open("");
                        w!.document.write(newImage.outerHTML);
                      }}
                      alt=""
                      width="300"
                    />
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>
      </Popup>
      <Popup
        id={tambahData}
        onClosePopup={function (): void {
          setBarangDiajukanLength([0]);
          setTambahData(null);
        }}
      >
        <div>
          <form
            className="grid grid-cols-4"
            onSubmit={(e: any) => {
              e.preventDefault();
              const data: any[] = [];
              const newPermohonan = new Permohonan();
              const dataLength = e.target.elements.length;
              const biayas: number[] = [0];
              const barangs: String[] = [];
              var barangId = "-1";
              for (var i = 0; i < dataLength - 2; i++) {
                data.push(e.target.elements[i].value);
                const val = e.target.elements[i].value;
                i % 4 === 0 && val === "barang" ? (barangId = "1") : {};
                i % 4 === 1 && barangId === "1" ? (barangId = val) : {};
                console.log(val);

                i % 4 === 2 && barangId != "-1"
                  ? Inventori.getBarangById(barangId).then((barang) => {
                      const price = (
                        parseInt(val) / parseInt(barang.quantity as string)
                      ).toString();
                      console.log(barangId);
                      delete barang["id"];
                      barang["price"] = price;
                      console.log(barang);
                      Inventori.updateBarangById(barangId, {
                        price: price,
                      }).then(() => {
                        barangId = "-1";
                      });
                    })
                  : {};
                i % 4 === 2 ? (biayas[0] += parseInt(val)) : {};
              }

              newPermohonan["idUser"] = User.getCurrentUserId() || undefined;
              newPermohonan["pengajuanDate"] = Timestamp.fromDate(new Date());
              newPermohonan["totalDana"] = biayas[0].toString();
              newPermohonan["status"] = "Diajukan";
              User.getUserById(newPermohonan.idUser as String).then((user) => {
                user.setSaldo(biayas[0].toString());
              });
              Permohonan.createPermohonan(newPermohonan).then((id) => {
                Permohonan.getPermohonanById(id as String).then(
                  (permohonan: Permohonan) => {
                    // console.log(permohonan);

                    permohonan.setLinkDoc(JSON.stringify(data));
                  }
                );
              });
              setTambahData(null);
            }}
          >
            {barangDiajukanLength.map((v, k) => {
              var a = 0;
              if (keperluanOrBarang[k] == undefined)
                keperluanOrBarang[k] = true;

              return (
                <>
                  <select
                    onChange={(e: any) => {
                      a = e.target.selectedIndex;
                      const tempKOrB = keperluanOrBarang;
                      tempKOrB[k] = a === 0;
                      setKeperluanOrBarang(tempKOrB);
                      keperluanOrBarang[k] == true
                        ? (barangDiajukanLength[k] = 0)
                        : (barangDiajukanLength[k] = -1);
                      console.log(namaProyeks);

                      setBarangDiajukanLength(barangDiajukanLength);
                      setForceRerender((prevState) => !prevState);
                    }}
                    name="Barang/Keperluan"
                    key={k}
                  >
                    <option value="barang">Barang</option>
                    <option value="keperluan">Keperluan Lain</option>
                  </select>
                  {keperluanOrBarang[k] == true ? (
                    <select
                      onChange={(e: any) => {
                        barangDiajukanLength[k] = e.target.selectedIndex;
                        const tempDiajukan = barangDiajukanLength;
                        console.log(tempDiajukan);
                        setBarangDiajukanLength(tempDiajukan);
                        setForceRerender((prevState) => !prevState);
                      }}
                    >
                      {barangs?.map((barang, key) => {
                        return (
                          <option value={barang.id as string} key={key}>
                            {barang.name}
                          </option>
                        );
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
                  <input
                    readOnly
                    key={k.toString() + "proyek"}
                    value={
                      barangDiajukanLength[k] != -1
                        ? (namaProyeks[barangDiajukanLength[k]] as string)
                        : ""
                    }
                  ></input>
                </>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setBarangDiajukanLength([...barangDiajukanLength, -1]);
              }}
            >
              +Barang/Keperluan
            </button>
            <button type="submit">Save</button>
          </form>
        </div>
      </Popup>
    </div>
  ) : (
    <div />
  );
};
export const SaldoTable = () => {
  const [shownData, setShownData] = useState<any[]>([]);
  useEffect(() => {
    User.getUsersByRole("staffgudang").then((users) => {
      const tempData: any[] = [];
      users.forEach((user) => {
        tempData.push({ name: user.username, saldo: user.saldo });
      });
      setShownData(tempData);
    });
  }, []);
  return (
    <div>
      <Table
        columns={[
          { label: "Nama Staff", key: "name" },
          { label: "Saldo", key: "saldo" },
        ]}
        data={shownData}
        actionable={false}
      ></Table>
    </div>
  );
};
