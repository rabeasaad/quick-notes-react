import { useState, useEffect } from 'react'
import NoteInput from './components/NoteInput'
import NotesList from './components/NotesList'
import Login from './components/Login'
import { getCurrentUser, logoutUser } from './auth'

import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import app from './firebase'

const db = getFirestore(app)

function App() {
  const [user, setUser] = useState(null)
  const [note, setNote] = useState('')
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState([])

  // --- Login/Logout ---
  const handleLogin = () => {
    setUser(getCurrentUser())
  }

  const handleLogout = async () => {
    await logoutUser()
    setUser(null)
    setNotes([])
  }

  // --- Load notes for the logged-in user ---
  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, 'notes'),
      where('uid', '==', user.uid),
      orderBy('date', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedNotes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setNotes(loadedNotes)
    })

    return () => unsubscribe()
  }, [user])

  // --- Add note ---
  const addNote = async () => {
    if (note.trim() === '') return
    const newNote = {
      text: note.trim(),
      important: false,
      date: Date.now(),
      uid: user.uid
    }


    setNotes([{ id: 'temp-' + Date.now(), ...newNote }, ...notes])


    await addDoc(collection(db, 'notes'), newNote)
    setNote('')
  }

  // --- Delete note ---
  const deleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteDoc(doc(db, 'notes', id))
    }
  }

  // --- Edit note ---
  const editNote = async (id) => {
    const noteToEdit = notes.find(n => n.id === id)
    if (!noteToEdit) return
    if (window.confirm('Do you want to edit this note?')) {
      const newText = prompt('Edit the note:', noteToEdit.text)
      if (newText !== null && newText.trim() !== '') {
        await updateDoc(doc(db, 'notes', id), { text: newText.trim(), date: Date.now() })
      }
    }
  }

  // --- Toggle Important ---
  const toggleImportant = async (id) => {
    const noteToUpdate = notes.find(n => n.id === id)
    if (!noteToUpdate) return
    await updateDoc(doc(db, 'notes', id), { important: !noteToUpdate.important })
  }

  // --- Filter notes by search ---
  const filteredNotes = notes.filter(n =>
    n.text.toLowerCase().includes(search.toLowerCase())
  )

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Quick Notes 📝</h1>

      <button onClick={handleLogout} style={{ marginBottom: '15px', cursor: 'pointer' }}>Logout</button>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search your notes..."
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '15px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />

      <NoteInput note={note} setNote={setNote} addNote={addNote} />

      <NotesList
        notes={filteredNotes}
        editNote={editNote}
        deleteNote={deleteNote}
        toggleImportant={toggleImportant}
      />
    </div>
  )
}

export default App
