const { useState, useEffect } = React

import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'


export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isCompose, setIsCompose] = useState(false)

    useEffect(() => {
        loadMails()
    }, [])


    function loadMails() {
        mailService.query()
            .then(mails => setMails(mails))
    }

    function onToggleRead(mail) {
        mail.isRead = !mail.isRead
        mailService.save(mail)
            .then(() => loadMails())
    }

    function onSendMail(newMail) {
        newMail.from = 'user@appsus.com'
        newMail.isRead = true
        newMail.sentAt = Date.now()
        newMail.removedAt = null
        newMail.createdAt = Date.now()
        mailService.save(newMail)
            .then(() => {
                setIsCompose(false)
                loadMails()
            })
    }

    const unreadCount = mails ? mails.filter(mail => !mail.isRead).length : 0

    if (!mails) return <div>Loading...</div>

    return <section className="container">
        {/* Toggle read/unread on right-click */}
        <h3>Inbox ({unreadCount} unread)</h3>
        <button onClick={() => setIsCompose(true)}>Compose</button>

        {mails &&
            <MailList
                mails={mails}
                onToggleRead={onToggleRead}
            />}

        {isCompose &&
            <MailCompose
                onClose={() => setIsCompose(false)}
                onSendMail={onSendMail}
            />}

    </section>
}

