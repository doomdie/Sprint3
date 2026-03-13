import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { noteService } from '../services/note.service.js'
import { EditModal } from '../pages/EditModal.jsx'


const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)
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
            const noteToSave = {
                id: 'n' + Date.now(),
                type: noteData.type || 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#ffffff' },
                info: noteData.info
            }
        }

        setNotes(prevNotes => [noteToSave, ...prevNotes])
    }
    function onUpdateNote(updatedInfo) {
        setNotes(prevNotes => prevNotes.map(note =>
            note.id === selectedNote.id ? { ...note, info: updatedInfo } : note
        ))
        setSelectedNote(null) 
    }
    function onRemoveNote(noteId) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    }
    function onEditNote(noteId) {
        const note = notes.find(n => n.id === noteId)
        setSelectedNote(note)
    }

return (
    <section className="main-layout">
        <SideBar />

        <section className="note-index">
            <AddNote onSaveNote={onSaveNote} />
            
            <NoteList 
                notes={notes} 
                onRemove={onRemoveNote} 
                onEdit={onEditNote} 
            />

            {selectedNote && (
                <EditModal 
                    note={selectedNote} 
                    onClose={() => setSelectedNote(null)} 
                    onSave={onUpdateNote} 
                />
            )}
        </section>
    </section>
)
    
}