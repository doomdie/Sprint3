
export function MailSidebar({ onSetCompose, unreadCount, filterBy, onSetFilterBy }) {
    function onSelectFolder(status) {
        onSetFilterBy(prev => ({ ...prev, status }))
    }

    return <section className="mail-sidebar">
        <button onClick={onSetCompose}>Compose</button>
        <nav className="folder-list">
            <div className={`folder ${filterBy.status === 'inbox' ? 'active' : ''}`} onClick={() => onSelectFolder('inbox')}>Inbox ({unreadCount})</div>
            <div className="folder">Starred</div>
            <div className={`folder ${filterBy.status === 'sent' ? 'active' : ''}`} onClick={() => onSelectFolder('sent')}>Sent</div>
            <div className={`folder ${filterBy.status === 'draft' ? 'active' : ''}`} onClick={() => onSelectFolder('draft')}>Drafts</div>
            <div className={`folder ${filterBy.status === 'trash' ? 'active' : ''}`} onClick={() => onSelectFolder('trash')}>Trash</div>
        </nav>
    </section>
}


