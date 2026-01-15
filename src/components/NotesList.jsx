import NoteItem from './NoteItem'

export default function NotesList({ notes, editNote, deleteNote, toggleImportant }) {
    return (
        <ul style={{ marginTop: '20px', padding: 0, listStyle: 'none' }}>
            {notes.map(note => (
                <NoteItem
                    key={note.id}
                    note={note}
                    editNote={editNote}
                    deleteNote={deleteNote}
                    toggleImportant={toggleImportant}
                />
            ))}
        </ul>
    )
}
