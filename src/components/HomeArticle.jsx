import styles from "../styling/homearticle.module.css";
import { motion } from "framer-motion";

function HomeArticle({ title, content }) {

    return (
        <motion.div 
            animate={{ y: [10, 0], opacity: [0, 1] }} 
            transition={{ duration: 0.6 }}
            className={styles.infoCard}>
            <h2>{title}</h2>
            <p>{content}</p>
        </motion.div>
    )
};

export default HomeArticle;