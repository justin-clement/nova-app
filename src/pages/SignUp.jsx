import { useEffect, useState } from "react"
import NovaHeader from "../components/NovaHeader"
import axios from 'axios'
import { Link, useLocation } from "react-router-dom"
import "../styling/sign-up.css"
import { SignUpSuccessCard, SignUpFailCard } from "../components/StatusCards"


function SignUp() {

    // STATE FOR HANDLING IF NICKNAME IS AVAILABLE.
    const [nickAvailable, setNickAvailable] = useState(null);
    const availableNick = <p style={{color: "green"}}>Nickname available.</p>;
    const unavilableNick = <p style={{color: "red"}}>This nickname is taken.</p>;

    // STATE TO HANDLE PASSWORD CONFIRMATION.
    const [validate, setValidate] = useState(null)

    // STATES FOR HANDLING VISIBILITY OF SIGN UP FORM, SUCCESS AND FAIL PAGES.
    const [signUpDisplay, setSignUpDisplay] = useState(true); 
    const [successPage, setSuccessPage] = useState({status: false, nickname: ""});
    const [unsuccessPage, setUnsuccessPage] = useState({status: false, message: ""});

    // STATE TO STORE FORM DATA DURING SIGN UP.
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        phoneNumber: "",
        nickname: "",
        password: "",
        confirmPassword: ""
    });

    // FUNCTION TO HANDLE WHEN AN INPUT FIELD CHANGES.
    const handleChange = async (e) => {
        const {name, value} = e.target;

        // IF IT'S THE NICKNAME FIELD, CHECK IF THE NICKNAME IS AVAILABLE.
        if (name === 'nickname') {
            const nickRegistry = 'http://localhost:8000/check-nick';
            try {
                const checkNick = await axios.post(nickRegistry, value);
                const available = checkNick.data.status;
                if (available) {
                    setNickAvailable(true);
                    setFormData(previousData => ({
                        ...previousData,
                        [name]: value
                    }));
                } else {
                    setNickAvailable(false);
                }
            } catch (error) {
                console.error("An error occured while checking nickname: ", error)
                return;
            }  
        } else {
            setFormData(previousData => ({
                ...previousData,
                [name]: value
            }));
        }  
    };

    // FUNCTION TO HANDLE THE SIGN-UP FORM SUBMISSION.
    const handleSubmit = async (e) => {

        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setValidate(<p style={{color: "red"}}>Passwords do not match</p>);
            setTimeout(() => {}, 2000);
            setValidate(null);
            return;
        };

        const url = 'http://localhost:8000/signup';
        try {
            const { data } = await axios.post(url, formData);
            if (data.status) {
                setSignUpDisplay(false);
                setSuccessPage({status: true, nickname: formData.nickname});
            } else {
                setSignUpDisplay(false);
                setUnsuccessPage({status: true, message: data.message});
            };
        } catch (error) {
            console.error("An error occured trying to create account: ", error)
            alert(error);
        }; 
    };

    // THE useEffect IS TO TOGGLE VISIBILITY OF THE SIGN UP FORM  
    // WHEN REDIRECTED FROM THE FAILURE CARD.
    const location = useLocation();
    useEffect(() => {
        if (location.state?.showSignup) {
            setUnsuccessPage({status: false, message: ""});
            setSignUpDisplay(true);
        }
    }, [location]);

    return (
        <>
            <NovaHeader />
            <div className={`signup-page-container ${signUpDisplay ? "" : "hidden"}`}>
                <div className="signup-card">
                    <h2 style={{color: "brown"}}>Create Your Account</h2>
                    <form onSubmit={handleSubmit}>
                        <label>First Name: </label><br />
                        <input 
                        name="firstName" 
                        value={formData.firstName} 
                        className="signup-input"
                        onClick={handleChange} />
                        <br />

                        <label>Last Name: </label><br />
                        <input 
                        name="lastName" 
                        value={formData.lastName} 
                        className="signup-input" 
                        onClick={handleChange} />
                        <br />

                        <label>Gender: </label><br />
                        <select 
                        name="gender" 
                        value={formData.gender} 
                        className="signup-input" 
                        onClick={handleChange} >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                        <br />

                        <label>Email Address: </label><br />
                        <input 
                        name="email" 
                        value={formData.email} 
                        className="signup-input" 
                        onChange={handleChange} />
                        <br />

                        <label>Phone Number: </label><br />
                        <input 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        className="signup-input" 
                        onClick={handleChange} />
                        <br />

                        <label>Nickname: </label><br />
                        <input 
                        name="nickname" 
                        value={formData.nickname} 
                        className="signup-input" 
                        onClick={handleChange} />
                        <p style={{
                            margin: "0", 
                            color: "grey", 
                            fontSize: "16px"}}>Choose a unique nickname. This will be the main 
                            way you'll be identified on Supernova.</p>
                        { nickAvailable === null 
                        ? null 
                        : nickAvailable
                            ? availableNick 
                            : unavilableNick }
                        <br />

                        <label>Create Password: </label><br />
                        <input 
                        name="password" 
                        value={formData.password} 
                        className="signup-input" 
                        onClick={handleChange} />
                        <br />

                        <label>Confirm Password: </label><br />
                        <input 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        className="signup-input" 
                        onClick={handleChange} />
                        <br />
                        {validate}
                        <br />

                        <button 
                        className="account-create-button" 
                        type="submit" 
                        onClick={handleSubmit}>Create Account</button>
                        <br />
                        <br />
                    </form>
                    <br />

                    <Link to='/'>Return to the homepage</Link>
                    <br />
                    <br />
                </div>
            </div>
            {successPage.status ? <SignUpSuccessCard nickname={successPage.nickname} /> : null}
            {unsuccessPage.status ? <SignUpFailCard errorMessage={unsuccessPage.message} /> : null }
        </>
        
    )
};

export default SignUp;