import React, { useState, useEffect } from "react";

const EditNodeModal = ({ onSaveEdit, nodeData }) => {
  const [editedData, setEditedData] = useState({});

  // Update local state when nodeData changes
  useEffect(() => {
    if (nodeData) {
      setEditedData(nodeData);
    }
  }, [nodeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };
  useEffect(()=>{
    console.log(editedData)
  },[editedData])
  const handleSave = () => {
    onSaveEdit(editedData);
  };

  return (
    <div
      className="modal fade"
      id="editNodeModal"
      tabIndex="-1"
      aria-labelledby="editNodeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editNodeModalLabel">Edit Node</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* Email Node Fields */}
            {editedData.to && (
              <>
                <div className="mb-3">
                  <label htmlFor="editSubject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="editSubject"
                    name="subject"
                    value={editedData.subject || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editBody" className="form-label">Body</label>
                  <textarea
                    id="editBody"
                    name="body"
                    value={editedData.body || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </>
            )}

            {/* Delay Node Fields */}
            {editedData.waitFor && (
              <div className="mb-3">
                <label htmlFor="editWaitTime" className="form-label">Wait Time</label>
                <input
                  type="text"
                  id="editWaitTime"
                  name="waitFor"
                  value={editedData.waitFor || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNodeModal;
