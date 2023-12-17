import React, { useState } from "react";
import Table from "@/components/Table";
import "./GeneralPage.css";
import dummyData from "@/app/api/dummyData";
import { TInventoryItem } from "@/app/types/TInventoryItem";
import Popup from "@/components/Popup";
import { TPage } from "@/app/types/TPage";

const FundRequestPage: React.FC<TPage> = (props) => {
  const handleViewDetail = () => {
    console.log("View detail clicked");
  };
  const handleAdd = () => {
    console.log("Add clicked");
    setAddId(1);
  };
  const nodeExist = (name: String) => {
    const isExist =
      inventoryItems.filter((item) => item.name === name).length > 0;
    return isExist;
  };
  const addItem = (newItem: TInventoryItem) => {
    setInventoryItems([...dummyData, newItem]);
  };
  const updateItem = (newItem: TInventoryItem) => {
    const updatedData = dummyData.filter((item) => item.name !== newItem.name);
    setInventoryItems([...updatedData, newItem]);
  };
  const handleAddItems = (event: any) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const quantityBought: number = event.target.elements.quantity.value;
    const price: number = event.target.elements.price.value;

    console.log(nodeExist(name));
    if (nodeExist(name)) {
      const existingItem: TInventoryItem = inventoryItems.filter(
        (item) => item.name === name
      )[0];

      const totalQuantity: number =
        existingItem.unassignedQuantity - -1 * quantityBought;
      const newItem: TInventoryItem = {
        id: existingItem.id,
        name: name,
        assignedQuantity: existingItem.assignedQuantity,
        unassignedQuantity: totalQuantity,
        price: price,
      };
      updateItem(newItem);
    } else {
      const newItem: TInventoryItem = {
        id: inventoryItems.length + 1,
        name: name,
        assignedQuantity: 0,
        unassignedQuantity: quantityBought,
        price: price,
      };
      addItem(newItem);
    }

    handleCloseAdd();
    //   const newData : TInventoryItem= {
    //     id: 3,
    //     name: value.name,
    //     assignedQuantity: 10,
    //     unassignedQuantity: -5+value.quantity,
    //     price: value.price,
    // }
    //   setInventoryItems([...dummyData,newData])
  };
  const handleCloseAdd = () => {
    setAddId(null);
  };
  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };
  const [addId, setAddId] = useState<number | null>(null);
  const [inventoryItems, setInventoryItems] =
    useState<TInventoryItem[]>(dummyData);

  const tableColumns = [
    { key: "createdDate", label: "Tanggal" },
    { key: "nominal", label: "Nominal" },
    { key: "description", label: "Kepentingan" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="general-page">
      <div className="general-page__header">
        <h1 className="general-page__title">Pengajuan Dana</h1>
        <button className="add-button" onClick={handleAdd}>
          +
        </button>
      </div>
      <Table
        columns={tableColumns}
        data={inventoryItems}
        onViewDetail={handleViewDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Popup onClosePopup={handleCloseAdd} id={addId}>
        <div>Tambahkan Barang</div>
        {inventoryItems
          .filter((item) => item.unassignedQuantity < 0)
          .map((item) => {
            return (
              <div>
                <div>
                  {item.name} butuh {item.unassignedQuantity * -1} item
                </div>
              </div>
            );
          })}
        <form onSubmit={handleAddItems}>
          <input placeholder="Nama Produk" id="name" type="text"></input>
          <input
            placeholder="Jumlah Produk"
            id="quantity"
            type="number"
          ></input>
          <input placeholder="Harga Produk" id="price" type="number" />
          <button className="add-button" type="submit">
            +
          </button>
        </form>
      </Popup>
    </div>
  );
};

export default FundRequestPage;
