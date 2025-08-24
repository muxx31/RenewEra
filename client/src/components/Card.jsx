import React from "react";

const Card = ({ item, onNotifyToggle, isNotified }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 flex justify-between items-center mb-4">
      <div>
        <h3 className="font-bold">{item.title || item.materialType}</h3>
        <p>{item.description || item.additionalDetails}</p>
        {item.weight && <p>Weight: {item.weight} kg</p>}
        {item.minimumWeight && <p>Minimum Weight: {item.minimumWeight} kg</p>}
      </div>
      {onNotifyToggle && (
        <button
          onClick={() => onNotifyToggle(item._id)}
          className={`px-4 py-2 rounded ${
            isNotified ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {isNotified ? "Unnotify" : "Notify"}
        </button>
      )}
    </div>
  );
};

export default Card;
