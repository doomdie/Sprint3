const { NavLink } = ReactRouterDOM
export function NoteHeader({ filterBy, onSetFilterBy }) {
    function handleSearch(ev) {
        const txt = ev.target.value
        onSetFilterBy(prev => ({ ...prev, txt }))
    }

    return <header className="note-header">
        <div className="note-search">
            <img src="apps\note\img\keeps.png" alt="search" />
            <input
                type="text"
                placeholder="Search notes"
                value={filterBy.txt}
                onChange={handleSearch}
            />
        </div>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}