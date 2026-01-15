import { useState, useEffect } from 'react'
import NoteInput from './components/NoteInput'
import NotesList from './components/NotesList'

function App() {
  const [note, setNote] = useState('')
  const [search, setSearch] = useState('')

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('notes')
      if (saved) {
        const parsed = JSON.parse(saved)
        return parsed.map(n =>
          typeof n === 'string'
            ? { text: n, important: false, id: Date.now() + Math.random(), date: Date.now() }
            : n
        )
      }
      return []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (note.trim() === '') return
    const newNote = { text: note.trim(), important: false, id: Date.now(), date: Date.now() }
    setNotes([newNote, ...notes])
    setNote('')
  }

  const deleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(n => n.id !== id))
    }
  }

  const editNote = (id) => {
    const noteToEdit = notes.find(n => n.id === id)
    if (!noteToEdit) return
    if (window.confirm('Do you want to edit this note?')) {
      const newText = prompt('Edit the note:', noteToEdit.text)
      if (newText !== null && newText.trim() !== '') {
        const updatedNotes = notes.map(n =>
          n.id === id ? { ...n, text: newText.trim(), date: Date.now() } : n
        )
        setNotes(updatedNotes)
      }
    }
  }

  const toggleImportant = (id) => {
    const updatedNotes = notes.map(n =>
      n.id === id ? { ...n, important: !n.important } : n
    )
    setNotes(updatedNotes)
  }

  const filteredNotes = notes.filter(n =>
    n.text.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Quick Notes 📝</h1>

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
