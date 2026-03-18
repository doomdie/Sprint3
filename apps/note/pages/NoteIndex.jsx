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

    function onUpdateNote(updatedNote) {
        noteService.save(updatedNote)
            .then(savedNote => {
                setNotes(prevNotes => prevNotes.map(note =>
                    note.id === savedNote.id ? savedNote : note
                ))
                setSelectedNote(null)
            })
            .catch(err => console.error('Failed to update note:', err))
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

    const filteredNotes = notes.filter(n => {
        const title = n.info.title || ''
        const txt = n.info.txt || ''
        return regex.test(title) || regex.test(txt)
    })

    const notesToDisplay = filteredNotes.sort((a, b) => {
        if (a.isPinned === b.isPinned) return 0
        return a.isPinned ? -1 : 1
    })

    const pinnedNotes = notesToDisplay.filter(n => n.isPinned)
    const otherNotes = notesToDisplay.filter(n => !n.isPinned)

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

                    {pinnedNotes.length > 0 && (
                        <div className="pinned-section">
                            <h5 className="section-title">PINNED</h5>
                            
                                <NoteList
                                    notes={pinnedNotes}
                                    onRemove={onRemoveNote}
                                    onEdit={onEditNote}
                                    onUpdate={onUpdateNote}
                                />
                            
                        </div>
                    )}

                    <div className="others-section">
                        {pinnedNotes.length > 0 && (
                            <h5 className="section-title">OTHERS</h5>
                        )}
                        <NoteList
                            notes={otherNotes}
                            onRemove={onRemoveNote}
                            onEdit={onEditNote}
                            onUpdate={onUpdateNote}
                        />
                    </div>

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