const { NavLink } = ReactRouterDOM

export function NoteHeader({ filterBy, onSetFilterBy, onToggleSidebar, isGridLayout, setIsGridLayout }) {

    function handleSearch(ev) {
        const txt = ev.target.value
        onSetFilterBy(prev => ({ ...prev, txt }))
    }

    return (
        <header className="note-header">
            <div className="logo-container">
                <button className="menu-btn" onClick={onToggleSidebar} title="Main menu">
                    <img src="apps/note/img/menu.png" alt="Menu" className="menu-icon-img" />
                </button>

                <NavLink to="/note" className="logo-link">
                    <img src="apps/note/img/keeps.png" alt="Keep Logo" />
                    <span className="logotext">Keep</span>
                </NavLink>
            </div>

            <div className="search-container">
                <button className="search-icon-btn header-icon-link">
                    {/* <span className="material-icons">search</span> */}
                    <img src="apps/note/img/magnifying.png" alt="Menu" className="menu-icon-img" />
                </button>
                <input
                    type="text"
                    placeholder="Search"
                    value={filterBy.txt}
                    onChange={handleSearch}
                />
            </div>

            <div className="header-actions">

                <nav className="header-nav">
                    <NavLink to="/" className="header-icon-link">Home</NavLink>
                    <NavLink to="/about" className="header-icon-link">About</NavLink>
                    <NavLink to="/mail" className="header-icon-link">Mail</NavLink>
                    <NavLink to="/note" className="header-icon-link">Note</NavLink>
                    <button
                        className="layout-toggle-btn"
                        onClick={() => setIsGridLayout(!isGridLayout)}
                        title={isGridLayout ? "List view" : "Grid view"}
                    >
                        {isGridLayout ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 5H21V7H3V5ZM3 11H21V13H3V11ZM3 17H21V19H3V17Z" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 11H11V3H3V11ZM5 5H9V9H5V5ZM13 3V11H21V3H13ZM19 9H15V5H19V9ZM3 21H11V13H3V21ZM5 15H9V19H5V15ZM13 21H21V13H13V21ZM15 19V15H19V19H15Z" />
                            </svg>
                        )}
                    </button>

                </nav>
            </div>
        </header>
    )
}