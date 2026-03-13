const { useState, useEffect } = React
const { Outlet, useParams } = ReactRouterDOM


import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailSidebar } from '../cmps/MailSidebar.jsx'

import { mailService } from '../services/mail.service.js'


export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isCompose, setIsCompose] = useState(false)
    const [filterBy, setFilterBy] = useState({ status: 'inbox', txt: '' })
    const [unreadCount, setUnreadCount] = useState(0)
    const params = useParams()

    useEffect(() => {
        loadMails()
    }, [filterBy, params.mailId])


    function loadMails() {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
        loadUnreadCount()
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

    function loadUnreadCount() {
        mailService.query({ status: 'inbox', txt: '' })
            .then(inboxMails => {
                setUnreadCount(inboxMails.filter(mail => !mail.isRead).length)
            })
    }

    if (!mails) return <div>Loading...</div>

    return <section className="mail-index">
        <MailSidebar
            onSetCompose={() => setIsCompose(true)}
            unreadCount={unreadCount}
            filterBy={filterBy}
            onSetFilterBy={setFilterBy}
        />

        <div className="mail-content">
            {params.mailId ? <Outlet /> :
                mails &&
                <MailList
                    mails={mails}
                    onToggleRead={onToggleRead}
                    onRemoveMail={onRemoveMail}
                />}
        </div>


        {isCompose &&
            <MailCompose
                onClose={() => setIsCompose(false)}
                onSendMail={onSendMail}
            />}

    </section>
}

