import styles from "../styling/homearticle.module.css";

function HomeArticle({ title, content }) {

    return (
        <div className={styles.infoCard}>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    )
};

export default HomeArticle;