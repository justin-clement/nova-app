import { useState } from "react";
import styles from "../styling/adminpage.module.css"
import axios from "axios";
import NovaHeader from "../components/NovaHeader";

function AdminPage() {

    let uploadMessage = null;
    let deleteMessage = null;
    let publishMessage = null;

    // STATE FOR HANDLING RECOMMENDATION FIELDS.
    const [recommendations, setRecommendations] = useState({
        league: null, 
        home: null, 
        away: null, 
        recommendation: null
    })

    const post = null;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRecommendations(previousData => ({
            ...previousData,
            [name]: value
        }))
    };

    // FUNCTION HANDLING RECOMMENDATION UPLOADS TO THE CENTRAL SERVER.
    const uploadRecs = async () => {
        const url = 'http://localhost:8000/add-recommmendations';
        try {
            const { data } = await axios.post(url, recommendations);
            if (data.status) {
                uploadMessage = 'Recommendations have been uploaded succesfully.'
            } else {
                uploadMessage = `Recommendations could not be sent to the server. ${data.message}`
            }
        } catch (error) {
            console.error(`An error occured: ${error}`)
        }
    };

    // FUNCTION TO CLEAR RECOMMENDATIONS FROM DB.
    const clearRecs = async () => {
        const url = 'http://localhost:8000/recommendations';
        try {
            const { data } = await axios.delete(url);
            if (data.status) {
                deleteMessage = 'Recommendations have been cleared.'
            }
        } catch (error) {
            console.error(`An error occured: ${error}`)
        }
    };

    const publishItem = async () => {
        const url = 'http://localhost:8000/articles'
        try {
            const { data } = await axios.post(url, post);
            if (data.status) {
                publishMessage = "Post published!";
            } else {
                publishMessage = `Post couldn't be published: ${data.message}.`
            } 
        } catch (error) {
            publishMessage = `An error occured: ${error}.`
        }
    };

    return (
        <>
            <NovaHeader />
            <div className={styles.pageContainer}>
                <div className={styles.recUpload}>
                    <h3 style={{textAlign: "right"}}>Upload Recommendations</h3>

                    <label>Home team</label>
                    <input 
                    className={styles.recInput}
                    name="home" 
                    onChange={handleChange} 
                    value={recommendations.home} /><br /><br />

                    <label>Away team</label>
                    <input
                    className={styles.recInput}
                    name="away" 
                    onChange={handleChange} 
                    value={recommendations.away} /><br /><br />

                    <label>League</label>
                    <input
                    className={styles.recInput}
                    name="league" 
                    onChange={handleChange} 
                    value={recommendations.league} /><br /><br />

                    <label>Recommmendation</label>
                    <input 
                    className={styles.recInput}
                    name="recommendation" 
                    onChange={handleChange} 
                    value={recommendations.recommendation} /><br /><br />

                    <button className={styles.uploadButton} onClick={uploadRecs}>Upload</button>
                    <div>{uploadMessage}</div>
                </div>
                <hr/>

                <div className={styles.clearRecs}>
                    <h3>Clear Recommendations</h3>
                    <p>This will clear recommendations from the central database.</p>
                    <button className={styles.clearRecsButton} onClick={clearRecs}>Clear Recommendations</button>
                    <div>{deleteMessage}</div>
                </div>
                <hr />

                <div>
                    <h3>Post Article</h3>
                    <textarea 
                    style={{fontSize: "20px"}} 
                    rows={7} 
                    cols={33}
                    value={post}></textarea>
                    <br />
                    <button className={styles.publishButton}>Publish</button>
                    {publishMessage}
                </div>
                <hr />

                <div>
                    <h3>Clear Articles</h3>
                    <p>This will clear all articles from the central DB.</p>
                    <button className={styles.clearArticlesButton}>Clear Articles</button>
                </div>
                
            </div>
        </>
    )
};

export default AdminPage;