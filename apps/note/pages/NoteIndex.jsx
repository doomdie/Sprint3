import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { noteService } from '../services/note.service.js'
import { EditModal } from '../pages/EditModal.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'


const { useState, useEffect } = React
export function NoteIndex() {
    const [filterBy, setFilterBy] = useState({ txt: '' })

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
const regex = new RegExp(filterBy.txt, 'i')
    const notesToDisplay = notes.filter(n => regex.test(n.info.title) || regex.test(n.info.txt))
return (
    <React.Fragment>
        <NoteHeader filterBy={filterBy} onSetFilterBy={setFilterBy} />

    <section className="main-layout">
        <div className="sidebar-container">
        <SideBar />
        </div>
        <section className="note-index">
            <AddNote onSaveNote={onSaveNote} />
            
            <NoteList 
                notes={notesToDisplay} 
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

    </React.Fragment>
)
    
}