import React from "react";
import "./Popup.css";

interface PopupProps {
  id: string | null;
  onClosePopup: () => void;
  children?: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ id, onClosePopup, children }) => {
  const handleClosePopup = () => {
    onClosePopup();
  };

  return (
    <>
      {id !== null && (
        <div className="popup-wrapper">
          <div className="popup-card">
            <div className="popup-card-content flex flex-col items-center">
              {children}
              <button
                id="close-button"
                className="p-2 mt-2 bg-slate-200 w-max"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
          <div className="popup-overlay" onClick={handleClosePopup} />
        </div>
      )}
    </>
  );
};

export default Popup;
