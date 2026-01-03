import { useParams, Link } from "react-router-dom"
import NovaHeader from "../components/NovaHeader";
import Games from "../components/Games";
import Tips from "../components/Tips";
import Subscription from "../components/Subscription";
import { useEffect, useState } from "react";
import styles from "../styling/userprofile.module.css";
import axios from "axios";
import server from "../api/axios";
import { motion } from "framer-motion";

import {LuHouse as HomeIcon, 
        LuGamepad2 as GamesIcon, 
        LuLeaf as TipsIcon, 
        LuReceipt as SubIcon} from "react-icons/lu"
import { FcApproval as Tick } from "react-icons/fc";
import HomeArticle from "../components/HomeArticle";


function UserProfile() {

    // EXTRACT NICKNAME FROM URL.
    const { nickname } = useParams();

    // STATE TO CONTROL WHAT APP SECTION TO DISPLAY.
    const [view, setView] = useState("home");

    // APP BACKGROUND COLOR.
    const themes = ["white", "#fff4b4", "#ffeaf6", "#fff4b4"];
    const [bgAccent, setBgAccent] = useState(themes[0]);
    
    // CONFIGURE APP SECTION SWITCHING AND BACKGROUND COLOR CHANGE.
    useEffect(() => {
        if (view === "home") {
            setBgAccent(themes[0])
        } else if (view === "games") {
            setBgAccent(themes[1])
        } else if (view === "tips") {
            setBgAccent(themes[2])
        } else if (view === "subscriptions") {
            setBgAccent(themes[3])
        }
    }, [view])

    // TAB SWITCHING LOGIC.
    const showGames = () => {setView("games")};
    const showTips = () => {setView("tips")};
    const showSubscriptions = () => {setView("subscriptions")};
    const showHome = () => {setView("home")};

    // STATE TO STORE HOMEPAGE INFO LIKE NEWS AND NOTICES.
    const [info, setInfo] = useState({
        status: null, 
        articles: [] 
    })

    // STATE TO STORE GAME DATA FROM SERVER.
    const [recommended, setRecommended] = useState({
        status: null, 
        games: []
    });

    const getHomeInfo = async () => {
        try {
            const { data } = await server.get("/info");
            if (data.status === false) {
                return;
            } else if (data.status) {
                setInfo({
                    status: true, 
                    articles: data.info
                })
            }
        } catch (error) {
            console.error("An error occured fetching home info.")
            return;
        }
    };

    // FUNCTION FOR FETCHING RECOMMENDATIONS FROM SERVER.
    const getRecommendations = async () => {
        try {
            const { data } = await server.post("/recommendations", { nick: nickname });
            if (data.status) {
                setRecommended({status: true, games: data.array});
            } else if (data.status === false) {
                return;
            };
        } catch (error) {
            // DEMO RECOMMENDATIONS.
            const match1 = {key: 1, league: 'League 1', 
                        home: 'Team 1', away: 'Team 2', 
                        recommendation: 'Over 2.5 goals | Both Teams to Score'}
            const match2 = {key: 2, league: 'League 2', 
                        home: 'Team 3', away: 'Team 4', 
                        recommendation: 'Over 2.5 goals'}
            const match3 = {key: 3, league: 'League 3', 
                        home: 'Team 5', away: 'Team 6', 
                        recommendation: 'Both Teams not to Score | Below 3.5 goals | Home to score'}
            const match4 = {key: 4, league: 'League 4', 
                        home: 'Team 7', away: 'Team 8', 
                        recommendation: 'Both Teams to Score'}
                        
            const demo_array = [match1, match2, match3, match4]
            setRecommended({status: true, games: demo_array})
            console.error(`An error occured while fetching recommendations (${error}).`);
        };  
    };

    // STATE TO STORE A USER'S SUBSCRIPTION DETAILS.
    const [userDetails, setUserDetails] = useState({
        subscription: null, 
        validityMessage: null
    });

    const logout = async () => {
        try {
            const { data } = await server.get('/logout');
            if (data.status) {
                window.location.href = 'http://localhost:5173/';
            }
        } catch (error) {
            console.error("An error occured during logout.")
        };
    }

    // THIS CHECKS IF THE USER HAS A VALID SUBSCRIPTION.
    useEffect(() => {
        const getUserSub = async () => {
            try {
                const { data } = await server.get(`/subscriptions/${nickname}`); // BACKEND RESPONSE: {status: boolean, subscription: string, message: string}
                if (data.status) {
                    setUserDetails({
                        subscription: data.subscription, 
                        validityMessage: data.validityMessage
                    });
                } else {
                    const noSub = data.validityMessage;
                    setUserDetails({subscription: false, validityMessage: noSub})
                }
            } catch (error) {
                console.error(`An error occured while checking ${nickname}'s subscription: ${error}`);
            }
        };

        getUserSub();

    }, [])

    // useEffect RUNS THE FUNCTION WHEN USER PROFILE LOADS.
    useEffect(() => {
        getHomeInfo();
        getRecommendations();
    }, []);

    return (
        <>
            <div className={styles.pageContainer} 
                style={{backgroundColor: bgAccent}}>
                <div>
                    <NovaHeader />
                    <div className={styles.userProfileContainer}>
                        <motion.div 
                            animate={{ x: [20, 0], opacity: [0, 1] }} 
                            transition={{ duration: 0.6 }}
                            style={{
                                display: "flex", 
                                justifyContent: "right"
                            }}>
                            <h3 className={styles.userGreetingArea}>{nickname} <Tick /></h3>
                        </motion.div>
                        
                        {/* NAV BAR */}
                        <nav className={styles.navContainer}>
                            <ul className={styles.userNavigation}>
                                <li onClick={showHome}> <HomeIcon size={20} /> Home</li>
                                <li onClick={showSubscriptions}> <SubIcon size={20} /> Subscriptions</li>
                                <li onClick={showTips}> <TipsIcon size={20} /> Tips</li>
                                <li onClick={showGames}> <GamesIcon size={20} /> Games</li>
                            </ul>
                        </nav>
                        
                        {/* DISPLAY AREA */}
                        <div className={styles.displayArea}>
                            {view === "games" && <Games data={recommended} />}
                            {view === "tips" && <Tips  />} 
                            {view === "subscriptions" && <Subscription details={userDetails} />}
                            {view === "home" ? 
                            <div>
                                <p style={{
                                    textAlign: "center", 
                                    fontSize: "17px",
                                    color: "grey"
                                }}>The Home section is where you see news or updates from us. 
                                    Manage your subscriptions in the Subscriptions tab.
                                    Know right perspectives to betting in the Tips section.
                                    Matchday predictions are found in the Games tab.  </p>
                                <div className={styles.homeInfoDisplay}>
                                    {info.status ? 
                                    info.articles.map(info => (
                                        <HomeArticle 
                                        title={info[0]} 
                                        content={info[1]} />
                                    )) 
                                    : null}

                                    <HomeArticle 
                                    title="Supernova is LIVE!" 
                                    content="Supernova is now live for all users. The ARCTURUS logic engine is 
                                    now operational with an accuracy of 74%. Users can choose a subscription plan that suits them." />
                                </div>
                                
                            </div> 
                            : null}
                        </div>
                        <br />
                        <p style={{
                            textAlign: "center", 
                            fontSize: "17px",
                            color: "grey"
                        }}>To know more about how we operate, e.g. leagues or matches our services span across,
                            you can check <Link to="/operation">here</Link>. If you have questions, suggestions, or would like to contact us, 
                            you can leave a message <Link to="/message">here</Link>.</p>

                        <button className={styles.logoutButton}
                        onClick={logout}>Log Out</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default UserProfile;