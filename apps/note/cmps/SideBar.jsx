export function SideBar() {
    return (
        <aside className="sidebar">
            <button className="nav-item active">
                <i className="fa-regular fa-lightbulb"></i>
                <span>Notes</span>
            </button>

            <button className="nav-item">
                <i className="fa-regular fa-bell"></i>
                <span>Reminders</span>
            </button>

            <button className="nav-item">
                <i className="fa-solid fa-pencil"></i>
                <span>Edit labels</span>
            </button>

            <button className="nav-item">
                <i className="fa-solid fa-box-archive"></i>
                <span>Archive</span>
            </button>

            <button className="nav-item">
                <i className="fa-regular fa-trash-can"></i>
                <span>Bin</span>
            </button>
        </aside>
    )
}