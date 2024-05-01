/* import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import { onMessageListener } from './firebase';


const Notification = () => {

    // states
    const [notification, setNotification] = useState({title: '', body: ''});
    // useeffect 
    useEffect(() => {
    if(notification?.title) {
        toast(notification.title);
    }
    },[notification])

    onMessageListener()
    .then((payload) => {    
        setNotification({title: payload?.notification?.title, body: payload?.notification?.body});     
    }).catch((err) => console.log('failed: ', err));

    return null;
}

export default Notification */