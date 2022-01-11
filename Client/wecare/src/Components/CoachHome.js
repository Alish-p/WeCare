import { useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { findAllAppointments } from '../redux/Slices/CoachAuth';
import BookingCard from './Shared/BookingCard';

const CoachHome = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.coach.bookings);
  const coachId = useSelector((state) => state.coach.coachId);
  const isLoading = useSelector((state) => state.coach.isLoading);

  useEffect(() => {
    dispatch(findAllAppointments(coachId));
  }, []);

  if (isLoading) {
    return (
      <div>
        <section id="team" className="team section-bg">
          <Container data-aos="fade-in">
            <div className="section-title">
              <h2>Loading...</h2>
              <Spinner animation="border" role="status"></Spinner>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section id="team" className="team section-bg">
        <Container data-aos="fade-in">
          {/* <!-- ======= Team Section ======= --> */}
          <div className="section-title">
            <h2>Your Appointments</h2>
          </div>

          <Row>
            {bookings && bookings.length === 0 ? (
              <h1>No Bookings</h1>
            ) : (
              bookings.map((booking) => (
                <BookingCard key={booking.bookingId} booking={booking} />
              ))
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default CoachHome;
