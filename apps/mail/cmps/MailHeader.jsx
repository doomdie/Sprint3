const { useState } = React
const { NavLink } = ReactRouterDOM

export function MailHeader({ filterBy, onSetFilterBy, onToggleSidebar }) {

    const [isSearchFocus, setIsSearchFocus] = useState(false)

    function handleSearch(ev) {
        const txt = ev.target.value
        onSetFilterBy(prev => ({ ...prev, txt }))
    }

    function handleReadFilter(ev) {
        const value = ev.target.value
        const isRead = value === 'all' ? undefined : value === 'read'
        onSetFilterBy(prev => ({ ...prev, isRead }))
    }

    function onClearSearch() {
        onSetFilterBy(prev => ({ ...prev, txt: '' }))
    }

    return <header className="mail-header">

        <div className="mail-header-logo">
            <button className="icon-hover-bg" onClick={onToggleSidebar} title="Main menu">
                <img src="assets/img/menu.svg" alt="menu" />
            </button>
            <img className="mail-logo-icon" src="assets/img/mail.svg" alt="mail" title="Memail" />
            <span className="mail-logo-text" title="Memail">Memail</span>
        </div>

        <div className={`mail-search ${isSearchFocus ? 'focused' : ''}`}>
            <img src="assets/img/search.svg" alt="search" />
            <input
                type="text"
                placeholder="Search mail"
                value={filterBy.txt}
                onChange={handleSearch}
                onFocus={() => setIsSearchFocus(true)}
                onBlur={() => setIsSearchFocus(false)}
            />
            {filterBy.txt &&
                <button className="search-clear icon-hover-bg" onClick={onClearSearch}>
                    <img src="assets/img/close.svg" alt="clear" />
                </button>}
        </div>

        <select className="read-filter" onChange={handleReadFilter}>
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>

        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}