const { useParams, useNavigate, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const [mailIds, setMailIds] = useState([])
    const [isReply, setIsReply] = useState(false)
    const [replyBody, setReplyBody] = useState('')
    const [currentStatus, setCurrentStatus] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const folderFromUrl = searchParams.get('folder')


    useEffect(() => {
        setIsReply(false)
        mailService.get(mailId)
            .then(mail => {
                if (!mail.sentAt) {
                    navigate('/mail')
                    return
                }
                if (!mail.isRead) {
                    mail.isRead = true
                    mailService.save(mail)
                }
                setMail(mail)
                mailService.query({ status: folderFromUrl || 'inbox' })
                    .then(mails => setMailIds(mails.map(m => m.id)))
            })
    }, [mailId])

    function getMailStatus(mail) {
        if (mail.removedAt) return 'trash'
        if (!mail.sentAt) return 'draft'
        if (mail.isStarred) return 'starred'
        if (mail.from === 'user@appsus.com') return 'sent'
        return 'inbox'
    }

    function onDelete() {
        const status = getMailStatus(mail)
        if (status === 'trash') {
            if (!confirm('Are you sure you want to permanently delete this email?')) return
            mailService.remove(mailId)
                .then(() => navigate('/mail'))
        } else {
            if (!confirm('Are you sure you want to move this to Trash?')) return
            mailService.moveToTrash(mailId)
                .then(() => navigate('/mail'))
        }
    }

    function onMarkUnread() {
        mail.isRead = false
        mailService.save(mail)
            .then(() => navigate('/mail'))
    }

    function onToggleStar() {
        mail.isStarred = !mail.isStarred
        mailService.save(mail)
            .then(saved => setMail({ ...saved }))
    }

    function onNext() {
        const idx = mailIds.indexOf(mailId)
        if (idx < mailIds.length - 1) {
            navigate('/mail/' + mailIds[idx + 1] + '?folder=' + folderFromUrl)
        }
    }

    function onPrev() {
        const idx = mailIds.indexOf(mailId)
        if (idx > 0) {
            navigate('/mail/' + mailIds[idx - 1] + '?folder=' + folderFromUrl)
        }
    }

    function onSendReply() {
        console.log('sent')
    }

    function onDiscardReply() {
        setReplyBody('')
        setIsReply(false)
    }


    function formatDetailDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }


    if (!mail) return <div className="loading">Loading</div>

    const isSentByMe = mail.from === 'user@appsus.com'


    return <section className="mail-details">
        <div className="mail-details-toolbar">
            <button className="icon-hover-bg" onClick={() => navigate('/mail')} title="Back">
                <img src="assets/img/arrow_back.svg" alt="back" />
            </button>

            <button className="icon-hover-bg" onClick={onDelete} title="Delete">
                <img src="assets/img/delete.svg" alt="delete" />
            </button>

            <span className="toolbar-separator"></span>

            <button className="icon-hover-bg" onClick={onMarkUnread} title="Mark as unread">
                <img src="assets/img/unread.svg" alt="mark unread" />
            </button>

            <div className="mail-details-nav">
                {mailIds.length > 0 && <span className="mail-position">
                    {mailIds.length - mailIds.indexOf(mailId)} of {mailIds.length}
                </span>}

                <button
                    className="icon-hover-bg"
                    onClick={onNext}
                    title="Newer"
                    disabled={mailIds.indexOf(mailId) === mailIds.length - 1}

                >
                    <img src="assets/img/chevron_backward.svg" alt="newer" />
                </button>

                <button
                    className="icon-hover-bg"
                    onClick={onPrev}
                    title="Older"
                    disabled={mailIds.indexOf(mailId) === 0}
                >
                    <img src="assets/img/chevron_forward.svg" alt="older" />
                </button>
            </div>
        </div>

        <h2 className="mail-details-subject">{mail.subject}</h2>

        <div className="mail-details-header">
            <div className="sender-avatar">{isSentByMe ? 'M' : mail.from[0].toUpperCase()}</div>

            <div className="sender-info">
                <div className="sender-line">
                    <span className="sender-name">{isSentByMe ? 'Mahatma Appsus' : mail.from}</span>
                    <span className="sender-email">&lt;{mail.from}&gt;</span>
                    <span className="mail-details-date">{formatDetailDate(mail.sentAt || mail.createdAt)}</span>
                    <button className="icon-hover-bg" onClick={onToggleStar}>
                        <img className={mail.isStarred ? 'starred' : ''}
                            src={`assets/img/${mail.isStarred ? 'star_filled' : 'star'}.svg`}
                            alt="star" />
                    </button>
                </div>
                <span className="mail-details-to">{isSentByMe ? 'to ' + mail.to : 'to me'}</span>
            </div>
        </div>

        <div className="mail-details-body">
            <p>{mail.body}</p>
        </div>

        {
            !isReply && <div className="mail-reply-actions">
                <button className="reply-btn" onClick={() => setIsReply(true)}>
                    <img src="assets/img/reply.svg" alt="reply" />
                    Reply
                </button>
            </div>
        }

        {
            isReply && (
                <div className="reply-compose-wrapper">
                    <div className="sender-avatar">M</div>

                    <div className="mail-reply-form">
                        <div className="reply-header">
                            <span>{isSentByMe ? mail.to : mail.from}</span>
                        </div>

                        <textarea
                            placeholder="Write your reply..."
                            value={replyBody}
                            onChange={(ev) => setReplyBody(ev.target.value)}
                        />

                        <div className="reply-footer">
                            <button className="send-btn" onClick={onSendReply}>Send</button>

                            <button
                                className="icon-hover-bg"
                                onClick={onDiscardReply}
                                title="Discard draft"
                            >
                                <img src="assets/img/delete.svg" alt="discard" />
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    </section >
}