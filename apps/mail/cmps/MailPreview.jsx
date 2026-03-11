
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onToggleRead }) {

    function onRightClick(ev) {
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
            <span className="mail-date">{new Date(mail.sentAt).toLocaleDateString()}</span>
        </article>
    </Link>
}