import { generateToken, messaging } from "~/Firebase/firebaseUtils";
import { useEffect, useState } from "react";
import { onMessage } from "firebase/messaging";




function Notifications() {
    const [tokenGenerated, setTokenGenerated] = useState(false);

    useEffect(() => {
        if (!tokenGenerated) {
            generateToken().then(() => setTokenGenerated(true));  // Đảm bảo chỉ gọi 1 lần
        }

        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
        });

    }, [tokenGenerated]);

    return (
        <div>This is notification page</div>
    )

}



export default Notifications;