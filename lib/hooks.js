import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, getDocs } from "firebase/firestore";
import { onSnapshot, doc } from 'firebase/firestore';
//custom hook to read auth record and user profile doc 
export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername ] = useState(null);
  
    useEffect(() => {
      //turn off realtime subscriptions 
      if (user) {
        const ref = collection(firestore, 'users').doc(user.uid);
        const unsubscribe = onSnapshot(doc(ref), () => {
          setUsername(doc.data()?.username);
        });
      } else {
        setUsername(null);
      }

    }, [user]);
    return { user, username };
}