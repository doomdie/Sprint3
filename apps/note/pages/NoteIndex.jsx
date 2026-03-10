import { AddNote } from '../cmps/AddNote.jsx'
const { useState } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    function onSaveNote(txt) {
        const newNote = {
            id: 'n' + Date.now(),
            type: 'NoteTxt',
            info: { txt },
            style: { backgroundColor: '#fff' }
        }

        console.log('New note Pleasseeee work', newNote)
        setNotes(prevNotes => [newNote, ...prevNotes])
    }

    return (
        <section className="note-index">
            <AddNote onSaveNote={onSaveNote} />

            <div className="note-list">
                {notes.map(note => (
                    <div key={note.id} className="page-note">
                        {note.info.txt}
                    </div>
                ))}
            </div>
        </section>
    )
}