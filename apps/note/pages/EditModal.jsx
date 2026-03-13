export function EditModal({ note, onClose, onSave }) {
    const [txt, setTxt] = React.useState(note.info.txt || '')

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
                <h3>Edit Note</h3>
                <textarea 
                    value={txt} 
                    onChange={(ev) => setTxt(ev.target.value)}
                />
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={() => onSave({ ...note.info, txt })}>Save</button>
                </div>
            </div>
        </div>
    )
}