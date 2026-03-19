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
    // INBOX - received mails
    {
        id: 'e101',
        createdAt: 1773619200000,
        subject: 'Sprint review tomorrow',
        body: 'Reminder: sprint review at 10am. Please prepare your demo.',
        isRead: false,
        sentAt: 1773619200000,
        removedAt: null,
        isStarred: true,
        from: 'boss@work.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e102',
        createdAt: 1773532800000,
        subject: 'Dinner Saturday?',
        body: 'Want to grab sushi this weekend? I know a great place downtown.',
        isRead: false,
        sentAt: 1773532800000,
        removedAt: null,
        isStarred: false,
        from: 'dana@friend.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e103',
        createdAt: 1771718400000,
        subject: 'Your February bank statement',
        body: 'Your monthly statement is ready to view online. Log in to your account to see details.',
        isRead: false,
        sentAt: 1771718400000,
        removedAt: null,
        isStarred: false,
        from: 'bank@mybank.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e104',
        createdAt: 1769040000000,
        subject: 'Welcome back to work!',
        body: 'Hope you had a great holiday. Team meeting at 2pm today in the main conference room.',
        isRead: true,
        sentAt: 1769040000000,
        removedAt: null,
        isStarred: true,
        from: 'hr@company.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e105',
        createdAt: 1741881600000,
        subject: 'Weekend plans?',
        body: 'Hey are you free this Saturday for dinner? We could try that new Italian place.',
        isRead: true,
        sentAt: 1741881600000,
        removedAt: null,
        isStarred: false,
        from: 'dana@friend.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e106',
        createdAt: 1740067200000,
        subject: 'Invoice #4521',
        body: 'Please find attached your invoice for February. Payment is due within 30 days.',
        isRead: false,
        sentAt: 1740067200000,
        removedAt: null,
        isStarred: false,
        from: 'billing@company.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e107',
        createdAt: 1737388800000,
        subject: 'Happy New Year!',
        body: 'Wishing you a wonderful 2026! May this year bring you success and happiness.',
        isRead: true,
        sentAt: 1737388800000,
        removedAt: null,
        isStarred: false,
        from: 'friend@gmail.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e108',
        createdAt: 1710489600000,
        subject: 'Security alert',
        body: 'We noticed a new sign-in to your account from a new device in Tel Aviv, Israel.',
        isRead: true,
        sentAt: 1710489600000,
        removedAt: null,
        isStarred: true,
        from: 'security@google.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e109',
        createdAt: 1709538000000,
        subject: 'Your order has shipped!',
        body: 'Your package is on its way and should arrive within 3-5 business days. Track your order online.',
        isRead: true,
        sentAt: 1709538000000,
        removedAt: null,
        isStarred: false,
        from: 'shipping@amazon.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e110',
        createdAt: 1551133930500,
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes. Its been too long since we last met.',
        isRead: true,
        sentAt: 1551133930594,
        removedAt: null,
        isStarred: false,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e111',
        createdAt: 1551133930600,
        subject: 'Meeting Tomorrow',
        body: 'Dont forget our meeting at 10am in the main office. Bring your laptop.',
        isRead: true,
        sentAt: 1551133930700,
        removedAt: null,
        isStarred: false,
        from: 'boss@work.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e112',
        createdAt: 1609459200000,
        subject: 'Account verification',
        body: 'Please verify your email address by clicking the link below.',
        isRead: true,
        sentAt: 1609459200000,
        removedAt: null,
        isStarred: false,
        from: 'noreply@github.com',
        to: 'user@appsus.com'
    },

    // SENT - mails from us
    {
        id: 'e201',
        createdAt: 1773619200000,
        subject: 'Re: Sprint review tomorrow',
        body: 'Got it, I will have the demo ready. See you at 10.',
        isRead: true,
        sentAt: 1773619200000,
        removedAt: null,
        isStarred: false,
        from: 'user@appsus.com',
        to: 'boss@work.com'
    },
    {
        id: 'e202',
        createdAt: 1773532800000,
        subject: 'Sounds great!',
        body: 'Sushi sounds perfect. Lets meet at 7pm?',
        isRead: true,
        sentAt: 1773532800000,
        removedAt: null,
        isStarred: false,
        from: 'user@appsus.com',
        to: 'dana@friend.com'
    },
    {
        id: 'e203',
        createdAt: 1771718400000,
        subject: 'Question about the project',
        body: 'Hey, I had a question about the database schema. Can we discuss tomorrow?',
        isRead: true,
        sentAt: 1771718400000,
        removedAt: null,
        isStarred: false,
        from: 'user@appsus.com',
        to: 'team@work.com'
    },
    {
        id: 'e204',
        createdAt: 1770422400000,
        subject: 'Check out this article',
        body: 'Found this great article about React hooks, thought you might like it.',
        isRead: true,
        sentAt: 1770422400000,
        removedAt: null,
        isStarred: true,
        from: 'user@appsus.com',
        to: 'friend@gmail.com'
    },
    {
        id: 'e205',
        createdAt: 1769040000000,
        subject: 'Thanks for the update',
        body: 'Thanks for letting me know. I will review the documents tonight.',
        isRead: true,
        sentAt: 1769040000000,
        removedAt: null,
        isStarred: false,
        from: 'user@appsus.com',
        to: 'hr@company.com'
    },
    {
        id: 'e206',
        createdAt: 1741881600000,
        subject: 'Happy birthday!',
        body: 'Happy birthday! Hope you have an amazing day. Lets celebrate soon!',
        isRead: true,
        sentAt: 1741881600000,
        removedAt: null,
        isStarred: false,
        from: 'user@appsus.com',
        to: 'dana@friend.com'
    },
    {
        id: 'e207',
        createdAt: 1710316800000,
        subject: 'Hey, how are you?',
        body: 'Just wanted to check in and see how things are going with you.',
        isRead: true,
        sentAt: 1710316800000,
        removedAt: null,
        isStarred: false,
        from: 'user@appsus.com',
        to: 'gal@friend.com'
    },
    {
        id: 'e208',
        createdAt: 1710403200000,
        subject: 'Project update',
        body: 'Here is the latest update on the project we discussed last week.',
        isRead: true,
        sentAt: 1710403200000,
        removedAt: null,
        isStarred: false,
        from: 'user@appsus.com',
        to: 'team@work.com'
    },
    {
        id: 'e209',
        createdAt: 1609459200000,
        subject: 'Resume attached',
        body: 'Hi, please find my updated resume attached. Looking forward to hearing from you.',
        isRead: true,
        sentAt: 1609459200000,
        removedAt: null,
        isStarred: false,
        from: 'user@appsus.com',
        to: 'jobs@techcompany.com'
    },
    {
        id: 'e210',
        createdAt: 1577836800000,
        subject: 'Happy holidays!',
        body: 'Wishing you happy holidays and a great new year ahead!',
        isRead: true,
        sentAt: 1577836800000,
        removedAt: null,
        isStarred: false,
        from: 'user@appsus.com',
        to: 'family@home.com'
    },

    // TRASH - deleted mails
    {
        id: 'e301',
        createdAt: 1773446400000,
        subject: 'You won a prize!',
        body: 'Congratulations! You have been selected to win a brand new iPhone. Click here to claim.',
        isRead: true,
        sentAt: 1773446400000,
        removedAt: 1773532800000,
        isStarred: false,
        from: 'scam@lottery.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e302',
        createdAt: 1771632000000,
        subject: 'Limited time offer!',
        body: 'Buy now and get 90% off on all products. This offer expires in 24 hours!',
        isRead: true,
        sentAt: 1771632000000,
        removedAt: 1771718400000,
        isStarred: false,
        from: 'spam@deals.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e303',
        createdAt: 1769040000000,
        subject: 'Old newsletter',
        body: 'This is your weekly newsletter with the latest updates and tips.',
        isRead: true,
        sentAt: 1769040000000,
        removedAt: 1769126400000,
        isStarred: false,
        from: 'news@newsletter.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e304',
        createdAt: 1740067200000,
        subject: 'Expired promotion',
        body: 'Your exclusive discount code has expired. Check out our new deals!',
        isRead: true,
        sentAt: 1740067200000,
        removedAt: 1740153600000,
        isStarred: false,
        from: 'promo@shop.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e305',
        createdAt: 1737388800000,
        subject: 'Subscription cancelled',
        body: 'Your subscription has been successfully cancelled. We are sorry to see you go.',
        isRead: true,
        sentAt: 1737388800000,
        removedAt: 1737475200000,
        isStarred: false,
        from: 'support@streaming.com',
        to: 'user@appsus.com'
    },

    // DRAFTS - unsent mails
    {
        id: 'e401',
        createdAt: 1773619200000,
        subject: 'Job application',
        body: 'Dear hiring manager, I am writing to express my interest in the',
        isRead: true,
        sentAt: null,
        removedAt: null,
        isStarred: false,
        from: 'user@appsus.com',
        to: 'careers@bigtech.com'
    },
    {
        id: 'e402',
        createdAt: 1773532800000,
        subject: 'Feedback on the design',
        body: 'Hey team, I reviewed the latest mockups and I think we should',
        isRead: true,
        sentAt: null,
        removedAt: null,
        isStarred: false,
        from: 'user@appsus.com',
        to: 'design@work.com'
    },
    {
        id: 'e403',
        createdAt: 1771718400000,
        subject: '',
        body: 'Remember to ask about the deadline',
        isRead: true,
        sentAt: null,
        removedAt: null,
        isStarred: false,
        from: 'user@appsus.com',
        to: ''
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
                mails = mails.filter(mail =>
                    (mail.from === loggedinUser.email || (mail.replies && mail.replies.length > 0))
                    && mail.sentAt && !mail.removedAt
                )
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