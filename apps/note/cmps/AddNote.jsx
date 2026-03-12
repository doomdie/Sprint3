const { useState } = React

export function AddNote({ onSaveNote }) {
    const [noteTxt, setNoteTxt] = useState('')
    const [noteType, setNoteType] = useState('NoteTxt')

    function onAddNote(ev) {
        ev.preventDefault()
        if (!noteTxt) return

        const note = {
            id: 'n' + Date.now(),
            type: noteType,
            isPinned: false,
            style: { backgroundColor: '#ffffff' },
            info: {}
        }

        if (noteType === 'NoteTxt') {
            note.info = { txt: noteTxt }
        } else if (noteType === 'NoteImg') {
            note.info = { url: noteTxt, title: 'New Image' }
        } else if (noteType === 'NoteTodos') {
            note.info = {
                title: 'My List',
                todos: noteTxt.split(',').map(txt => ({ txt: txt.trim(), isDone: false }))
            }
        }

        onSaveNote(note)
        setNoteTxt('')
    }

    return (
        <section className="add-note">
            <form onSubmit={onAddNote}>
                <input
                    type="text"
                    placeholder="Enter content..."
                    value={noteTxt}
                    onChange={(ev) => setNoteTxt(ev.target.value)}
                />

                <div className="note-type-actions">
                    <button type="button" onClick={() => setNoteType('NoteTxt')}>A</button>
                    <button type="button" onClick={() => setNoteType('NoteImg')}>🖼️</button>
                    <button type="button" onClick={() => setNoteType('NoteTodos')}>≡</button>
                </div>
                <button>Add</button>
            </form>
        </section>
    )
}