const { useState } = React

export function AddNote({ onSaveNote }) {
    const [noteTxt, setNoteTxt] = useState('')

    function onAddNote(ev) {
        ev.preventDefault()
        if (!noteTxt) return
        
        onSaveNote(noteTxt)
        setNoteTxt('')
    }

    return (
        <section className="add-note">
            <form onSubmit={onAddNote}>
                <input 
                    type="text" 
                    placeholder="Enter note..."
                    value={noteTxt}
                    onChange={(ev) => setNoteTxt(ev.target.value)}
                />
                <button>Save</button>
            </form>
        </section>
    )
}