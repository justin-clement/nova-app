import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import styles from '../styling/sign-in.module.css'
import { LuLogIn as LoginIcon } from "react-icons/lu";
import server from "../api/axios";

function SignIn() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nickname: "", 
        password: ""
    });

    const [loginStatus, setLoginStatus] = useState({
        fail: false,  
        message: ""
    })

    const failNotif = <div className={styles.failNotif}>{loginStatus.message}</div>

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(previousData => ({
            ...previousData,
            [name]: value
        }))
    };

    const handleSubmit = async () => {
        try {
            const { data } = await server.post('/sign-in', formData);
            if (data.status) {
                navigate(`/profile/${formData.nickname}`, {replace: true})
            } else if (data.status == false) {
                setLoginStatus({ 
                    fail: true, 
                    message: data.message
                })
                console.log(`Login Unsuccessful. ${data.message}`)
            }
        } catch (error) {
            setLoginStatus({ 
                fail: true, 
                message: `${error}`
            })
            console.error("Error occured during login: ", error);
        }; 
    };


    return (

        <div className={styles.signinCard}>
            <h2>Sign In</h2>

            <div>
                <label><b>Nickname: </b></label><br />
                <input name="nickname" 
                value={formData.nickname} 
                onChange={handleChange}
                className={styles.signinInput} />
                <br />
                <br />

                <label><b>Password: </b></label><br />
                <input name="password" 
                value={formData.password} 
                type="password" 
                onChange={handleChange} 
                className={styles.signinInput} />
                <br />
                <br />

                {loginStatus.fail ? failNotif : null}<br />

                <button 
                onClick={handleSubmit} 
                className={styles.signinButton}>Go in <LoginIcon size={25} /> </button>
            </div>
        </div>
            
    )
}

export default SignIn;