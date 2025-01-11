# **Product Management System**
This project is part of an **introductory HTML** course, designed to help students learn about API integration. The system allows for managing and reviewing product details, including features for viewing all products, filtering search results, and allowing administrators to add, edit, or delete products

## **Main Features**

- **View Products**: Displays a list of all products with their details.
- **Search & Filter**: Allows filtering products based on various parameters.
- **Add Product**: (Admins) can add new products to the system.
- **Edit Product**: (Admins) can update existing product details.
- **Delete Product**: (Admins) can remove products from the system.

## **Technologies Used**

- **Frontend**: [React](https://reactjs.org/) with **TypeScript** for building the UI.
- **Backend**: [Java Spring Boot](https://spring.io/projects/spring-boot) for building the API.
- **Database**: [PostgreSQL](https://www.postgresql.org/) for storing data.
- **Deployment**: Deployed on [Railway](https://render.com/) -> [Product Management System](https://product-management-test.up.railway.app/)

**Note**: This deployment link is temporary and may be removed in the future as the deployment is for testing purposes.

## Checklist (Maybe in the future)

- [ ] Upload Image file
- [ ] Product purchasing system

## **Login Details**

Here are the login credentials for the **Admin** and **Student** roles:

### **Admin**

- **Email**: `admin`
- **Password**: `password123`

## **How to Run Locally the Project**

### **1. Run with Docker (using Docker Compose)**

Make sure you have Docker and Docker Compose installed if you plan to use the Docker method.

To run the project using Docker Compose, you can use the following command:

```bash
docker-compose up --build
```

This will:

- Build the Docker images.
- Start the containers for both the frontend and backend.

By default:

The frontend will be accessible at `http://localhost:4173`.
The backend will be accessible at `http://localhost:8080`.

### **2. Run Frontend & Backend Locally**

Make sure you have java and npm installed if you prefer to run the project locally without Docker.

```bash
cd client
npm install
npm run serve
```
This will start the frontend server, and it will be available at `http://localhost:4173`.

```bash
cd server
java -jar target/demo-0.0.1-SNAPSHOT.jar
```
Alternatively, run it using IntelliJ. This will start the backend server, and it will be available at `http://localhost:8080`.

**Note**: If using a local PostgreSQL instance, please create the schema 'product' before running.
