
---

### **Frontend - `README.md`**
```markdown
# User Management System - Frontend

This is the frontend for the **User Management System**, built using **React, Context API, React Router, and TailwindCSS**.

## Features
- **User Authentication**: Login & Register with JWT authentication.
- **Role-Based Views**:
  - **Admin**: Can view all users.
  - **User**: Can only see their profile.
  - **Moderator**: Can search and view users but cannot modify them.
- **Protected Routes**: Routes are secured based on roles.
- **Error Handling**: Shows error messages for incorrect credentials.

## Tech Stack
- **Frontend**: React.js, Context API, React Router
- **Styling**: CSS
- **State Management**: Context API
- **API Calls**: Axios

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/meghabhansali2911/user-management-frontend.git
   cd user-management-frontend

2. Install dependencies:
    ```sh
    npm install

3. Start server
  ```sh
  npm start
