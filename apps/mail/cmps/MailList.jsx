import { MailPreview } from './MailPreview.jsx'


export function MailList({ mails, onToggleRead }) {
    return <section className="mails-list">
        <ul>
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} onToggleRead={onToggleRead} />
                </li>
            )}
        </ul>
    </section>
}
