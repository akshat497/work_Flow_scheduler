import React, { useState } from "react";

function AddNewNodeModal({ onAddNode, nodesCount }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showWaitForm, setShowWaitForm] = useState(false); // State for the Wait form
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: "",
  });
  const [waitData, setWaitData] = useState({
    waitFor: "",
    waitType: "hours",
  });

  const handleColdEmailClick = () => {
    setShowEmailForm(true);
    setShowWaitForm(false);
  };

  const handleWaitDelayClick = () => {
    setShowWaitForm(true);
    setShowEmailForm(false);
  };

  const handleBackClick = () => {
    setShowEmailForm(false);
    setShowWaitForm(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (showEmailForm) {
      setEmailData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    } else if (showWaitForm) {
      setWaitData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleAddEmail = () => {
    onAddNode(emailData);
    setShowEmailForm(false);
    setEmailData({ to: "", subject: "", body: "" });
  };

  const handleAddWait = () => {
    onAddNode(waitData);
    setShowWaitForm(false);
    setWaitData({ waitFor: "", waitType: "hours" });
  };

  return (
    <div
      className="modal fade"
      id="myModal2"
      tabIndex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="myModalLabel">
              {showEmailForm
                ? "Cold Email Template"
                : showWaitForm
                ? "Wait Delay"
                : "Add a Source Block"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {showEmailForm ? (
              <div>
                <div>
                  <label htmlFor="to">To:</label>
                  <input
                    type="email"
                    id="to"
                    className="form-control"
                    placeholder="Enter recipient email"
                    value={emailData.to}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="subject">Subject:</label>
                  <input
                    type="text"
                    id="subject"
                    className="form-control"
                    placeholder="Enter email subject"
                    value={emailData.subject}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="body">Email Body:</label>
                  <textarea
                    id="body"
                    className="form-control"
                    rows="5"
                    placeholder="Enter email body"
                    value={emailData.body}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-secondary mt-3"
                    onClick={handleBackClick}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleAddEmail}
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : showWaitForm ? (
              <div>
                <div>
                  <label htmlFor="waitFor">Wait For:</label>
                  <input
                    type="number"
                    id="waitFor"
                    className="form-control"
                    placeholder="Enter duration"
                    value={waitData.waitFor}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="waitType">Wait Type:</label>
                  <select
                    id="waitType"
                    className="form-control"
                    value={waitData.waitType}
                    onChange={handleInputChange}
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="minutes">Minutes</option>
                    <option value="seconds">Seconds</option>
                  </select>
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-secondary mt-3"
                    onClick={handleBackClick}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleAddWait}
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p>
                  Pick a block & configure, any new leads that match rules will
                  be added to sequence automatically.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                    marginTop: "20px",
                  }}
                >
                  <div className="source-block" onClick={handleColdEmailClick}>
                    Cold Email
                    <br />
                    <small>Send an email to a lead</small>
                  </div>
                  <div className="source-block">
                    Task
                    <br />
                    <small>Send a task</small>
                  </div>
                  <div className="d-flex" style={{ width: "100%" }}>
                    <strong>Conditions</strong>
                  </div>
                  {nodesCount > 3 && (
                    <>
                      <div
                        className="source-block"
                        onClick={handleWaitDelayClick}
                      >
                        Wait
                        <br />
                        <small>Pause before next action</small>
                      </div>
                      <div className="source-block">
                        If/Else
                        <br />
                        <small>Conditional branching</small>
                      </div>
                      <div className="source-block">
                        A/B Split
                        <br />
                        <small>Test different variations</small>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewNodeModal;
