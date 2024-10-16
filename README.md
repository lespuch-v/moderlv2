# Mood Recorder App 🎸🎤🎶

This is a **work in progress** application that allows users to record their mood by selecting an emoji, adding text, and saving it. The project includes basic CRUD operations, login, and registration features, with a **front-end in Angular** and a **back-end in ASP.NET Core**.

---

## ✨ Features

- **Mood Recording**: Users can select an emoji representing their mood and add a personalized message.
- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for user moods.
- **User Authentication**: Fully functional **login and registration** system.
- **Tech Stack**:
  - **Front-end**: Angular
  - **Back-end**: ASP.NET Core

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [.NET SDK](https://dotnet.microsoft.com/download/dotnet) installed.
- [Angular CLI](https://angular.io/cli) installed globally.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/mood-recorder-app.git
   cd mood-recorder-app
   ```

2. **Backend Setup**:
   - Navigate to the backend folder:

     ```bash
     cd backend
     ```

   - Restore the dependencies and run the backend:

     ```bash
     dotnet restore
     dotnet run
     ```

3. **Frontend Setup**:
   - Navigate to the frontend folder:

     ```bash
     cd ../frontend
     ```

   - Install the dependencies and run the Angular development server:

     ```bash
     npm install
     ng serve
     ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:4200` to access the application.

---

## 🔧 Project Structure

```
mood-recorder-app/
│
├── backend/          # ASP.NET Core backend
│   ├── Controllers/  # API controllers for CRUD operations
│   └── Services/     # Business logic and service layers
│
└── frontend/         # Angular front-end
    ├── src/app/      # Main Angular application
    └── assets/       # Static assets like images, styles
```

---

## 🛠️ Technologies Used

- **Front-end**: Angular
- **Back-end**: ASP.NET Core
- **Authentication**: JWT-based user authentication
- **Database**: In-memory storage for development (e.g., SQLite or InMemoryDb)

---

## Pictures
![image](https://github.com/user-attachments/assets/af4e475b-a2ef-493e-9a77-11d8ab2f6fdc)

![image](https://github.com/user-attachments/assets/510a976d-6383-4817-93e3-c01400d33665)

![image](https://github.com/user-attachments/assets/726009c1-50f4-44a2-92e6-71f4db9fe839)


## 🚧 Status

This project is still in **active development**. Planned improvements include:

- Better UI/UX design.
- Integration with a cloud-based database.
- Additional mood analytics features.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE
