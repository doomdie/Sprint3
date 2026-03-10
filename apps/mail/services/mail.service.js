// mail service

import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'


const MAIL_KEY = 'mailDB'

export const mailService = {
    query,
    get,
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
        .then(mails => {
            mails.sort((a, b) => b.sentAt - a.sentAt)
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}