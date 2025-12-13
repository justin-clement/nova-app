import styles from '../styling/predictioncard.module.css'
import { motion } from 'framer-motion';

function PredictionCard({ league, home, away, recommendation }) {

    return (
        <motion.div 
        className={styles.predictionCard} 
        initial={{y: 30, opacity: 0}} 
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.7}}>
            <p className={styles.leagueName}><b>{league}</b></p>
            <p className={styles.teamsPlaying}>{home} v {away}</p>
            
            <hr />
            <p className={styles.recommendationHeading}>Recommended Choice(s):</p>
            <p className={styles.recommendation}><b>{recommendation}</b></p>
        </motion.div>
    )
}

export default PredictionCard;