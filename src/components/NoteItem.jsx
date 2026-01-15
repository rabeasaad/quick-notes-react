import { useState, useEffect } from 'react'

export default function NoteItem({ note, editNote, deleteNote, toggleImportant }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10)
        return () => clearTimeout(timer)
    }, [])

    const gradient = note.important
        ? 'linear-gradient(135deg, #ffe066 0%, #ffd700 100%)'
        : 'linear-gradient(135deg, #c4f0ff 0%, #ffffff 100%)'

    return (
        <li
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
                padding: '12px',
                borderRadius: '12px',
                background: gradient,
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'all 0.3s ease',
                alignItems: 'center'
            }}
        >
            <div>
                <strong>{note.text}</strong>
                <div style={{ fontSize: '12px', color: '#555', marginTop: '2px' }}>
                    {new Date(note.date).toLocaleString()}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
                <button
                    style={{
                        backgroundColor: '#ffd700',
                        color: 'black',
                        borderRadius: '4px',
                        border: 'none',
                        padding: '4px 8px',
                        cursor: 'pointer'
                    }}
                    onClick={() => toggleImportant(note.id)}
                >
                    {note.important ? 'مهمة' : 'تمييز'}
                </button>
                <button
                    style={{
                        backgroundColor: '#2196F3',
                        color: 'white',
                        borderRadius: '4px',
                        border: 'none',
                        padding: '4px 8px',
                        cursor: 'pointer'
                    }}
                    onClick={() => editNote(note.id)}
                >
                    تعديل
                </button>
                <button
                    style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        borderRadius: '4px',
                        border: 'none',
                        padding: '4px 8px',
                        cursor: 'pointer'
                    }}
                    onClick={() => deleteNote(note.id)}
                >
                    حذف
                </button>
            </div>
        </li>
    )
}
