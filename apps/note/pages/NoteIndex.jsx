import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
const { useState, useEffect } = React
export function NoteIndex() {
    const [notes, setNotes] = useState([])
    useEffect(() => {
        loadNotes()
    }, [])
    function loadNotes() {
        noteService.query()
            .then(notesFromService => {
                console.log('Notes loaded:', notesFromService)
                setNotes(notesFromService)
            })
            .catch(err => {
                console.error('Had issues loading notes:', err)
            }) }
    
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
            <NoteList notes = {notes} onRemove={onRemoveNote} />
                
            
        </section>
    )
}