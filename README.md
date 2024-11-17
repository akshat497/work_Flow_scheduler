Email Marketing Sequence Builder
A MERN stack application for creating and managing automated email marketing sequences. It features a visual flowchart interface for designing sequences with email and delay nodes using ReactFlow, backend scheduling with Agenda, and email sending via Nodemailer.

📋 Table of Contents
Features
Tech Stack
Project Structure
Prerequisites
Installation
Usage
API Endpoints
Screenshots
Testing
Contributing
License
✨ Features
Visual Sequence Builder: Design email sequences using a flowchart interface.
Email Scheduling: Schedule emails with custom delays using Agenda.
Interactive Nodes: Add, edit, and delete nodes (Cold Email, Delay) directly on the interface.
Persistent Storage: MongoDB integration for storing sequence data.
Job Scheduling: Reliable email scheduling using Agenda for delayed tasks.
Email Sending: Integration with Nodemailer for sending emails.
User Authentication: Secure login and registration (optional, if implemented).
Responsive UI: User-friendly interface built with Bootstrap and ReactFlow.
🛠️ Tech Stack
Frontend:
React
ReactFlow
Bootstrap (via CDN)
Backend:
Node.js
Express.js
MongoDB (Mongoose for schema management)
Agenda (for job scheduling)
Nodemailer (for email sending)
Database:
MongoDB (Cloud or Local)
📁 Project Structure
arduino

├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── jobs/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
├── .env
├── README.md
└── package.json
📝 Prerequisites
Ensure you have the following installed:

Node.js (v18+)
MongoDB (local or cloud instance)
npm
🚀 Installation
Backend
Clone the repository and navigate to the backend folder:

bash

git clone <repository-url>
cd backend
Install backend dependencies:

bash

npm install
Create a .env file in the backend folder with the following variables:

env

MONGO_URI=<your-mongo-db-connection-string>
SMTP_HOST=<your-smtp-host>
SMTP_PORT=<your-smtp-port>
SMTP_USER=<your-email>
SMTP_PASS=<your-email-password>
Start the backend server:

bash

npm start
The server should now be running at http://localhost:5000.

Frontend
Navigate to the frontend folder:

bash

cd ../frontend
Install frontend dependencies:

bash

npm install
Start the frontend development server:

bash

npm start
The application should now be running at http://localhost:3000.

🎮 Usage
Open http://localhost:3000 in your browser.
The interface loads with three predefined nodes: Lead Source, Sequence Start Point, and + (Add Node).
Click on the + (Add Node) to add a new Cold Email or Delay node.
Click on the Edit icon on any node to modify its details.
Click on the Delete icon to remove a node.
Once your sequence is designed, save it to schedule the email tasks.
📡 API Endpoints
Base URL: http://localhost:5000/api
Method	Endpoint	Description
POST	/nodes/add	Add a new node to the sequence
GET	/nodes/	Retrieve all nodes
DELETE	/nodes/:id	Delete a specific node
POST	/email/schedule	Schedule an email using Agenda
GET	/email/jobs	Get all scheduled email jobs
Example API Request
bash

POST /api/email/schedule
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Welcome Email",
  "body": "Hello, thank you for joining us!",
  "sendAfter": "1h"
}
🖼️ Screenshots
Main Interface

Adding a Node

Editing a Node

🧪 Testing
Backend tests can be run using Jest or Mocha (if set up).
Frontend testing can be done using React Testing Library.
Run tests (example with Jest):

bash

cd backend
npm test
🙌 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a Pull Request.
