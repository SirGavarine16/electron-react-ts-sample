export {}

declare global {
    interface Window {
        electron: {
            notificationApi: {
                sendNotification: (message: string) => void;
            }
        }
    }
}