import { Link, useNavigate } from 'react-router-dom'
import styles from '../styling/aboutnova.module.css'

function AboutNova() {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/')
    };

    const arcturus = <b style={{color: "#123499"}}>ARCTURUS</b>

    return (
        <div className={styles.pageContainer}>
           <h1 className={styles.header}>about supernova</h1>
           <br />

           <p>Supernova is a digital sports analysis service, specializing in delivering 
            some of the most accurate football predictions on the market.</p> 
            <p>We're an innovative data-driven service with quality event data on thousands of matches. 
                Our datasets are continually updated, giving us constant access to current trends 
                and sports information.</p>
            <p>Our sports services are powered by two parts: One is quality data supplied by Nova 
                Analytics. Then we have {arcturus}.</p>
            <p>{arcturus} is a logic engine built on pattern recognition. Its algorithms 
                have been tailored to real games and engineered to be adaptive, so that it doesn't have 
                to depend directly on past information. Put simply, {arcturus} is able to make predictions 
                without needing to know the histories of the teams; it only requires current data. {arcturus} currently 
                possesses a predictive accuracy of 74%. It means on average if our engine outputs 10 recommendations, 
                up to 7 are expected to play out.
            </p>
            <p>For context, a lot of bookies predictions fall within a 55 - 60% accuracy range, and 
                top-performing software-supported models approach 70%. Our model's accuracy, 
                (which grows with successful predictions), allows {arcturus} outperform most football 
                predictions services <i>in the world</i>.</p> 

            <p>You can examine our prediction report sheet below or view our Proof-Of-Play. We currently 
                offer two subscription tiers: NOVA A at N4500 and NOVA B at N8000. Either subscription 
                covers 4 match weeks.</p>
            <br />
            <Link to='#'>Report Sheet - ARCTURUS</Link><br />
            <Link to='#'>Proof-of-Play</Link>
            <br />
            <br />
            <button className={styles.backHomeButton} onClick={goToHome}>Back to Home</button>
            <br />
            <br />
        </div>
    )
}

export default AboutNova