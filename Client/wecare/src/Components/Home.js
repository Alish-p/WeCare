import { Link } from 'react-router-dom';
import UserHome from './UserHome';
const Home = () => {
  return (
    <>
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1>We are at the heart of appropriate care</h1>
              <h2>
                We are team of talented designers making websites with Bootstrap
              </h2>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <Link to={'/about'} className="btn-get-started scrollto">
                  Get Started
                </Link>
                <Link to={'/about'} className="glightbox btn-watch-video">
                  <i className="bi bi-play-circle"></i>
                  <span>Watch Video</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UserHome showBookButton={false} />
    </>
  );
};

export default Home;
