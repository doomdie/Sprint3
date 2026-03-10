export function NotePreview({ note }) {
    const { type, info, style } = note

    return (
        <article className='note-preview' style={style}>
            
            {type === 'NoteTxt' && (
                <div className="note-text">
                    <p>{info.txt}</p>
                </div>
            )}

            {type === 'NoteImg' && (
                <div className="note-img">
                    <h3>{info.title}</h3>
                    <img src={info.url} alt={info.title} style={{ maxWidth: '100%' }} />
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