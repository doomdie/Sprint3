
export function NotePreview({ note }) {
    
var testNote = [
    {
        id: 'n101',
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'Fullstack Me Baby!' }
    }, ]
    return <article className='note-prev'>
        <h3>{note.info.txt}</h3>
        <img src={note.thumbnail} alt="" />
        {/* <p><span className='bold-txt'>Price:</span> {listPrice.amount}</p>
        <p><span className='bold-txt'>Currency:</span> {listPrice.currencyCode}</p> */}
        {/* {listPrice.isOnSale && <img className="on-sale-icon" src="/assets/notesImages/onSale.png.png" alt="" />} */}
    </article>

}