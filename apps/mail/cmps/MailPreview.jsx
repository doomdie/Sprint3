export function MailPreview({ mail }) {
    return <article className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}>
        <span className="mail-from">{mail.from}</span>
        <span className="mail-subject">{mail.subject}</span>
        <span className="mail-date">{new Date(mail.sentAt).toLocaleDateString()}</span>
    </article>
}