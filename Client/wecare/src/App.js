import './App.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import CoachSignup from './Components/CoachSignup';
import CoachLogin from './Components/CoachLogin';
import UserSignup from './Components/UserSignup';
import UserLogin from './Components/UserLogin';
import UserHome from './Components/UserHome';
import CoachHome from './Components/CoachHome';
import CoachSchedules from './Components/CoachSchedules';
import CoachViewProfile from './Components/CoachViewProfile';
import UserViewProfile from './Components/UserViewProfile';
import UserAppointments from './Components/UserAppointments';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>

            <Route path="/coachsignup" element={<CoachSignup />}></Route>
            <Route path="/coachlogin" element={<CoachLogin />}></Route>
            <Route path="/usersignup" element={<UserSignup />}></Route>
            <Route path="/userlogin" element={<UserLogin />}></Route>
            <Route path="/userHome" element={<UserHome />}></Route>
            <Route path="/coachHome" element={<CoachHome />}></Route>
            <Route path="/coachschedules" element={<CoachSchedules />}></Route>
            <Route
              path="/coachviewprofile"
              element={<CoachViewProfile />}
            ></Route>
            <Route
              path="/userviewprofile"
              element={<UserViewProfile />}
            ></Route>
            <Route
              path="/userappointments"
              element={<UserAppointments />}
            ></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
