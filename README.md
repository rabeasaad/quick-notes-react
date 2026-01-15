# Quick Notes App 📝

## Description
Quick Notes is a full-stack web application built with React and Firebase.  
It allows users to register, login, and manage their personal notes securely in the cloud.  
Each user has their own set of notes, which can be added, edited, deleted, and marked as important.

---

## Features
- User Authentication (Register/Login/Logout) via Firebase  
- Save notes per user in Firestore Database  
- Add, edit, delete notes  
- Mark notes as important  
- Search notes in real-time  
- Responsive and clean UI

---

## Future Improvements
- Dark Mode 🌙  
- Undo after deletion ↩️  
- Tags / Categories 🏷️  
- Toast Notifications 🔔  
- Tests, ESLint, CI/CD  
- PWA support (Offline + Installable)

---

## 📸 Screenshots

### Notes
![Notes](images/notes.JPG)

### Marking Note
![Marking Note](images/marking-note.JPG)

---

## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your system.

## Installation & Run

```bash
# Clone the repository
git clone https://github.com/rabeasaad/quick-notes-react.git

# Navigate to the project folder
cd quick-notes-react

# Install dependencies
npm install

# Start the development server
npm run dev
run dev

---

## Set up Firebase
Create a Firebase project at https://console.firebase.google.com

Enable Authentication → Email/Password

Enable Firestore Database (Test mode is fine for development)

Copy Firebase config into src/firebase.js

---

## Technologies Used 
React
Firebase (Authentication & Firestore)
JavaScript, HTML, CSS
Vite
---
## Author
"Rabea Alsoudi"