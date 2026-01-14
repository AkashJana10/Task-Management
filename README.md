1. # Clone the repository
git clone <repository-url>
cd task-management-system

2. #  Backend Setup
cd backend
npm install 

3. # Configure Environment Variables 
Create a .env file in the backend directory
Example :-  
PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_secret_key

4. # Frontend Setup
cd frontend
npm install

5. # Start the Application

* Backend:
    cd backend
    npm run dev
* frontend:
    cd frontend
    npm run dev

###  Usage Guide

# 1. Registration

Navigate to /signup
Enter username, email, and password
Click "Register" to create account
You'll be automatically logged in

# 2. Login

Navigate to /login
Enter registered email and password
Click "Login" to access dashboard

# 3. Managing Tasks
a. Create Task
Click "+ New Task" button
Fill in task details:
Title (required)
Description (optional)
Status (Pending/In Progress/Completed)
Priority (Low/Medium/High)
Due Date (optional)
Click "Create Task"

b. Edit Task
Click the edit icon on any task
Modify task details
Click "Update Task"

c. Delete Task
Click the delete icon on any task
Confirm deletion in the dialog

d. Filter Tasks
Use filter buttons to view:
All Tasks
Pending
In Progress
Completed

e. Update Task Status
Use the status dropdown on each task card to change status

###  Authentication Flow

User registers or logs in
Server validates credentials
JWT token is generated and sent to client
Token is included in all subsequent API requests
Server verifies token for protected routes
User data is associated with all operations

### UI Components
Header
Application logo
User greeting
Logout button (when logged in)
Login/Register links (when logged out)

Task Dashboard
Task statistics (Total, Pending, In Progress, Completed)

Filter buttons
New task button
Task list with cards

Task Card
Task title and description
Status badge with color coding
Priority indicator

Due date
Edit and delete buttons
Status dropdown

Task Form
Modal/popup for creating/editing tasks
Form validation
Error messages
Cancel and submit buttons

### Features

# Authentication & Security
User registration with validation
Secure login with JWT tokens
Password hashing using bcrypt
Protected routes and API endpoints
Session-based authentication

# Task Management
Create: Add new tasks with details
Read: View all tasks with filtering
Update: Edit existing tasks
Delete: Remove tasks with confirmation
Filter: Filter by status (All/Pending/In Progress/Completed)
Sort: Automatic sorting by creation date

# User Interface
Clean, modern, and responsive design

Real-time status updates
Form validation and error handling
Mobile-friendly responsive layout

# Data Protection
User data isolation (users see only their tasks)
Secure API endpoints with auth middleware
Input sanitization and validation
CORS protection

### Architecture
1. Frontend (React.js)
React.js - UI components
Zod for api level validation
React Router - Navigation
Redux toolkit - State management
Axios - HTTP requests
lucide-react - Icons
Styling - CSS3,Tailwind CSS, daisyui
Notification - react-hot-toast

2. Backend (Express.js)
Node.js - Runtime
Express.js - Web framework
MongoDB - Database
Mongoose - ODM
JWT - Authentication
bcryptjs - Password hashing
CORS - Cross-origin requests
