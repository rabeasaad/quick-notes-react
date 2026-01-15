// src/firebase.js
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBDe5Vp0YmSBj7zLSRPKsBTCAe_DMOrNzk",
    authDomain: "quick-notes-app-c41fd.firebaseapp.com",
    projectId: "quick-notes-app-c41fd",
    storageBucket: "quick-notes-app-c41fd.firebasestorage.app",
    messagingSenderId: "896381565873",
    appId: "1:896381565873:web:6fcebd938850b4e9511b90",
}

const app = initializeApp(firebaseConfig)

export default app
