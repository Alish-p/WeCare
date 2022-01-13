import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { logoutCoach } from '../redux/Slices/CoachAuth';
import { logoutUser } from '../redux/Slices/UserAuth';

const NavigationBar = () => {
  const isUserLogged = useSelector((state) => state.user.isLogged);
  const isCoachLogged = useSelector((state) => state.coach.isLogged);

  const dispatch = useDispatch();

  return (
    <>
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto">
            <Link to={'/'}>Wecare</Link>
          </h1>

          <nav id="navbar" className="navbar">
            <ul>
              {!(isCoachLogged || isUserLogged) && (
                <>
                  <Link className="nav-link scrollto" to={'/about'}>
                    About
                  </Link>
                  <li className="dropdown">
                    <Link to={'/'}>
                      <span>Login</span> <i className="bi bi-chevron-down"></i>
                    </Link>
                    <ul>
                      <Link to={'/coachlogin'}>Login as a Coach</Link>

                      <Link to={'/userlogin'}>Login as a User</Link>
                    </ul>
                  </li>
                  <li className="dropdown">
                    <Link to={'/'}>
                      <span>Register</span>{' '}
                      <i className="bi bi-chevron-down"></i>
                    </Link>
                    <ul>
                      <Link to={'/coachsignup'}>Register as a Coach</Link>

                      <Link to={'/usersignup'}>Register as a User</Link>
                    </ul>
                  </li>
                </>
              )}

              {isUserLogged && (
                <>
                  <Link className="nav-link scrollto" to={'/userhome'}>
                    Book Appointments
                  </Link>
                  <Link className="nav-link scrollto" to={'/userappointments'}>
                    My Appoitments
                  </Link>
                  <Link className="getstarted scrollto" to={'/userviewprofile'}>
                    View Profile
                  </Link>
                  <li
                    className="getstarted scrollto"
                    onClick={() => {
                      dispatch(logoutUser());
                    }}
                  >
                    Log Out
                  </li>
                </>
              )}

              {isCoachLogged && (
                <>
                  <Link className="nav-link scrollto" to={'/coachschedules'}>
                    My Schedules
                  </Link>
                  <Link
                    className="getstarted scrollto"
                    to={'/coachviewprofile'}
                  >
                    View Profile
                  </Link>
                  <li
                    className="getstarted scrollto"
                    onClick={() => {
                      dispatch(logoutCoach());
                    }}
                  >
                    Log Out
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavigationBar;
