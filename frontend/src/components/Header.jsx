// components/Header.jsx
import React from "react";

const Header = ({ onSave }) => {
  return (
    <header
      style={{
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#007bff",
        color: "#fff",
      }}
    >
      <h2>Workflow Builder</h2>
      <button className="btn btn-light" onClick={onSave}>
        Save & Schedule
      </button>
    </header>
  );
};

export default Header;
