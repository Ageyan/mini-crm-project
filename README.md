# 💼 Mini-CRM System (Full-Stack Application)

A modern, responsive full-stack application designed to efficiently manage
clients and associate specific tasks with them. Built with a focus on data
integrity, clean architecture, security-first input handling, and adaptive
design across all devices.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-%23880000.svg?style=for-the-badge&logo=mongoose&logoColor=white)

## 📌 Features

- **🔐 User Authentication:** Secure login flow with JWT token management to
  protect sensitive CRM data.
- **🗂 Client & Task Management:** Perform full CRUD operations on clients and
  tasks. Tasks are dynamically linked to specific clients from the database.
- **✅ Dynamic Task Statuses:** Quickly update task statuses (To Do, In
  Progress, Done) directly from the dashboard cards.
- **📈 Dashboard Filtering:** Instant task filtering by status with real-time
  data fetching through custom hooks.
- **📱 Responsive UI (Mobile-First):** Adaptive design for Mobile, Tablet, and
  Desktop. Forms, navigation, and modals (including full-screen mobile view for
  task details) adjust seamlessly.
- **🚀 Optimized UX:**
    - Smooth loading transitions (no flashing effects).
    - Toast notifications for errors and success states.
    - **Input Protection:** Advanced CSS handling (ellipses, min-widths,
      overflow handling) to prevent layout breaks from very long, unbroken user
      input.

## 🌍 Live Demo

**Check out the live application here:**
[Open Live App](https://mini-crm-project-kela.vercel.app)

**Test Credentials:**

- Email: `admin@crm.com`
- Password: `admin123`

## 🛠 Tech Stack

### Frontend

- **Core:** React 18, TypeScript, Vite
- **Styling:** SCSS (BEM methodology, centralized variables, mixins
  architecture)
- **HTTP Client:** Axios
- **UI Icons:** React Icons

### Backend

- **Core:** Node.js, Express, TypeScript configured with **ES Modules
  (NodeNext)**
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Deployment:** Render

---

## 🏗 Architecture & Best Practices

- **Strict Type Checking:** Comprehensive TypeScript interfaces for both
  Frontend (Props, State, Data models) and Backend (Mongoose schemas,
  Request/Response typing).
- **Custom Hooks:** Reusable logic extracted into hooks:
    - `useCRMData`: Fetches and manages clients, tasks, loading, and error
      states smoothly.
    - `useModalClose`: Handles global Escape key events and prevents body
      scrolling when modals are open (accessible UI).
- **Scalable Architecture:** ESM modules on the backend, domain-based folder
  structure on the frontend.

---

## 📸 Screenshots

<img width="1710" height="1107" alt="Screenshot auth page" src="https://github.com/user-attachments/assets/bea71bdb-6eb3-471f-b291-cd651ac211f1" />

<img width="1710" height="1107" alt="Screenshot dashboard" src="https://github.com/user-attachments/assets/43845f56-a678-4cda-be4e-0a774c6306c9" />

<img width="1710" height="1107" alt="Screenshot clients page" src="https://github.com/user-attachments/assets/2aee1a62-08a2-4e7c-b1c0-6cf45e6e52d6" />

<img width="1710" height="1107" alt="Screenshot tasks page" src="https://github.com/user-attachments/assets/0b685f46-a16b-463b-86c9-37eb7c0255c2" />

<img width="270" height="580" alt="Screenshot dashboard mobile" src="https://github.com/user-attachments/assets/d1eca282-57de-42ec-874a-172b1a3e63e1" />

<img width="270" height="580" alt="Screenshot modal delete mobile" src="https://github.com/user-attachments/assets/6a2a9433-5e09-43f4-889d-3c9eca47092a" />

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Ageyan/andrei-mini-crm
```

2. **Install frontend dependencies:**

```bash
cd client
npm install
```

3. **Install backend dependencies:**

```bash
cd server
npm install
```

4. **Set up environment variables:** Create `.env` files in both `client` and
   `server` directories based on `.env.example`.

5. **Start the development servers:**

Terminal 1 (Backend):

```bash
cd server
npm run dev
```

Terminal 2 (Frontend):

```bash
cd client
npm run dev
```

### 👨‍💻 Author

Andrey - Full Stack Developer - [GitHub Profile](https://github.com/Ageyan)
