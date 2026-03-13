import { NotePreview } from "./NotePreview.jsx"
const { Link } = ReactRouterDOM

export function NoteList({notes,  onRemove }) {
    console.log(notes)
    return <section className='notes-list'>
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note} onRemove={onRemove} />

                   
                </li>
            )}
        </ul>
    </section>
}