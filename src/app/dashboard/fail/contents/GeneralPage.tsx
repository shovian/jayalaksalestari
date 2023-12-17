import "./GeneralPage.css";
import { useState } from "react";
import { TPage } from "@/app/types/TPage";
import Table from "@/components/Table";
import Popup from "@/components/Popup";
import { useContext } from "react";
import { FirebaseContext } from "@/app/context/FirebaseContext";
import {
  createData,
  deleteData,
  readAllData,
  updateData,
} from "./GeneralHandler";

export default function GeneralPage(props: TPage) {
  const context = useContext(FirebaseContext);
  const [data, setData] = useState(props.table ? props.table.data : []);
  const [addId, setAddId] = useState<string | null>(
    props.addId ? props.addId : null
  );
  const [viewId, setViewId] = useState<string | null>(
    props.viewId ? props.viewId : null
  );
  const [editId, setEditId] = useState<string | null>(
    props.editId ? props.editId : null
  );
  const [deleteId, setDeleteId] = useState<string | null>(
    props.deleteId ? props.deleteId : null
  );
  const handleAdd = props.onAdd
    ? props.onAdd
    : (id: string | null) => {
        setAddId(id);
      };
  const handleView = props.table?.onViewDetail
    ? props.table?.onViewDetail
    : (id: string | null) => {
        setViewId(id);
      };
  const handleEdit = props.table?.onEdit
    ? props.table?.onEdit
    : (id: string | null) => {
        setEditId(id);
      };
  const handleDelete = props.table?.onDelete
    ? props.table?.onDelete
    : (id: string | null) => {
        setDeleteId(id);
      };
  const updateCurrentData = () => {
    props.name &&
      readAllData(props.name, context).then((data) => {
        setData(data);
      });
  };
  const handleSubmitAdd = async (event: any) => {
    event.preventDefault();
    const newValue: any = {};
    props.table?.columns.map((item) => {
      newValue[item.key] = event.target.elements[item.key].value;
    });
    props.name && (await createData(props.name, newValue, context));
    updateCurrentData();
    setAddId(null);
    // console.log(props.name ? "added!" : "name needed"); //soon to be changed to addNode
  };
  const handleSubmitEdit = async (event: any) => {
    event.preventDefault();
    const currentId = editId;
    const newValue: any = {};
    props.table?.columns.map((item) => {
      newValue[item.key] = event.target.elements[item.key].value;
    });
    props.name && (await updateData(props.name, currentId, newValue, context));
    updateCurrentData();
    setEditId(null);
  };
  const handleSubmitDelete = async () => {
    props.name && (await deleteData(props.name, deleteId, context));
    updateCurrentData();
    setDeleteId(null);
  };
  const addComponent = props.addComponent ? (
    props.addComponent
  ) : (
    <div>
      <form onSubmit={handleSubmitAdd}>
        {props.table?.columns.map((item) => {
          return (
            <input
              key={item.key}
              id={item.key}
              placeholder={item.label}
              type="text"
            ></input>
          );
        })}
        <button type="submit">+</button>
      </form>
    </div>
  );
  const viewComponent = props.viewComponent ? (
    props.viewComponent
  ) : (
    <div>view{viewId}</div>
  );
  const editComponent = props.editComponent ? (
    props.editComponent
  ) : (
    <div>
      <form onSubmit={handleSubmitEdit}>
        {editId &&
          props.table?.columns.map((item) => {
            const selectedData = data.filter((item) => {
              return item.id === editId;
            })[0];
            return (
              <input
                key={item.key}
                id={item.key}
                placeholder={item.label}
                type="text"
                defaultValue={selectedData[item.key]}
              ></input>
            );
          })}
        <button type="submit">ubah data!</button>
      </form>
    </div>
  );
  const deleteComponent = props.deleteComponent ? (
    props.deleteComponent
  ) : (
    <div>
      <h2>data ini akan dihapus, lanjutkan?</h2>
      <button onClick={handleSubmitDelete}>delete!</button>
    </div>
  );
  function capitalizeFLetter(word: String) {
    return word[0].toUpperCase() + word.slice(1);
  }

  return (
    <div className="general-page">
      <div className="general-page__header">
        <h1 className="general-page__title">
          {props.name ? capitalizeFLetter(props.name) : ""}
        </h1>
        {props.canAdd && (
          <button className="add-button" onClick={() => handleAdd("create")}>
            +
          </button>
        )}
      </div>
      {props.table && (
        <div>
          <Table
            columns={props.table.columns}
            data={data}
            onViewDetail={
              props.table?.onViewDetail ? props.table?.onViewDetail : handleView
            }
            onEdit={props.table?.onEdit ? props.table?.onEdit : handleEdit}
            onDelete={
              props.table?.onDelete ? props.table?.onDelete : handleDelete
            }
            canViewDetail={props.table.canViewDetail}
            canEdit={props.table.canEdit}
            canDelete={props.table.canDelete}
            actionable={props.table.actionable}
            customAction={props.table.customAction}
            onCustom={props.table.onCustom}
          ></Table>

          <Popup
            id={props.addId ? props.addId : addId}
            onClosePopup={() => {
              handleAdd(null);
            }}
          >
            {addComponent}
          </Popup>
          <Popup
            id={props.viewId ? props.viewId : viewId}
            onClosePopup={() => {
              handleView(null);
            }}
          >
            {viewComponent}
          </Popup>
          <Popup
            id={props.editId ? props.editId : editId}
            onClosePopup={() => {
              handleEdit(null);
            }}
          >
            {editComponent}
          </Popup>
          <Popup
            id={deleteId}
            onClosePopup={() => {
              handleDelete(null);
            }}
          >
            {deleteComponent}
          </Popup>
        </div>
      )}
    </div>
  );
}
