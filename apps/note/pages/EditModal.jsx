export function EditModal({ note, onClose, onSave }) {
    const [info, setInfo] = React.useState({ ...note.info })
    const { style, type } = note

    function handleChange({ target }) {
        const { name, value } = target
        setInfo(prevInfo => ({ ...prevInfo, [name]: value }))
    }

    function onAddTodo(txt) {
        if (!txt.trim()) return
        const newTodo = { txt, isDone: false }
        const newTodos = [...(info.todos || []), newTodo]
        setInfo(prevInfo => ({ ...prevInfo, todos: newTodos }))
    }

    function removeTodo(idx) {
        const newTodos = info.todos.filter((_, i) => i !== idx)
        setInfo(prevInfo => ({ ...prevInfo, todos: newTodos }))
    }

    function handleTodoChange(idx, value) {
        const newTodos = info.todos.map((todo, i) =>
            i === idx ? { ...todo, txt: value } : todo
        )
        setInfo(prevInfo => ({ ...prevInfo, todos: newTodos }))
    }

    function toggleTodo(idx) {
        const newTodos = info.todos.map((todo, i) =>
            i === idx ? { ...todo, isDone: !todo.isDone } : todo
        )
        setInfo(prevInfo => ({ ...prevInfo, todos: newTodos }))
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <article
                className="modal-content note-preview"
                style={style}
                onClick={(ev) => ev.stopPropagation()}
            >
                <input
                    className="title-input"
                    name="title"
                    placeholder="Title"
                    value={info.title || ''}
                    onChange={handleChange}
                />

                {type === 'NoteTxt' && (
                    <textarea
                        className="note-text"
                        name="txt"
                        value={info.txt || ''}
                        onChange={handleChange}
                        autoFocus
                    />
                )}

                {type === 'NoteImg' && (
                    <div className="note-img">
                        <img src={info.url} alt="Note" />
                        <input
                            name="url"
                            placeholder="Image URL"
                            value={info.url || ''}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {type === 'NoteTodos' && (
                    <div className="note-todos">
                        <div className="todo-list">
                            {(info.todos || []).map((todo, idx) => (
                                <div key={idx} className={`todo-row ${todo.isDone ? 'done' : ''}`}>
                                    <i
                                        className={`fa-regular ${todo.isDone ? 'fa-check-square' : 'fa-square'}`}
                                        onClick={() => toggleTodo(idx)}
                                    ></i>
                                    <input
                                        value={todo.txt}
                                        onChange={(ev) => handleTodoChange(idx, ev.target.value)}
                                    />
                                    <button className="btn-remove-todo" onClick={() => removeTodo(idx)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            ))}

                            <div className="todo-row add-todo-row">
                                <i className="fa-solid fa-plus"></i>
                                <input
                                    type="text"
                                    placeholder="List item"
                                    onKeyDown={(ev) => {
                                        if (ev.key === 'Enter') {
                                            onAddTodo(ev.target.value)
                                            ev.target.value = ''
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="note-actions modal-visible">
                    <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button
                        type="button"
                        className="btn-save"
                        onClick={() => onSave({ ...note, info })} 
                    >
                        Save
                    </button>
                </div>
            </article>
        </div>
    )
}