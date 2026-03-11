const { useState } = React

export function MailCompose({ onClose, onSendMail }) {

    const [newMail, setNewMail] = useState({
        to: '',
        subject: '',
        body: ''
    })
    const [msg, setMsg] = useState('')


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

    return <section className="mail-compose">
        <h3>New Message
            <button className="close-btn" onClick={onClose}>X</button>
        </h3>

        <input
            type="text"
            name="to"
            placeholder="To"
            value={newMail.to}
            onChange={handleChange}
        />
        <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={newMail.subject}
            onChange={handleChange}
        />
        <textarea
            name="body"
            placeholder="Write your message..."
            value={newMail.body}
            onChange={handleChange}
        />
        {msg && <p className="compose-msg">{msg}</p>}
        <button className="send-btn" onClick={onSubmit}>Send</button>
    </section>
}