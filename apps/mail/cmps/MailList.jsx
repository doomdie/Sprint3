import { MailPreview } from './MailPreview.jsx'


export function MailList({ mails, onToggleRead, onRemoveMail, onToggleStar, searchTxt }) {
    return <section className="mails-list">
        <ul>
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview
                        mail={mail}
                        onToggleRead={onToggleRead}
                        onRemoveMail={onRemoveMail}
                        onToggleStar={onToggleStar}
                        searchTxt={searchTxt}
                    />
                </li>
            )}
        </ul>
    </section>
}
