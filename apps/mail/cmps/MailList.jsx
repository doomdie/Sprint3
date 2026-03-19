import { MailPreview } from './MailPreview.jsx'


export function MailList({ mails, onToggleRead, onRemoveMail, onToggleStar, searchTxt, status, onOpenDraft }) {
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
                        status={status}
                        onOpenDraft={onOpenDraft}
                    />
                </li>
            )}
        </ul>
    </section>
}
