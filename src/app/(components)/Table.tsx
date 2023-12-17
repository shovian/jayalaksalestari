import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Table.css";
import Pagination from "./Pagination";
import { ITable } from "@/app/(interfaces)/ITable";

const Table: React.FC<ITable> = ({
  columns,
  data,
  onViewDetail = function (itemId: any): void {
    throw new Error("Function not implemented.");
  },
  onEdit = function (itemId: any): void {
    throw new Error("Function not implemented.");
  },
  onDelete = function (itemId: any): void {
    throw new Error("Function not implemented.");
  },
  onCustom = function (itemId: any): void {
    throw new Error("Function not implemented.");
  },
  actionable = true,
  canEdit = true,
  canViewDetail = true,
  canDelete = true,
  customAction,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page as needed

  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handlePaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const column = columns.find((col) => col.key === sortColumn);
    if (column) {
      const { key } = column;
      const valueA = a[key];
      const valueB = b[key];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
    }
    return 0;
  });

  // Calculate indexes for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleViewDetail = (itemId: any) => {
    // setSelectedItemId(itemId);
    onViewDetail(itemId);
  };
  const handleCustom = (itemId: any) => {
    onCustom(itemId);
  };

  // const handleClosePopup = () => {
  //   setSelectedItemId(null);
  // };

  const handleEdit = (itemId: any) => {
    onEdit(itemId);
  };

  const handleDelete = (itemId: any) => {
    onDelete(itemId);
  };

  function render(data: any): React.ReactNode {
    switch (typeof data) {
      case "object": {
        // if (Array.isArray(data)) {
        //   const arr: any[] = data;
        //   return (
        //     <div className="flex flex-col">
        //       {arr.map((item) => {
        //         return <div key={item.id}>{render(item)}</div>;
        //       })}
        //     </div>
        //   );
        // } else {
        //   const obj: Object = data;
        //   console.log(Object.entries(obj));
        //   return <div>{render(Object.entries(obj))}</div>;
        // }
        return "Klik tombol mata untuk melihat detail";
      }
      default: {
        return data;
      }
    }
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} onClick={() => handleSort(column.key)}>
                {column.label}
                {sortColumn === column.key && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            ))}
            {actionable && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={`${item.id}-${column.key}`}>
                  {render(item[column.key])}
                </td>
              ))}
              {actionable && (
                <td>
                  <div className="flex flex-row">
                    {
                      <div onClick={() => handleCustom(item.id)}>
                        {customAction}
                      </div>
                    }
                    {canViewDetail && (
                      <button
                        onClick={() => handleViewDetail(item.id)}
                        title="View Detail"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    )}
                    {canEdit && (
                      <button
                        onClick={() => handleEdit(item.id)}
                        style={{ marginLeft: "0.5rem" }}
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{ marginLeft: "0.5rem", color: "red" }}
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={sortedData.length}
        currentPage={currentPage}
        paginate={handlePaginate}
      />
      {/* {selectedItemId !== null && (
        <div className="popup-wrapper">
          <div className="popup-card">
            <div className="popup-card-content">
              <h2>Item Details</h2>
              <p>ID: {selectedItemId}</p>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
          <div className="popup-overlay" onClick={handleClosePopup} />
        </div>
      )} */}
    </div>
  );
};

export default Table;
