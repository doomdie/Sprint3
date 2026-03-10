import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
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
    function onRemoveNote(hi) {
        console.log("hi")
    }

    return (
        <section className="note-index">
            <AddNote onSaveNote={onSaveNote} />

            <NoteList  onRemove={onRemoveNote} />
                
            
        </section>
    )
}