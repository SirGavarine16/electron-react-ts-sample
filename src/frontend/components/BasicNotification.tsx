import { ChangeEvent, useState } from 'react'

export default function BasicNotification() {
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handleButtonClick = () => {
        if (!message || message.trim().length <= 0) {
            setMessage('');
            setError(true);
            return;
        }

        window.electron.notificationApi.sendNotification(message);
    }

    const onInputFocus = () => {
        setError(false);
    }

    const onInputBlur = () => {
        if (!message || message.trim().length <= 0) {
            setError(true);
        }
    }

    return (
        <div className="basicNotification__container">
            <h2>Basic Notification</h2>
            <div className="basicNotification__form-wrapper">
                <div className="basicNotification__input-wrapper">
                <input type="text" value={message} onChange={handleInputChange} placeholder='Notification message...' onFocus={onInputFocus} onBlur={onInputBlur} />
                {(error && message !== null)&& <p>You need to write a message.</p>}
                </div>
                <button onClick={handleButtonClick}>send</button>
            </div>
        </div>
    )
}