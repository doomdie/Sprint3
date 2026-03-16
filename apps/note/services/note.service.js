import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const STORAGE_KEY = 'notes_db'

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
        info: { url: 'https://i.ibb.co/8nxFKXNP/egg-do.jpg', title: 'Bobi and Me' }
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

export const noteService = {
    query,
    get,
    remove,
    save
}

function query() {
    return storageService.query(STORAGE_KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(gNotes))
                return gNotes
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(STORAGE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(STORAGE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(STORAGE_KEY, note)
    } else {
        return storageService.post(STORAGE_KEY, note)
    }
}