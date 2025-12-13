import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage'
import PredictionCard from './components/PredictionCard'
import AboutNova from './pages/AboutNova'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import UserProfile from './pages/UserProfile'
import { SignUpFailCard, SignUpSuccessCard } from './components/StatusCards'
import Tips from './components/Tips'
import SubscriptionBadge from './components/SubscriptionBadge'
import HowWeOperate from './pages/HowWeOperate';
import Messages from './pages/Messages';
import AdminPage from './pages/AdminPage'

const router = createBrowserRouter([
  {path: "/", element: <Homepage />},
  {path: "/about", element: <AboutNova />}, 
  {path: "/sign-up", element: <SignUp />},  
  {path: "/sign-in", element: <SignIn />}, 
  {path: "/profile/:nickname", element: <UserProfile />}, 
  {path: "/operation", element: <HowWeOperate />},
  {path: "/message", element: <Messages />}, 
  {path: "/admin", element: <AdminPage />}, 
  {path: "/test", element: <PredictionCard 
    league="BUNDESLIGA"
    home="RB Leipzig" 
    away="Borussia Dortmund"
    recommendation="Over 2.5 goals" /> },
  {path: "/test2", element: <SubscriptionBadge subscription="NOVA B" />}
])


function App() {

    return <RouterProvider router={router} />

}

export default App;
