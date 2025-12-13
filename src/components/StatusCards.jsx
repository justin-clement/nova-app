import { useEffect } from 'react';
import '../styling/statuscards.css'
import { useNavigate } from 'react-router-dom';

export function SignUpSuccessCard({ nickname }) {

    const navigate = useNavigate();

    // NAVIGATE TO USER'S PROFILE AFTER 3 SECONDS.
    useEffect(() => {
        setTimeout(() => {
            navigate(`/profile/${nickname}`, { replace: true })
        }, 3000)
    }, []);

    return (
        <div className="signup-success">
            <h2>Your account with Nova has been successfully 
                created. You'll be redirected in a sec. 
            </h2>
        </div>
    )
}

export function SignUpFailCard({ errorMessage }) {

    const navigate = useNavigate();

    // showSignup IS PASSED INTO NAVIGATE TO RE-ENABLE VISIBILITY OF 
    // THE SIGNUP FORM.
    const back2Reg = () => {
        navigate('/sign-up', { state: { showSignup: true } })
    };

    const returnHome = () => {
        navigate('/')
    };

    return (
        <div className="signup-fail">
            <h2>Account creation unsuccessful.</h2>
            <p>{errorMessage}</p>
            <br />
            <div>
                <button 
                className="fail-return-reg" 
                onClick={back2Reg}>Return to Registration</button>
                <button 
                className="fail-return-home"
                onClick={returnHome}>Back to Home</button>
            </div>
            
        </div>
    )
};