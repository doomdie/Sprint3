import { NotePreview } from "./NotePreview.jsx"
const { Link } = ReactRouterDOM
// var testNote = [
//     {
//         id: 'n101',
//         type: 'NoteTxt',
//         isPinned: true,
//         style: { backgroundColor: '#00d' },
//         info: { txt: 'Fullstack Me Baby!' }
//     }, ]
export function NoteList({notes,  onRemove }) {
    return <section className='notes-list'>
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note} />
                    <button onClick={() => onRemove(note.id)} className='close'><i className="fa-regular fa-trash-can"></i></button>
                    {/* <nav className='note-nav'>
                        <Link to={`/note/${note.id}`}><button><i className="fa-solid fa-circle-info"></i>Details</button></Link>
                        <Link to={`/note/edit/${note.id}`}><button><i className="fa-solid fa-pen-to-square"></i></button></Link>
                    </nav> */}
                </li>
            )}
        </ul>
    </section>
}