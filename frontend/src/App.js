// import React, { useCallback, useState } from "react";
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from "react-flow-renderer";
// import "./App.css";
// import LeadModal from "./components/LeadModal";
// import AddNewNodeModal from "./components/AddNewNodeModal";
// import axios from "axios";
// const initialNodes = [
//   {
//     id: "1",
//     type: "input",
//     data: { label: "Add Lead Source\nClick to add leads from List or CRM" },
//     position: { x: 150, y: 100 },
//     style: {
//       width: 200,
//       padding: "10px",
//       border: "1px solid #ddd",
//       borderRadius: "8px",
//       textAlign: "center",
//       backgroundColor: "#ffffff",
//       cursor: "pointer",
//     },
//   },
//   {
//     id: "2",
//     data: { label: "Sequence Start Point" },
//     position: { x: 180, y: 300 },
//     style: {
//       width: 150,
//       padding: "10px",
//       border: "1px solid #ddd",
//       borderRadius: "8px",
//       textAlign: "center",
//       backgroundColor: "#ffffff",
//     },
//   },
//   {
//     id: "3",
//     data: { label: "+" },
//     position: { x: 220, y: 450 },
//     style: {
//       width: 50,
//       height: 50,
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       borderRadius: "50%",
//       backgroundColor: "#007bff",
//       color: "#fff",
//       fontSize: "24px",
//       cursor: "pointer",
//     },
//   },
// ];

// const initialEdges = [
//   {
//     id: "e1-2",
//     source: "1",
//     target: "2",
//     type: "smoothstep",
//   },
//   {
//     id: "e2-3",
//     source: "2",
//     target: "3",
//     type: "smoothstep",
//   },
// ];

// function App() {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
// const [allData, setallData] = useState("")
//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );

//   const handleNodeClick = (event, node) => {
//     if (node.id === "1") {
//       const modalTrigger = document.getElementById("modalTrigger");
//       if (modalTrigger) modalTrigger.click();
//     }

//     if (node.id === "3") {
//       const modalTrigger1 = document.getElementById("modalTrigger1");
//       if (modalTrigger1) modalTrigger1.click();
//     }
//   };

//   // Add delete functionality
//   const deleteNode = (nodeId) => {
//     setNodes((nds) => nds.filter((node) => node.id !== nodeId));
//     setEdges((eds) =>
//       eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
//     );
//   };
//   const handleSaveAndSchedule = () => {
//     console.log("Save and Schedule clicked");
  
//     // Helper function to get the next node based on the current node ID
//     const getNextNodeId = (currentNodeId) => {
//       const edge = edges.find((e) => e.source === currentNodeId);
//       return edge ? edge.target : null;
//     };
  
//     // Start traversal from the first user-added node
//     const orderedNodes = [];
//     let currentNodeId = "4"; // Assuming new nodes start from ID 4 (modify as needed)
  
//     while (currentNodeId) {
//       const currentNode = nodes.find((node) => node.id === currentNodeId);
//       if (currentNode && !["1", "2", "3"].includes(currentNode.id)) {
//         // Exclude predefined nodes with IDs 1, 2, 3
//         orderedNodes.push({
//           id: currentNode.id,
//           type: currentNode.data?.fullData?.to ? "email" : "wait",
//           data: currentNode.data?.fullData,
//         });
//       }
//       // Move to the next node in the sequence
//       currentNodeId = getNextNodeId(currentNodeId);
//     }
  
//     // Prepare the payload with ordered nodes
//     const dataToSend = {
//       nodes: orderedNodes,
//       edges: edges
//         .filter(
//           (edge) =>
//             !["1", "2", "3"].includes(edge.source) &&
//             !["1", "2", "3"].includes(edge.target)
//         ), // Exclude edges connected to predefined nodes
//     };
  
//     // Log the payload for debugging
//     console.log("Filtered Payload (New Nodes Only):", dataToSend);
  
