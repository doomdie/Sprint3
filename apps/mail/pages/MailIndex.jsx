const { useState, useEffect } = React
const { Outlet, useParams } = ReactRouterDOM


import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'


export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isCompose, setIsCompose] = useState(false)
    const params = useParams()

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

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => loadMails())
    }

    const unreadCount = mails ? mails.filter(mail => !mail.isRead).length : 0

    if (!mails) return <div>Loading...</div>

    return <section className="container">
        {/* Toggle read/unread on right-click */}
        <h3>Inbox ({unreadCount} unread)</h3>
        <button onClick={() => setIsCompose(true)}>Compose</button>

        {params.mailId ? <Outlet /> :
        mails &&
            <MailList
                mails={mails}
                onToggleRead={onToggleRead}
                onRemoveMail={onRemoveMail}
            />}

        {isCompose &&
            <MailCompose
                onClose={() => setIsCompose(false)}
                onSendMail={onSendMail}
            />}

    </section>
}

