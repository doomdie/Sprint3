
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onToggleRead, onRemoveMail }) {

    function onRightClick(ev) {
        ev.preventDefault()
        onToggleRead(mail)
    }

    function onDelete(ev) {
        ev.preventDefault()
        if (confirm('Are you sure you wish to delete this mail?')) {
            onRemoveMail(mail.id)
        }
    }

    function onToggleReadStatus(ev) {
        ev.preventDefault()
        onToggleRead(mail)
    }


    return <Link to={`/mail/${mail.id}`} className="mails-preview-link">
        <article
            className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}
            onContextMenu={onRightClick}
        >
            <span className="mail-from">{mail.from}</span>

            <span className="mail-subject">
                {mail.subject}
                <span className="mail-body-preview"> - {mail.body}</span>
            </span>

            <span className="mail-actions">
                <span className="mail-date">{new Date(mail.sentAt).toLocaleDateString()}</span>
                <button className="mail-delete-btn" onClick={onDelete}>
                    <img src="assets/img/delete.svg" alt="delete" title="Delete" />
                </button>
                <button className="mail-read-btn" onClick={onToggleReadStatus}>
                    <img src={`assets/img/${mail.isRead ? 'unread' : 'read'}.svg`} alt="toggle read" title={mail.isRead ? 'Mark as unread' : 'Mark as read'} />
                </button>

            </span>

        </article>
    </Link>
}