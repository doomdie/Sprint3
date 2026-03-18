import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { noteService } from '../services/note.service.js'
import { EditModal } from '../pages/EditModal.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'

const { useState, useEffect } = React

export function NoteIndex() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [filterBy, setFilterBy] = useState({ txt: '' })
    const [isGridLayout, setIsGridLayout] = useState(true)
    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
            .catch(err => console.error('Failed to load:', err))
    }

    function toggleSidebar() {
        setIsSidebarOpen(prev => !prev)
    }

    function onSaveNote(noteData) {
        let noteToSave

        if (typeof noteData === 'string') {
            noteToSave = {
                info: { txt: noteData, title: '' },
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#ffffff' }
            }
        } else {
            const { id, ...rest } = noteData
            noteToSave = {
                ...rest,
                isPinned: rest.isPinned || false,
                style: rest.style || { backgroundColor: '#ffffff' }
            }
        }

        noteService.save(noteToSave)
            .then(savedNote => {
                setNotes(prevNotes => [savedNote, ...prevNotes])
            })
            .catch(err => {
                console.error('Check if your noteData accidentally had an ID:', err)
            })
    }

    function onUpdateNote(updatedInfo) {
        console.log(updatedInfo)
        const noteToUpdate = { ...selectedNote, info: updatedInfo }
        noteService.save(noteToUpdate)
            .then(savedNote => {
                setNotes(prevNotes => prevNotes.map(note =>
                    note.id === savedNote.id ? savedNote : note
                ))
                setSelectedNote(null)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            })
    }

    function onEditNote(noteId) {
        const note = notes.find(n => n.id === noteId)
        setSelectedNote(note)
    }

    const regex = new RegExp(filterBy.txt, 'i')
    const notesToDisplay = notes.filter(n => regex.test(n.info.title) || regex.test(n.info.txt))

    return (
        <React.Fragment>
            <NoteHeader
                filterBy={filterBy}
                onSetFilterBy={setFilterBy}
                onToggleSidebar={toggleSidebar}
                isGridLayout={isGridLayout}
                setIsGridLayout={setIsGridLayout}
            />

          

            <section className={`gain-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-container">
                    <SideBar />
                </div>

                <section className={isGridLayout ? 'bote-index' : 'note-index'}>
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