import { NotePreview } from "./NotePreview.jsx"
const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemove, onEdit, onUpdate }) {
    return (
        <section className="notes-list">
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <NotePreview 
                            note={note} 
                            onRemove={onRemove} 
                            onEdit={onEdit} 
                            onUpdate={onUpdate}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}