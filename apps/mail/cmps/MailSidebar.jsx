
export function MailSidebar({ onSetCompose, unreadCount, draftCount, filterBy, onSetFilterBy }) {
    function onSelectFolder(status) {
        onSetFilterBy(prev => ({ ...prev, status }))
    }

    return <section className="mail-sidebar">
        <button className="compose-btn" onClick={onSetCompose}>
            <img src="assets/img/edit.svg" alt="compose" />
            Compose
        </button>
        <nav className="folder-list">

            <div className={`folder ${filterBy.status === 'inbox' ? 'active' : ''}`}
                title="Inbox"
                onClick={() => onSelectFolder('inbox')}>
                <img src={`assets/img/${filterBy.status === 'inbox' ? 'inbox_filled' : 'inbox'}.svg`} alt="" />                <span>Inbox</span>
                <span className="folder-count">{unreadCount}</span>
            </div>

            <div className={`folder ${filterBy.status === 'starred' ? 'active' : ''}`}
                title="Starred"
                onClick={() => onSelectFolder('starred')}>
                <img src={`assets/img/${filterBy.status === 'starred' ? 'star_filled' : 'star'}.svg`} alt="" />
                <span>Starred</span>
            </div>

            <div className={`folder ${filterBy.status === 'sent' ? 'active' : ''}`}
                title="Sent"
                onClick={() => onSelectFolder('sent')}>
                <img src={`assets/img/${filterBy.status === 'sent' ? 'send_filled' : 'send'}.svg`} alt="" />
                <span>Sent</span>
            </div>

            <div className={`folder ${filterBy.status === 'draft' ? 'active' : ''}`}
                title="Draft"
                onClick={() => onSelectFolder('draft')}>
                <img src={`assets/img/${filterBy.status === 'draft' ? 'draft_filled' : 'draft'}.svg`} alt="" />
                <span>Drafts</span>
                <span className="folder-count">{draftCount}</span>
            </div>

            <div className={`folder ${filterBy.status === 'trash' ? 'active' : ''}`}
                title="Trash"
                onClick={() => onSelectFolder('trash')}>
                <img src={`assets/img/${filterBy.status === 'trash' ? 'delete_filled' : 'delete'}.svg`} alt="" />
                <span>Trash</span>
            </div>
        </nav>
    </section>
}



