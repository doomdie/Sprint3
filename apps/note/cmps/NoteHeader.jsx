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
                    <span className="material-icons">
                        {isGridLayout ? 'view_list' : 'grid_view'}
                    </span>
                </button>

                </nav>
            </div>
        </header>
    )
}