import { useEffect, useState } from 'react';
import { Container, Modal, Row, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getMyAppointments } from '../redux/Slices/UserAuth';
import BookingCard from './Shared/BookingCard';

const UserAppointments = () => {
  const dispatch = useDispatch();
  const myAppointments =
    useSelector((state) => state.user.myAppointments) || [];
  const userId = useSelector((state) => state.user.userId);
  const isLoading = useSelector((state) => state.user.isLoading);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getMyAppointments(userId));
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
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Appointment Cancelled !!</Modal.Title>
            </Modal.Header>
          </Modal>
          {/* <!-- ======= Team Section ======= --> */}
          <div className="section-title">
            <h2>Your Appointments</h2>
          </div>

          <Row>
            {myAppointments && myAppointments.length === 0 ? (
              <h1>No myAppointments</h1>
            ) : (
              myAppointments.map((booking) => (
                <BookingCard
                  key={booking.bookingId}
                  booking={booking}
                  isUser={true}
                  showModal={handleShow}
                />
              ))
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default UserAppointments;
