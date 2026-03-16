const { NavLink } = ReactRouterDOM
export function NoteHeader({ filterBy, onSetFilterBy, onToggleSidebar }) {
    function handleSearch(ev) {
        const txt = ev.target.value
        onSetFilterBy(prev => ({ ...prev, txt }))
    }

    return (
        <header className="note-header">
            <div className="logo-container">
                <button className="menu-btn" onClick={onToggleSidebar}>
                    <span className="material-icons">menu</span>
                </button>

                <NavLink to="/note" className="logo-link">
                    <img src="apps/note/img/keeps.png" alt="Keep Logo" />
                    <span>Keep</span>
                </NavLink>
            </div>

            <div className="search-container">
                <button className="search-icon-btn">
                    <span className="material-icons">search</span>
                </button>
                <input
                    type="text"
                    placeholder="Search"
                    value={filterBy.txt}
                    onChange={handleSearch}
                />
            </div>

            <nav className="header-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>

                <NavLink to="/mail">Mail</NavLink>

                <NavLink to="/note">Note</NavLink>
            </nav>
        </header>
    )
}