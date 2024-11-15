# INFO6150 - ASSIGNMENT 9: Client Folder

## Project Overview

This project is a full-stack user management system, focusing on secure authentication, validation, and organized code structure. The client side is responsible for interfacing with an Express server API, displaying user information, and handling authentication workflows. The project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Project Features

1. **User Input Validation:**

   - Includes front-end validation for email and full name fields during user creation and update processes.
   - Ensures that only valid input is sent to the server, enhancing overall data quality and user experience.

2. **Password Security:**

   - Passwords are securely hashed on the server using bcrypt before storage, providing a strong level of protection for sensitive information.

3. **RESTful Express API Endpoints:**

   - Server API endpoints are designed to support standard HTTP methods (POST, PUT, DELETE, GET) for full CRUD operations.
   - Endpoints enable seamless user management and authentication.

4. **MongoDB Integration:**

   - Utilizes MongoDB as the database layer, connecting via the Mongoose library to store and retrieve user information.

5. **Robust Error Handling:**
   - Implements comprehensive error handling both on the client and server sides, displaying user-friendly error messages in the UI for invalid requests.

### Installation

1. Clone this repository.
2. Navigate to the client folder.
3. Run `npm install` to install all dependencies.

### Scripts

- **`npm start`**: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

This client application is designed to complement the server API, offering a complete user management experience. The React client interacts with the backend to handle secure authentication and user information storage, while ensuring a responsive and secure front-end experience.
