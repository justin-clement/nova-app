

import styles from '../styling/proofofplay.module.css'
import pop1 from '../assets/images/pop1.png'
import pop2 from '../assets/images/pop2.png'
import pop3 from '../assets/images/pop3.png'
import pop4 from '../assets/images/pop4.PNG'
import pop5 from '../assets/images/pop5.PNG'
import pop6 from '../assets/images/pop6.PNG'
import pop7 from '../assets/images/pop7.PNG'
import pop8 from '../assets/images/pop8.PNG'
import pop9 from '../assets/images/pop9.PNG'
import pop10 from '../assets/images/pop10.PNG'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'

function ProofOfPlay() {

    const images = [pop1, pop2, pop3, pop4, pop5, pop6, pop7, pop8, pop9, pop10]

    return (
        <>
            <div className={styles.pageContainer}>
                <motion.h2 
                style={{color: "darkgreen"}}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }} 
                >Proof-of-Play</motion.h2>

                <p> Our Proof-of-Play serves to show that our recommendations were applied to real games 
                    during testing and development, and are presented as evidence that our selections 
                    were made before these matches took place. We've included some verify codes where available. 
                    You can also cross check these outcomes with our report sheet.
                    
                </p>

                <div className={styles.gallery}>
                    {images.map((img, idx) => (
                        <img key={idx} src={img} alt={`proof-${idx+1}`} />
                    ))}
                </div>
                <br />
                
                <div style={{
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"
                }}>
                    <h3 style={{margin: "0", color: "darkgreen"}}>Verify Codes</h3>
                    <p style={{
                        color: "grey", 
                        fontStyle: "italic", 
                        fontSize: "18px"
                    }}>Codes can be validated on Sportybet.</p>
                    
                    <ul>
                        <li style={{color: "green"}}>NGLT14WCCPW0X9262</li>
                        <li style={{color: "green"}}>NGLT14UT02A054BSL</li>
                    </ul>
                </div>
                
                <br />

                <div style={{
                    textAlign: "center"
                }}>
                    <Link to="/">Back to Home</Link>
                </div>
                <br />
                <br />

            </div>
        </>
    )
};

export default ProofOfPlay;