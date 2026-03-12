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
                setNotes(notesFromService)
            })
    }

    function onSaveNote(noteData) {
        let noteToSave = noteData

        if (typeof noteData === 'string') {
            noteToSave = {
                id: 'n' + Date.now(),
                type: 'NoteTxt',
                info: { txt: noteData },
                isPinned: false,
                style: { backgroundColor: '#ffffff' }
            }
        }

        setNotes(prevNotes => [noteToSave, ...prevNotes])
    }

    function onRemoveNote(noteId) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    }

    return (
        <section className="note-index">
            <AddNote onSaveNote={onSaveNote} />
            <NoteList notes={notes} onRemove={onRemoveNote} />
        </section>
    )
}