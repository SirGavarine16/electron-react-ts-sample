
export default function App() {

    const handleButtonClick = () => {
        console.log('test')
        window.electron.notificationApi.sendNotification('Hello')
    }

    return (
        <>
            <h1>Hello World!</h1>
            <button onClick={handleButtonClick}>Send basic notification</button>
        </>
    );
}