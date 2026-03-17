const { useState, useEffect } = React
const { Outlet, useParams } = ReactRouterDOM


import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailSidebar } from '../cmps/MailSidebar.jsx'

import { mailService } from '../services/mail.service.js'


export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isCompose, setIsCompose] = useState(false)
    const [filterBy, setFilterBy] = useState({ status: 'inbox', txt: '', isRead: undefined })
    const [unreadCount, setUnreadCount] = useState(0)
    const [sortBy, setSortBy] = useState({ field: 'sentAt', dir: 1 })
    const [draftToEdit, setDraftToEdit] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadMails()
    }, [filterBy, params.mailId, sortBy])


    function loadMails() {
        mailService.query(filterBy, sortBy)
            .then(mails => setMails(mails))
        loadUnreadCount()
    }

    function onToggleRead(mail) {
        mail.isRead = !mail.isRead
        mailService.save(mail)
            .then(() => loadMails())
    }

    function onToggleStar(mail) {
        mail.isStarred = !mail.isStarred
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
                setDraftToEdit(null)
                loadMails()
            })
    }

    function onRemoveMail(mailId) {
        if (filterBy.status === 'trash') {
            if (!confirm('Are you sure you want to permanently delete this email?')) return
            mailService.remove(mailId)
                .then(() => loadMails())
        } else {
            if (!confirm('Are you sure you want to move this to Trash?')) return
            mailService.moveToTrash(mailId)
                .then(() => loadMails())
        }
    }

    function loadUnreadCount() {
        mailService.query({ status: 'inbox', txt: '' })
            .then(inboxMails => {
                setUnreadCount(inboxMails.filter(mail => !mail.isRead).length)
            })
    }

    function onSetSort(field) {
        setSortBy(prev => ({
            field,
            dir: prev.field === field ? prev.dir * -1 : 1
        }))
    }

    function onOpenDraft(mail) {
        setDraftToEdit(mail)
        setIsCompose(true)
    }

    function onCloseDraft(draft) {
        if (draft && (draft.to || draft.subject || draft.body)) {
            draft.from = 'user@appsus.com'
            draft.isRead = true
            draft.sentAt = null
            draft.removedAt = null
            if (!draft.createdAt) draft.createdAt = Date.now()
            mailService.save(draft)
                .then(() => loadMails())
        }
        setIsCompose(false)
        setDraftToEdit(null)

    }

    if (!mails) return <div>Loading...</div>

    return <React.Fragment>
        <MailHeader filterBy={filterBy} onSetFilterBy={setFilterBy} />

        <section className="mail-index">

            <MailSidebar
                onSetCompose={() => setIsCompose(true)}
                unreadCount={unreadCount}
                filterBy={filterBy}
                onSetFilterBy={setFilterBy}
            />

            <div className="mail-content">
                {!params.mailId && <div className="sort-buttons">
                    <button onClick={() => onSetSort('sentAt')}>
                        Date
                        {sortBy.field === 'sentAt' &&
                            <img src={`assets/img/arrow_${sortBy.dir === 1 ? 'up' : 'down'}_small.svg`} alt="sort" />}
                    </button>

                    <button onClick={() => onSetSort('subject')}>
                        Subject
                        {sortBy.field === 'subject' &&
                            <img src={`assets/img/arrow_${sortBy.dir === 1 ? 'up' : 'down'}_small.svg`} alt="sort" />}
                    </button>
                </div>}

                {params.mailId ? <Outlet /> :
                    mails &&
                    <MailList
                        mails={mails}
                        onToggleRead={onToggleRead}
                        onRemoveMail={onRemoveMail}
                        onToggleStar={onToggleStar}
                        searchTxt={filterBy.txt}
                        status={filterBy.status}
                        onOpenDraft={onOpenDraft}
                    />}
            </div>


            {isCompose &&
                <MailCompose
                    onClose={onCloseDraft}
                    onSendMail={onSendMail}
                    draft={draftToEdit}
                />}

        </section>
    </React.Fragment>

}

