const { useState } = React

import { mailService } from '../services/mail.service.js'

export function MailCompose({ onClose, onSendMail, draft, onLoadMails }) {

    const [newMail, setNewMail] = useState(draft || {
        to: '',
        subject: '',
        body: ''
    })
    const [msg, setMsg] = useState('')
    const [isFocusTo, setIsFocusTo] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [headerTitle, setHeaderTitle] = useState(draft ? (draft.subject || 'New Message') : 'New Message')
    const [isDirty, setIsDirty] = useState(false)



    function handleChange(ev) {
        const { name, value } = ev.target
        setNewMail(prev => ({ ...prev, [name]: value }))
        setIsDirty(true)
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

    function onDiscard() {
        if (draft && draft.id) {
            mailService.remove(draft.id)
                .then(() => onClose(null))
        } else {
            onClose(null)
        }
    }

    function saveDraft() {
        if (!isDirty) return
        if (!newMail.to && !newMail.subject && !newMail.body) return

        const draftToSave = { ...newMail }

        draftToSave.from = 'user@appsus.com'
        draftToSave.isRead = true
        draftToSave.sentAt = null
        draftToSave.removedAt = null
        if (!draftToSave.createdAt) draftToSave.createdAt = Date.now()

        mailService.save(draftToSave)
            .then(saved => {
                if (!newMail.id) {
                    setNewMail(prev => ({ ...prev, id: saved.id }))
                }
                setHeaderTitle('Draft saved')
                setTimeout(() => setHeaderTitle(newMail.subject || 'New Message'), 3000)
                setIsDirty(false)
                onLoadMails()
            })
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
                <button className="header-btn" onClick={() => onClose(newMail)} title="Close">
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
                    onBlur={() => { setIsFocusTo(false); saveDraft() }}
                />
            </div>
            <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={newMail.subject}
                onChange={handleChange}
                onBlur={() => { setIsFocusTo(false); saveDraft() }}
            />
            <textarea
                name="body"
                placeholder="Write your message..."
                value={newMail.body}
                onChange={handleChange}
                onBlur={saveDraft}
            />

            {msg && <p className="compose-msg">{msg}</p>}

            <div className="compose-footer">
                <button className="send-btn" onClick={onSubmit} title="Send">Send</button>

                <button className="discard-btn icon-hover-bg" onClick={onDiscard} title="Discard draft">
                    <img src="assets/img/delete.svg" alt="discard" />
                </button>
            </div>
        </React.Fragment>}
    </section >
}