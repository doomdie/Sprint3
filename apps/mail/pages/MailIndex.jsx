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

    return <section className="container">
        {/* Toggle read/unread on right-click */}
        {mails && <MailList mails={mails} onToggleRead={onToggleRead} />}

    </section>
}

