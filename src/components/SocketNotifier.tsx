import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SocketNotifier() {
    useEffect(() => {
        // Establish WebSocket connection to your backend
        const socket = io('http://localhost:3333');
    
        // Listen to ping sent by socket.io
        socket.on('ping', (data) => {
            // Display a notification instead of logging to the console
            toast.info(`Ping received: ${data.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    
        // Clean up the WebSocket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <ToastContainer />
        </div>
    );
}

export default SocketNotifier;
