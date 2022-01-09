import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <>
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto">
            <Link to={'/'}>Wecare</Link>
          </h1>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link className="nav-link scrollto active" to={'/'}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link scrollto" to={'/about'}>
                  About
                </Link>
              </li>

              <li className="dropdown">
                <Link to={'/'}>
                  <span>Login</span> <i className="bi bi-chevron-down"></i>
                </Link>
                <ul>
                  <li>
                    <Link to={'/coachlogin'}>Login as a Coach</Link>
                  </li>

                  <li>
                    <Link to={'/userlogin'}>Login as a User</Link>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <Link to={'/'}>
                  <span>Register</span> <i className="bi bi-chevron-down"></i>
                </Link>
                <ul>
                  <li>
                    <Link to={'/coachsignup'}>Register as a Coach</Link>
                  </li>

                  <li>
                    <Link to={'/usersignup'}>Register as a User</Link>
                  </li>
                </ul>
              </li>

              <li>
                <a className="getstarted scrollto" href="#about">
                  Get Started
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavigationBar;
