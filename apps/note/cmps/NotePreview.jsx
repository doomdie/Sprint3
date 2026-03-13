export function NotePreview({ note, onRemove }) {
    const { id, type, info, style } = note

    return (
        <article className='note-preview' style={style}>
            <div className="note-actions">
                <button 
                    onClick={() => onRemove(id)} 
                    className='close'
                >
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>

            {type === 'NoteTxt' && (
                <div className="note-text">
                    <p>{info.txt}</p>
                </div>
            )}

            {type === 'NoteImg' && (
                <div className="note-img">
                    <h3>{info.title}</h3>
                    <img src={info.url} alt={info.title} />
                </div>
            )}

            {type === 'NoteTodos' && (
                <div className="note-todos">
                    <h3>{info.title}</h3>
                    <ul>
                        {info.todos.map((todo, idx) => (
                            <li key={idx} className={todo.isDone ? 'done' : ''}>
                                {todo.txt}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </article>
    )
}