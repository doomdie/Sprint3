const { useState, useEffect, useRef } = React
export function AddNote({ onSaveNote }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const noteRef = React.useRef(null)
    const [noteType, setNoteType] = useState('NoteTxt')
    const [title, setTitle] = useState('')
    const [txt, setTxt] = useState('')
    const [todos, setTodos] = useState([{ txt: '', isDone: false }])
    const [style, setStyle] = useState({ backgroundColor: '#ffffff' })
    function addTodoRow() {
        setTodos([...todos, { txt: '', isDone: false }])
    }

    function handleTodoChange(index, value) {
        const updatedTodos = [...todos]
        updatedTodos[index].txt = value
        setTodos(updatedTodos)
    }
    useEffect(() => {
        function handleClickOutside(ev) {
            if (!isExpanded) return

            if (noteRef.current && !noteRef.current.contains(ev.target)) {
                onAddNote(ev)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isExpanded, title, txt, todos, noteType])
    function onAddNote(ev) {
        ev.preventDefault()
        const hasTitle = title.trim().length > 0
        const hasTxt = txt.trim().length > 0
        const hasValidTodos = noteType === 'NoteTodos' && todos.some(todo => todo.txt.trim() !== '')
       if (!hasTitle && !hasTxt && !hasValidTodos) {
        setIsExpanded(false)
        resetForm() 
        return 
    }
        const note = {
            id: 'n' + Date.now(),
            type: noteType,
            isPinned: false,
            style: style,
            info: { title }
        }

        if (noteType === 'NoteTxt') note.info.txt = txt
        if (noteType === 'NoteImg') note.info.url = txt
        if (noteType === 'NoteTodos') {
            note.info.todos = todos.filter(todo => todo.txt.trim() !== '')
        }

        onSaveNote(note)
        setTitle('')
        setTxt('')
        setTodos([{ txt: '', isDone: false }])
    }
    function resetForm() {
    setTitle('')
    setTxt('')
    setTodos([{ txt: '', isDone: false }])
    setStyle({ backgroundColor: '#ffffff' })
}

    return (
        <section ref={noteRef} className="add-note" style={style}>
            <form onSubmit={onAddNote} className="add-note-form">
                {isExpanded && (<input
                    className="title-input"
                    placeholder="Title"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                />)}

                {noteType === 'NoteTxt' && (
                    <textarea
                        className="note-content"
                        placeholder="Take a note..."
                        value={txt}
                        onMouseDown={() => setIsExpanded(true)}
                        onFocus={() => setIsExpanded(true)}
                        onChange={(ev) => setTxt(ev.target.value)}
                    />
                )}

                {noteType === 'NoteImg' && (
                    <input
                        placeholder="Enter image URL..."
                        value={txt}
                        onFocus={() => setIsExpanded(true)}
                        onChange={(ev) => setTxt(ev.target.value)}
                    />
                )}

                {noteType === 'NoteTodos' && (
                    <div className="todo-input-list">
                        {todos.map((todo, idx) => (
                            <div key={idx} className="todo-row">
                                <i className="fa-regular fa-square"></i>
                                <input
                                    placeholder="List item"
                                    value={todo.txt}
                                    onFocus={() => setIsExpanded(true)}
                                    onChange={(ev) => handleTodoChange(idx, ev.target.value)}
                                    onKeyDown={(ev) => {
                                        if (ev.key === 'Enter') {
                                            ev.preventDefault()
                                            addTodoRow()
                                        }
                                    }}
                                />
                            </div>
                        ))}
                        <button type="button" className="add-row-btn" onClick={addTodoRow}>
                            + List item
                        </button>
                    </div>
                )}

                <div className="note-type-actions">
                    <button title="Set note to Text" type="button" className={noteType === 'NoteTxt' ? 'active' : ''} onClick={() => setNoteType('NoteTxt')}>A</button>
                    <button title="Set note to Image" type="button" className={noteType === 'NoteImg' ? 'active' : ''} onClick={() => setNoteType('NoteImg')}>🖼️</button>
                    <button title="Set Note to List" type="button" className={noteType === 'NoteTodos' ? 'active' : ''} onClick={() => setNoteType('NoteTodos')}>≡</button>
                    <label className="color-picker-label" title="Choose color">
                        <input
                            type="color"
                            onChange={(ev) => setStyle({ backgroundColor: ev.target.value })}
                        />
                        <span className="color-icon">🎨</span>
                    </label>
                    <button className="add-btn">Add</button>
                </div>


            </form>
        </section>
    )
}