import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { findAllAppointments } from '../redux/Slices/CoachAuth';
import BookingCard from './Shared/BookingCard';

const CoachHome = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.coach.bookings);
  const coachId = useSelector((state) => state.coach.coachId);

  useEffect(() => {
    dispatch(findAllAppointments(coachId));
  }, []);

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
