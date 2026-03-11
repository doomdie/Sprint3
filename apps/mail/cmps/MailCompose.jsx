const { useState } = React

export function MailCompose({ onClose, onSendMail }) {

    const [newMail, setNewMail] = useState({
        to: '',
        subject: '',
        body: ''
    })

    function handleChange(ev) {
        const { name, value } = ev.target
        setNewMail(prev => ({ ...prev, [name]: value }))
    }


    return <section className="mail-compose">
        <h3>New Message</h3>
        <button onClick={onClose}>X</button>
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
        <button onClick={() => onSendMail(newMail)}>Send</button>
    </section>
}