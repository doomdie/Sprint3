import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React


export function MailDetails() {

    const { mailId } = useParams()
    const [mail, setMail] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        mailService.get(mailId)
            .then(mail => {
                if (!mail.isRead) {
                    mail.isRead = true
                    mailService.save(mail)
                }
                setMail(mail)
            })
    }, [mailId])

    if (!mail) return <div>Loading...</div>


    return <section className="mails-details">
        <button onClick={() => navigate('/mail')}>Back</button>
        <h2>{mail.subject}</h2>
        <p>{mail.from}</p>
        <p>{mail.body}</p>
    </section>
}