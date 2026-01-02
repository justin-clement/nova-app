import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SubscriptionBadge from "./SubscriptionBadge";
import styles from '../styling/subscriptions.module.css'


function Subscription({ details }) {

    // STATE TO STORE A USER'S SUBSCRIPTION DETAILS.
    const [userDetails, setUserDetails] = useState({
        subscription: details.subscription, 
        validityMessage: details.validityMessage
    });

    const novaSubA = () => {
        window.open("https://paystack.shop/pay/nova-a", "_blank", "noopener,noreferrer");
    };

    const novaSubB = () => {
        window.open("https://paystack.shop/pay/nova-b", "_blank", "noopener,noreferrer");
    };

    useEffect(() => {
        setUserDetails({
            subscription: details.subscription, 
            displayMessage: details.displayMessage, 
            validity: details.validity
        })
    }, [details]);


    return (
        <div >
            <h3 style={{
                color: "grey", 
                textAlign: "center"}}>Active Subscription</h3>
            <div style={{display: "flex", flexDirection: "column", 
                        alignItems: "center", padding: "5px"}}>
                {userDetails.subscription === null && null}
                {userDetails.subscription === false && <h2>{userDetails.displayMessage}</h2>}
                {userDetails.subscription && <SubscriptionBadge subscription={userDetails.subscription} />}
                {userDetails.subscription && <p><i>{userDetails.displayMessage}</i></p>}
                
                <SubscriptionBadge subscription="NOVA B" />
                <p></p>
            </div>
            <br />
            
            <h2 style={{color: "brown"}}>Subscriptions</h2>

            <div className={styles.subscribeBox}>
                <motion.div 
                className={styles.subscribeBanner} 
                initial={{y: 30, opacity: 0}} 
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.7}}>
                    <h2 style={{
                        color: "green"
                    }}>NOVA A</h2>
                    <p>Gets you half of the recommendations we put out 
                        on matchdays. As a bonus, we use banker's rounding to split odd-numbered 
                        recommendations (<i>e.g. if we release 7 recommendations, you receive 4</i>).
                    </p>
                    <br />
                    <button 
                    onClick={novaSubA}
                    className={styles.aButton}>Subscribe to NOVA A @ N4500</button>
                </motion.div>
                <br />

                <motion.div 
                className={styles.subscribeBanner} 
                initial={{y: 30, opacity: 0}} 
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.7}}>
                    <h2 style={{
                        color: "#2626be"
                    }}>NOVA B</h2>
                    <p>Gives you access to all recommendations we put out on 
                        matchdays. Seven out of seven, ten out of ten. You get everything.
                    </p>
                    <br />
                    <button 
                    onClick={novaSubB}
                    className={styles.bButton}>Subscribe to NOVA B @ N8000</button>
                </motion.div>
            </div>


            <p style={{textAlign: "center", 
                        fontSize: "14px", 
                        color: "grey"
            }}>Each subscription is valid for 30 days.</p>
        </div>
    )
};

export default Subscription;