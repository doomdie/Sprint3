const { useState } = React


export function MailSidebar({ onSetCompose, unreadCount, draftCount, filterBy, onSetFilterBy, isCollapsed }) {
    const [isHovered, setIsHovered] = useState(false)
    const [hoverTimer, setHoverTimer] = useState(null)


    function onSelectFolder(status) {
        onSetFilterBy(prev => ({ ...prev, status }))
    }

    const showFull = !isCollapsed || isHovered

    return <div className={`mail-sidebar-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
        <section
            className={`mail-sidebar ${isCollapsed ? 'collapsed' : ''} ${isHovered && isCollapsed ? 'sidebar-hover' : ''}`}
            onMouseEnter={() => {
                if (isCollapsed) {
                    const timer = setTimeout(() => setIsHovered(true), 500)
                    setHoverTimer(timer)
                }
            }}
            onMouseLeave={() => {
                clearTimeout(hoverTimer)
                setIsHovered(false)
            }}
        >

            <button className="compose-btn" onClick={onSetCompose}>
                <img src="assets/img/edit.svg" alt="compose" />
                {showFull && 'Compose'}
            </button>

            <nav className="folder-list">

                <div className={`folder ${filterBy.status === 'inbox' ? 'active' : ''}`}
                    title="Inbox"
                    onClick={() => onSelectFolder('inbox')}>
                    <img src={`assets/img/${filterBy.status === 'inbox' ? 'inbox_filled' : 'inbox'}.svg`} alt="" />
                    {showFull && <span>Inbox</span>}
                    {showFull && unreadCount > 0 && <span className="folder-count">{unreadCount}</span>}
                    {!showFull && unreadCount > 0 && <span className="folder-dot"></span>}
                </div>

                <div className={`folder ${filterBy.status === 'starred' ? 'active' : ''}`}
                    title="Starred"
                    onClick={() => onSelectFolder('starred')}>
                    <img src={`assets/img/${filterBy.status === 'starred' ? 'star_filled' : 'star'}.svg`} alt="" />
                    {showFull && <span>Starred</span>}
                </div>

                <div className={`folder ${filterBy.status === 'sent' ? 'active' : ''}`}
                    title="Sent"
                    onClick={() => onSelectFolder('sent')}>
                    <img src={`assets/img/${filterBy.status === 'sent' ? 'send_filled' : 'send'}.svg`} alt="" />
                    {showFull && <span>Sent</span>}
                </div>

                <div className={`folder ${filterBy.status === 'draft' ? 'active' : ''}`}
                    title="Draft"
                    onClick={() => onSelectFolder('draft')}>
                    <img src={`assets/img/${filterBy.status === 'draft' ? 'draft_filled' : 'draft'}.svg`} alt="" />
                    {showFull && <span>Drafts</span>}
                    {showFull && draftCount > 0 && <span className="folder-count">{draftCount}</span>}
                    {!showFull && draftCount > 0 && <span className="folder-dot"></span>}
                </div>

                <div className={`folder ${filterBy.status === 'trash' ? 'active' : ''}`}
                    title="Trash"
                    onClick={() => onSelectFolder('trash')}>
                    <img src={`assets/img/${filterBy.status === 'trash' ? 'delete_filled' : 'delete'}.svg`} alt="" />
                    {showFull && <span>Trash</span>}
                </div>
            </nav>
        </section>

    </div>

}



