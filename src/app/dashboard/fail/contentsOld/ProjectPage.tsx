import "./GeneralPage.css";
import React, { useState } from "react";
import Table from "@/components/Table"; // Import your custom Table component
import { TProject } from "@/app/types/TProject";
import dummyProjects from "@/app/api/dummyProjects";
import Popup from "@/components/Popup";
import { TPage } from "@/app/types/TPage";

const ProjectPage: React.FC<TPage> = (props) => {
  const [projects, setProject] = useState<TProject[]>(dummyProjects);
  const [editId, setEditId] = useState<number | null>(null);
  const [viewId, setViewId] = useState<number | null>(null);
  // Define your tableColumns array based on your requirements
  const tableColumns = [
    { key: "name", label: "Name" },
    // { key: "items", label: "Barang" },
  ];
  const handleSubmitUpdateProject = (event: any) => {
    event.preventDefault();
    const names = event.target.elements;
    console.log(event.target.elements);

    //To Do : Save Mechanism
  };
  const handleViewDetail = (id: number) => {
    // Handle view detail logic here
    setViewId(id);
  };

  const handleEdit = (id: number) => {
    // Handle edit logic here
    setEditId(id);
  };
  const handleAdd = () => {
    console.log("Add clicked");
    // setAddId(1);
  };

  const handleDelete = async (id: number) => {
    // Handle delete logic here
    // try {
    //   const params = {
    //     subject: "Email Subject",
    //     toEmail: "haqyluppalagi@gmail.com",
    //     otpText: "Your OTP is 123456",
    //   };
    //   await fetch(`/api/api_four`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(params),
    //   });
    //   // console.log(`Item with ID ${id} deleted successfully.`);
    //   // Perform any additional actions after successful deletion
    // } catch (error) {
    //   console.error(error);
    //   // Handle error cases
    // }
  };

  return (
    <div className="general-page">
      <div className="general-page__header">
        <h1 className="general-page__title">Proyek</h1>
        <button className="add-button" onClick={handleAdd}>
          +
        </button>
      </div>
      <Table
        columns={tableColumns}
        data={projects}
        canEdit={props.userType === "boss" || props.userType === "manager"}
        // canDelete={false}
        onViewDetail={handleViewDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Popup id={viewId} onClosePopup={() => setViewId(null)}>
        <div>
          {
            viewId && (
              <div>
                <Table
                  columns={[
                    { key: "name", label: "Name" },
                    { key: "unassignedQuantity", label: "Tersisa" },
                    { key: "assignedQuantity", label: "Dalam Proyek Ini" },
                    { key: "price", label: "Price" },
                  ]}
                  data={projects[viewId - 1].items}
                  onViewDetail={function (itemId: number): void {
                    throw new Error("Function not implemented.");
                  }}
                  onEdit={function (itemId: number): void {
                    throw new Error("Function not implemented.");
                  }}
                  onDelete={function (itemId: number): void {
                    throw new Error("Function not implemented.");
                  }}
                  actionable={false}
                ></Table>
              </div>
            )
            // projects[viewId - 1].items.map((item) => {
            //   return (<div>
            //     {item.name}
            //   </div>);
            // })
          }
        </div>
      </Popup>
      <Popup
        id={editId}
        onClosePopup={function (): void {
          setEditId(null);
        }}
      >
        {editId && (
          <div>
            <form onSubmit={handleSubmitUpdateProject}>
              {projects
                .filter((item) => item.id === editId)[0]
                .items.map((item) => {
                  return (
                    <div className="flex flex-row">
                      <input
                        className="border-solid border-2 border-indigo-100 rounded
                              "
                        id={"name" + item.id.toString()}
                        type="text"
                        defaultValue={item.name}
                        autoFocus
                      ></input>
                      <input
                        className="border-solid border-2 border-indigo-100 rounded
                              "
                        id={"quantity" + item.id.toString()}
                        type="number"
                        defaultValue={item.assignedQuantity}
                      />
                      <input
                        className="border-solid border-2 border-indigo-100 rounded
                              "
                        id={"price" + item.id.toString()}
                        type="number"
                        defaultValue={item.price}
                      />
                    </div>
                  );
                })}

              <button type="submit">Simpan</button>
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default ProjectPage;
