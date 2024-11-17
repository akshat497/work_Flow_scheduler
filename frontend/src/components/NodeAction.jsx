// components/NodeActions.jsx
import React from "react";

const NodeActions = ({ addNewNode, deleteNode, nodes }) => {
  const handleAddNode = (nodeData) => {
    addNewNode(nodeData);
  };

  return (
    <>
      <button
        type="button"
        id="modalTrigger"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      ></button>
      <button
        type="button"
        id="modalTrigger1"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#myModal2"
      ></button>
    </>
  );
};

export default NodeActions;
