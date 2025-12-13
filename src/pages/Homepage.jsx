import NovaHeader from '../components/NovaHeader'
import styles from '../styling/homepage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import SignIn from './SignIn';

function Homepage() {
    
    const navigate = useNavigate();

    const goToAbout = () => {
        navigate('/about');
    };

    return (
        <>
            <div className={styles.homepageContainer}>
                <NovaHeader />
                <div className={styles.heroSection}>
                    <h1 style={{fontSize: "50px"}}>Welcome to <span>supernova</span></h1>
                    <p style={{
                        fontSize: "24px"
                    }}>A data-driven soccer 
                        predictions service, powered by ARCTURUS.</p>
                    <br />
                    <br />
                    <br />

                    <button className={styles.learnMoreButton} onClick={goToAbout}>Learn More</button>
                </div>
                <br />
                
                <div className={styles.authSection}>
                    <SignIn />
                    <br />
                    
                    <p style={{
                        fontSize: "16px", 
                        color: "grey"
                    }}>If you don't have a Supernova account, 
                        you can sign up for one <Link to='/sign-up'>here</Link>.</p>
                </div>
                <div className={styles.footerSection}>
                    <p style={{textAlign: "center"}}>© {new Date().getFullYear()} Supernova Software Services.</p>
                </div>
            </div>  
        </>
    )
}

export default Homepage;