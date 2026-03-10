// mail service

import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'


const MAIL_KEY = 'mailDB'

export const mailService = {
    query,
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
]


_createMails()

function _createMails() {
    let mails_data = utilService.loadFromStorage(MAIL_KEY)
    if (!mails_data || !mails_data.length) {
        mails_data = mails
        utilService.saveToStorage(MAIL_KEY, mails_data)
    }
}

function query() {
    return storageService.query(MAIL_KEY)
}