//     // Send the filtered data to the backend
//     axios
//       .post("http://localhost:5000/api/schedule-email", dataToSend)
//       .then((response) => {
//         console.log("Data saved successfully", response.data);
//       })
//       .catch((error) => {
//         console.error("Error saving data", error);
//       });
//   };
  
  
  
//   const addNewNode = (nodeData) => {
//     const isEmailNode = !!nodeData.to;
//     const newNodeId = `${nodes.length + 1}`;
  
//     // Create the new node (Email or Delay)
//     const newNode = {
//       id: newNodeId,
//       data: {
//         label: (
//           <div style={{ position: "relative" }}>
//             {isEmailNode ? `Email: ${nodeData.subject}` : `Delay: ${nodeData.waitFor} ${nodeData.waitType}`}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 deleteNode(newNodeId);
//               }}
//               style={{
//                 position: "absolute",
//                 top: -10,
//                 right: -10,
//                 background: "red",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "50%",
//                 width: "20px",
//                 height: "20px",
//                 cursor: "pointer",
//               }}
//             >
//               ×
//             </button>
//           </div>
//         ),
//         fullData: nodeData,
//       },
//       position: { x: 220, y: nodes.length * 150 + 100 },
//       style: {
//         width: 200,
//         padding: "10px",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         textAlign: "center",
//         backgroundColor: isEmailNode ? "#fff7e6" : "#e6f7ff",
//       },
//     };
  
//     let previousNodeId;
//     if (isEmailNode) {
//       // If it's an Email node, connect it to the last node in the flow
//       previousNodeId = nodes[nodes.length - 1]?.id;
//     } else {
//       // If it's a Delay node, connect it immediately after the last Email node
//       const lastEmailNode = nodes.reverse().find((node) => node.data.fullData?.to)?.id;
//       previousNodeId = lastEmailNode || nodes[nodes.length - 1]?.id;
//     }
  
//     // Create a new edge from the previous node to the new node
//     const newEdge = {
//       id: `e${previousNodeId}-${newNodeId}`,
//       source: previousNodeId,
//       target: newNodeId,
//       type: "smoothstep",
//     };
  
//     // Update nodes and edges state
//     setNodes((nds) => [...nds, newNode]);
//     setEdges((eds) => [...eds.filter((edge) => edge.source !== previousNodeId), newEdge]);
//   };
  
  
  

//   return (
//     <div style={{ height: "100vh", backgroundColor: "#f4f5f7" }}>
//      {/* Header with Save and Schedule button */}
//      <header
//         style={{
//           padding: "10px 20px",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           backgroundColor: "#007bff",
//           color: "#fff",
//         }}
//       >
//         <h2>Workflow Builder</h2>
//         <button className="btn btn-light" onClick={handleSaveAndSchedule}>
//           Save & Schedule
//         </button>
//       </header>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onNodeClick={handleNodeClick}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background color="#aaa" gap={16} />
//       </ReactFlow>

//       <button
//         type="button"
//         id="modalTrigger"
//         className="btn btn-primary d-none"
//         data-bs-toggle="modal"
//         data-bs-target="#myModal"
//       ></button>
//       <button
//         type="button"
//         id="modalTrigger1"
//         className="btn btn-primary d-none"
//         data-bs-toggle="modal"
//         data-bs-target="#myModal2"
//       ></button>

//       <LeadModal onSave={() => {}} />
//       <AddNewNodeModal
//         onAddNode={addNewNode} // Pass the function to add a new node
//         nodesCount={nodes.length} // Pass the number of nodes as a prop
//       />
//     </div>
//   );
// }

// export default App;
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import Login from './components/Login'
import Signup from './components/Signup';
import FlowCanvas from './components/FlowCanvas';
export default function app () {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/flowcanvas" element={<FlowCanvas />} />
      </Routes>
    </Router>
      
    </>
  )
}
