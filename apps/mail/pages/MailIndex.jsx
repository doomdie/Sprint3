const { useState, useEffect } = React

import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'


export function MailIndex() {
    const [mails, setMails] = useState(null)

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

    const unreadCount = mails ? mails.filter(mail => !mail.isRead).length : 0
    if (!mails) return <div>Loading...</div>
    return <section className="container">
        {/* Toggle read/unread on right-click */}
        <h3>Inbox ({unreadCount} unread)</h3>
        {mails && <MailList mails={mails} onToggleRead={onToggleRead} />}

    </section>
}

