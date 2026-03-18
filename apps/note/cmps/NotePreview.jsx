export function NotePreview({ note, onRemove, onEdit, onUpdate }) {
    const { id, type, info, style, isPinned } = note
    function onTogglePin(ev) {
        ev.stopPropagation()
        onUpdate({ ...note, isPinned: !isPinned })
    }
    return (
        <article
            className={`note-preview ${isPinned ? 'pinned' : ''}`}
            style={style}
            onClick={() => onEdit(id)}
        >
            <div className="note-actions">
                <button
                    className={`pin-btn ${isPinned ? 'active' : ''}`}
                    onClick={onTogglePin}
                    title={isPinned ? "Unpin note" : "Pin note"}
                >
                    <span className="material-symbols-outlined">
                        {isPinned ? 'Unpin Note' : 'Note'}
                    </span>
                </button>
                <button
                    onClick={(ev) => {
                        ev.stopPropagation()
                        onRemove(id)
                    }}
                    className="close"
                >
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>

            {type === 'NoteTxt' && (
                <div className="note-text">
                    {info.title && <h3>{info.title}</h3>}
                    <p>{info.txt}</p>
                </div>
            )}

            {type === 'NoteImg' && (
                <div className="note-img">
                    {info.title && <h3>{info.title}</h3>}
                    <img src={info.url} alt={info.title} />
                </div>
            )}

            {type === 'NoteTodos' && (
                <div className="note-todos">
                    {info.title && <h3>{info.title}</h3>}
                    <ul className="clean-list">
                        {(info.todos || []).map((todo, idx) => (
                            <li key={idx} className={todo.isDone ? 'done' : ''}>
                                <i className={`fa-regular ${todo.isDone ? 'fa-check-square' : 'fa-square'}`}></i>
                                <span>{todo.txt}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </article>
    )
}