import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from './firebase'

const auth = getAuth(app)

// Register new user
export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

// Login existing user
export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

// Logout
export const logoutUser = () => {
    return signOut(auth)
}

// Get current user
export const getCurrentUser = () => {
    return auth.currentUser
}

export default auth
