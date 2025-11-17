# 🧑‍💼 Job Application Portal

A modern and interactive Job Application Portal built using **React**, **Redux Toolkit**, **React Router**, **Context API**, and **Custom Hooks**.  
The project simulates a real-world job application flow with multi-step forms, validation, and global application state management.

---

## 🚀 Live Demo
🔗 **Deployed App:** https://job-application-portal-6uyd7sk5d.vercel.app/

---

## 🎯 Objective
To create a scalable job application platform where users can:
- Explore available job positions
- Apply through a multi-step form with validation
- Submit and review their applications
- Edit application details and manage profile info

---

## 🧩 Features

### 🏠 Home Page
- Displays available job openings
- Each job shows title, company, and brief description
- **View Details** button navigates to job details screen

### 📄 Job Details Page
- Shows full job description, requirements, salary, etc.
- **Apply Now** navigates to the multi-step application form

### 📝 Multi-step Application Form
| Step | Fields |
|-------|---------|
| **Step 1** | Name, Email, Phone Number |
| **Step 2** | Experience (years), Add multiple skills dynamically |
| **Step 3** | Cover letter, Preferred start date |

- Inline validation & error messages
- **Next / Back / Submit** navigation flow
- Uses a **custom useForm hook** for form state & validation

### 📋 Application Summary
- Displays submitted data
- Ability to **Edit Application**

### 📦 Applications List
- Shows all submitted applications from Redux store
- Each application has a **View Details** button

### 👤 Profile Page
- Uses **UserContext** to store user profile details
- Update username and email
- Display logged-in user info in navigation bar

---

## 🛠 Tech Stack

| Category | Technology |
|---------|-----------|
| Frontend Framework | React |
| Routing | React Router |
| Global State | Redux Toolkit |
| Form State & Validation | Custom `useForm()` hook |
| Context API | Managing user profile |
| Styling | Tailwind CSS |
| Deployment | Vercel |
