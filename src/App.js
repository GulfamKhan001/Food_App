// import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Home Page/NavBar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthProvider from './Components/Context/AuthProvider';
import Home from './Components/Home Page/Home';
import Signup from './Components/Login Page/Signup';
import Footer from './Components/Home Page/Footer';
import Login from './Components/Login Page/Login';
import ForgetPassword from './Components/Login Page/ForgetPassword';
import ResetPassword from './Components/Login Page/ResetPassword';
import AllPlans from './Components/Plan Page/AllPlans';
import Profile from './Components/Profile Page/Profile';
import PlanDetail from './Components/PlanDetail Page/PlanDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<Signup />}>
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/forgetPassword" element={<ForgetPassword />}>
          </Route>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/resetpassword" element={<ResetPassword />}>
          </Route>
          <Route path="/allPlans" element={<AllPlans />}>
          </Route>
          <Route path="/profilePage" element={<Profile />}>
          </Route>
          <Route path="/planDetail/:id" element={<PlanDetail />}>
          </Route>
        </Routes>
      </AuthProvider>
      <Footer/>
    </Router>
  );
}

export default App;
