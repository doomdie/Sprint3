
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onToggleRead, onRemoveMail, onToggleStar, searchTxt, status, onOpenDraft }) {


    function onDelete(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        onRemoveMail(mail.id)
    }

    function onToggleReadStatus(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        onToggleRead(mail)
    }

    function onClickStar(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        onToggleStar(mail)
    }

    function onClickMail(ev) {
        if (!mail.sentAt) {
            ev.preventDefault()
            onOpenDraft(mail)
        }
    }

    function highlightText(text, searchTxt) {
        if (!searchTxt) return text
        const regex = new RegExp(`(${searchTxt})`, 'gi')
        const parts = text.split(regex)
        return parts.map((part, i) =>
            part.toLowerCase() === searchTxt.toLowerCase()
                ? <span key={i} className="highlight">{part}</span>
                : part
        )
    }

    function getDisplayName() {
        if (status === 'draft') return 'Draft'
        if (status === 'sent') return 'To: ' + mail.to
        if (status === 'starred' && mail.from === 'user@appsus.com') return 'me'
        if (status === 'trash' && mail.from === 'user@appsus.com') return 'me'
        if (status === 'inbox') return mail.from
        return mail.from
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp)
        const now = new Date()

        if (date.getFullYear() === now.getFullYear()) {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }
        return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' })
    }



    return <Link to={`/mail/${mail.id}`} className="mails-preview-link" onClick={onClickMail}>
        <article
            className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}>

            <button className={`mail-star-btn ${mail.isStarred ? 'starred' : ''}`}
                onClick={onClickStar}>
                <img src={`assets/img/${mail.isStarred ? 'star_filled' : 'star'}.svg`}
                    alt="star"
                    title={mail.isStarred ? 'Starred' : 'Not starred'} />
            </button>

            <span className="mail-from">
                {!mail.sentAt
                    ? <span className="draft-label">Draft</span>
                    : highlightText(getDisplayName(), searchTxt)}
            </span>

            <span className="mail-subject">
                <span className="mail-subject-text">{highlightText(mail.subject, searchTxt)}</span>
                <span className="mail-body-preview"> - {highlightText(mail.body, searchTxt)}</span>
            </span>

            <span className="mail-actions">
                <span className="mail-date">{formatDate(mail.sentAt || mail.createdAt)}</span>

                <button className="mail-delete-btn icon-hover-bg" onClick={onDelete}>
                    <img src="assets/img/delete.svg" alt="delete" title="Delete" />
                </button>

                <button className="mail-read-btn icon-hover-bg" onClick={onToggleReadStatus}>
                    <img src={`assets/img/${mail.isRead ? 'unread' : 'read'}.svg`} alt="toggle read" title={mail.isRead ? 'Mark as unread' : 'Mark as read'} />
                </button>
            </span>

        </article>
    </Link>
}