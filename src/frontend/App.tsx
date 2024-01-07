import { BasicNotification } from './components';

export default function App() {

    const handleButtonClick = () => {
        window.electron.notificationApi.sendNotification('Hello')
    }

    return (
        <>
            <h1>Hello World!</h1>
            <BasicNotification />
        </>
    );
}