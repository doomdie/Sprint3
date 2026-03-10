import { MailPreview } from './MailPreview.jsx'


export function MailList({ mails }) {
    return <section className="mails-list">
        <ul>
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                </li>
            )}
        </ul>
    </section>
}
