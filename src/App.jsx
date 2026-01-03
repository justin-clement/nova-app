import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage'
import PredictionCard from './components/PredictionCard'
import AboutNova from './pages/AboutNova'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import UserProfile from './pages/UserProfile'
import SubscriptionBadge from './components/SubscriptionBadge'
import HowWeOperate from './pages/HowWeOperate';
import Messages from './pages/Messages';
import AdminPage from './pages/AdminPage'
import HomeArticle from './components/HomeArticle'
import ProofOfPlay from './pages/ProofOfPlay'
import RootPage from './pages/RootPage'


const router = createBrowserRouter([
  {
    element: <RootPage />, 
    children: [
      {path: "/", element: <Homepage />},
      {path: "/about", element: <AboutNova />}, 
      {path: "/sign-up", element: <SignUp />},  
      {path: "/sign-in", element: <SignIn />},  
      {path: "/proof-of-play", element: <ProofOfPlay />},
      {path: "/profile/:nickname", element: <UserProfile />}, 
      {path: "/operation", element: <HowWeOperate />},
      {path: "/message", element: <Messages />}, 
      {path: "/admin", element: <AdminPage />}, 
      {path: "/test", element: <PredictionCard 
        league="BUNDESLIGA"
        home="RB Leipzig" 
        away="Borussia Dortmund"
        recommendation="Over 2.5 goals" /> },
      {path: "/test2", element: <SubscriptionBadge subscription="NOVA B" />}, 
      {path: "/homeArticle", element: <HomeArticle 
        title="Supernova is LIVE!" 
        content="Supernova is now live for all users. The ARCTURUS logic engine is 
        now operational with an accuracy of 74%. Users can choose a subscription plan that suits them." />}
    ]
  }
])


function App() {

    return <RouterProvider router={router} />

}

export default App;
