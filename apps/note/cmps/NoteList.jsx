import { NotePreview } from "./NotePreview.jsx"
const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemove, onEdit }) {
    return (
        <section className="notes-list">
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <NotePreview 
                            note={note} 
                            onRemove={onRemove} 
                            onEdit={onEdit} 
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}