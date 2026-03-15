const { useState } = React

export function MailCompose({ onClose, onSendMail }) {

    const [newMail, setNewMail] = useState({
        to: '',
        subject: '',
        body: ''
    })
    const [msg, setMsg] = useState('')
    const [isFocusTo, setIsFocusTo] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [headerTitle, setHeaderTitle] = useState('New Message')




    function handleChange(ev) {
        const { name, value } = ev.target
        setNewMail(prev => ({ ...prev, [name]: value }))
    }

    function onSubmit() {
        if (!newMail.to || !newMail.subject) {
            setMsg('Please fill in To and Subject')
            setTimeout(() => setMsg(''), 3000)
            return
        }
        setMsg('')
        onSendMail(newMail)
    }

    function onToggleMinimize() {
        setIsMinimized(prev => !prev)
    }

    function onClickMinimizeBtn(ev) {
        ev.stopPropagation()
        onToggleMinimize()
    }

    return <section className={`mail-compose ${isMinimized ? 'minimized' : ''}`}>
        <h3 onClick={onToggleMinimize}>
            {headerTitle}
            <div className="compose-header-actions">
                <button className="header-btn"
                    title="Minimize"
                    onClick={onClickMinimizeBtn}>
                    <img src="assets/img/minimize.svg" alt="minimize" />
                </button>
                <button className="header-btn" onClick={onClose} title="Close">
                    <img src="assets/img/close_small.svg" alt="close" />
                </button>
            </div>
        </h3>

        {!isMinimized && <React.Fragment>
            <div className="compose-to">
                {isFocusTo && <span className="to-label">To</span>}
                <input
                    type="text"
                    name="to"
                    placeholder={isFocusTo ? '' : 'Recipients'}
                    value={newMail.to}
                    onChange={handleChange}
                    onFocus={() => setIsFocusTo(true)}
                    onBlur={() => setIsFocusTo(false)}
                />
            </div>
            <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={newMail.subject}
                onChange={handleChange}
                onBlur={() => setHeaderTitle(newMail.subject || 'New Message')}
            />
            <textarea
                name="body"
                placeholder="Write your message..."
                value={newMail.body}
                onChange={handleChange}
            />
            {msg && <p className="compose-msg">{msg}</p>}
            <div className="compose-footer">
                <button className="send-btn" onClick={onSubmit} title="Send">Send</button>
                <button className="discard-btn" onClick={onClose} title="Discard draft">
                    <img src="assets/img/delete.svg" alt="discard" />
                </button>
            </div>
        </React.Fragment>}
    </section >
}