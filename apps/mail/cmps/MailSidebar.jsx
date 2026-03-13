
export function MailSidebar({ onSetCompose, unreadCount, filterBy, onSetFilterBy }) {
    function onSelectFolder(status) {
        onSetFilterBy(prev => ({ ...prev, status }))
    }

    return <section className="mail-sidebar">
        <button className="compose-btn" onClick={onSetCompose}>Compose</button>
        <nav className="folder-list">

            <div className={`folder ${filterBy.status === 'inbox' ? 'active' : ''}`}
                title="Inbox"
                onClick={() => onSelectFolder('inbox')}>
                <img src="assets/img/inbox.svg" alt="" />
                <span>Inbox</span>
                <span className="folder-count">{unreadCount}</span>
            </div>

            <div className="folder" title="Starred">
                <img src="assets/img/star.svg" alt="" />
                <span>Starred</span>
            </div>

            <div className={`folder ${filterBy.status === 'sent' ? 'active' : ''}`}
                title="Sent"
                onClick={() => onSelectFolder('sent')}>
                <img src="assets/img/send.svg" alt="" />
                <span>Sent</span>
            </div>

            <div className={`folder ${filterBy.status === 'draft' ? 'active' : ''}`}
                title="Draft"
                onClick={() => onSelectFolder('draft')}>
                <img src="assets/img/draft.svg" alt="" />
                <span>Drafts</span>
            </div>

            <div className={`folder ${filterBy.status === 'trash' ? 'active' : ''}`}
                title="Trash"
                onClick={() => onSelectFolder('trash')}>
                <img src="assets/img/delete.svg" alt="" />
                <span>Trash</span>
            </div>
        </nav>
    </section>
}



