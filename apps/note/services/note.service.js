const KEY = 'NOTE_KEY'
export const noteService = {
    query,
   
}
function query() {
    return Promise.resolve(gNotes)
}
var gNotes = [
    {
        id: 'n101',
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'Fullstack Me Baby!' }
    }, 
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        style: { backgroundColor: '#0d0' },
        info: { url: 'http://some-img/me', title: 'Bobi and Me' }
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        style: { backgroundColor: '#d00' },
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', isDone: true },
                { txt: 'Coding power', isDone: false }
            ]
        }
    }
]