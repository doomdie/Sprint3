// mail service

import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'


const MAIL_KEY = 'mailDB'

export const mailService = {
    query,
    get,
    save,
    remove,
    moveToTrash,
}


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}


const mails = [
    {
        id: 'e101',
        createdAt: 1551133930500,
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e102',
        createdAt: 1551133930600,
        subject: 'Meeting Tomorrow',
        body: 'Don\'t forget our meeting at 10am',
        isRead: true,
        sentAt: 1551133930700,
        removedAt: null,
        from: 'boss@work.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e103',
        createdAt: 1709538000000,
        subject: 'Your order has shipped!',
        body: 'Your package is on its way and should arrive within 3-5 business days',
        isRead: false,
        sentAt: 1709538000000,
        removedAt: null,
        from: 'shipping@amazon.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e104',
        createdAt: 1710316800000,
        subject: 'Hey, how are you?',
        body: 'Just wanted to check in and see how things are going with you',
        isRead: true,
        sentAt: 1710316800000,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'gal@friend.com'
    },
    {
        id: 'e105',
        createdAt: 1710403200000,
        subject: 'Project update',
        body: 'Here is the latest update on the project we discussed last week',
        isRead: true,
        sentAt: 1710403200000,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'team@work.com'
    },
    {
        id: 'e106',
        createdAt: 1710489600000,
        subject: 'Security alert',
        body: 'We noticed a new sign-in to your account from a new device',
        isRead: false,
        sentAt: 1710489600000,
        removedAt: null,
        from: 'security@google.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e107',
        createdAt: 1737388800000,
        subject: 'Happy New Year!',
        body: 'Wishing you a wonderful 2026!',
        isRead: true,
        sentAt: 1737388800000,
        removedAt: null,
        from: 'friend@gmail.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e108',
        createdAt: 1740067200000,
        subject: 'Invoice #4521',
        body: 'Please find attached your invoice for February',
        isRead: false,
        sentAt: 1740067200000,
        removedAt: null,
        from: 'billing@company.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e109',
        createdAt: 1741881600000,
        subject: 'Weekend plans?',
        body: 'Hey are you free this Saturday for dinner?',
        isRead: false,
        sentAt: 1741881600000,
        removedAt: null,
        from: 'dana@friend.com',
        to: 'user@appsus.com'
    },
]

_createMails()

function _createMails() {
    let mails_data = utilService.loadFromStorage(MAIL_KEY)
    if (!mails_data || !mails_data.length) {
        mails_data = mails
        utilService.saveToStorage(MAIL_KEY, mails_data)
    }
}

function query(filterBy = {}, sortBy = { field: 'sentAt', dir: -1 }) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.status === 'inbox') {
                mails = mails.filter(mail => mail.to === loggedinUser.email && !mail.removedAt)
            } else if (filterBy.status === 'starred') {
                mails = mails.filter(mail => mail.isStarred && !mail.removedAt)
            } else if (filterBy.status === 'sent') {
                mails = mails.filter(mail => mail.from === loggedinUser.email && mail.sentAt && !mail.removedAt)
            } else if (filterBy.status === 'draft') {
                mails = mails.filter(mail => !mail.sentAt && !mail.removedAt)
            } else if (filterBy.status === 'trash') {
                mails = mails.filter(mail => mail.removedAt)
            }

            if (filterBy.txt) {
                const txt = filterBy.txt.toLowerCase()
                mails = mails.filter(mail =>
                    mail.from.toLowerCase().includes(txt) ||
                    mail.subject.toLowerCase().includes(txt) ||
                    mail.body.toLowerCase().includes(txt)
                )
            }

            if (filterBy.isRead !== undefined) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }

            mails.sort((a, b) => {
                if (sortBy.field === 'subject') {
                    return a.subject.localeCompare(b.subject) * sortBy.dir
                }
                const dateA = a.sentAt || a.createdAt
                const dateB = b.sentAt || b.createdAt
                return (dateB - dateA) * sortBy.dir
            })

            return mails
        })
}


function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function moveToTrash(mailId) {
    return get(mailId)
        .then(mail => {
            mail.removedAt = Date.now()
            console.log('Moving to trash:', mail.id, 'removedAt:', mail.removedAt)
            return save(mail)
        })
}