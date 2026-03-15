const { useState } = React
const { NavLink } = ReactRouterDOM

export function MailHeader({ filterBy, onSetFilterBy }) {

    const [isSearchFocus, setIsSearchFocus] = useState(false)

    function handleSearch(ev) {
        const txt = ev.target.value
        onSetFilterBy(prev => ({ ...prev, txt }))
    }

    function onClearSearch() {
        onSetFilterBy(prev => ({ ...prev, txt: '' }))
    }

    return <header className="mail-header">
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
                <button className="search-clear" onClick={onClearSearch}>
                    <img src="assets/img/close.svg" alt="clear" />
                </button>}
        </div>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}