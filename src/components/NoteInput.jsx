export default function NoteInput({ note, setNote, addNote }) {
    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="اكتب ملاحظتك..."
                style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    outline: 'none'
                }}
            />
            <button
                onClick={addNote}
                style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: '0.2s'
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#4caf50')}
            >
                إضافة
            </button>
        </div>
    )
}
