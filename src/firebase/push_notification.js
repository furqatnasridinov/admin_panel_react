import React, {useState, useEffect, useRef} from 'react'
import { toast } from 'react-toastify';
import { onMessageListener } from './firebase';
import NotificationSound from "../assets/audio/web_whatsapp.mp3"

const PushNotification = () => {

    // states
    const [notification, setNotification] = useState({ title: '', body: '' });
    const audioPlayer = useRef(null);

    // useeffect 
    useEffect(() => {
        if (notification?.body) {
            toast.info(notification.body);
            audioPlayer.current.play();
        }
        setNotification({ title: '', body: '' });
    }, [notification.body, notification.title])

    onMessageListener()
        .then((payload) => {
            setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
        }).catch((err) => console.log('failed: ', err));

        return (
            <div className='notification'>
              <audio
                id='notification-audio'
                ref={audioPlayer}
                src={NotificationSound}
              />
            </div>
          );
}

export default PushNotification