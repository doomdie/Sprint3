const { NavLink } = ReactRouterDOM

export function MailHeader({ filterBy, onSetFilterBy }) {

    function handleSearch(ev) {
        const txt = ev.target.value
        onSetFilterBy(prev => ({ ...prev, txt }))
    }

    return <header className="mail-header">
        <div className="mail-search">
            <img src="assets/img/search.svg" alt="search" />
            <input
                type="text"
                placeholder="Search mail"
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