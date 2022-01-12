import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cancelAppointment } from '../../redux/Slices/UserAuth';

const StyledButton = styled(Button)`
  padding-left: '-3px';
  color: #37517e;
  border-color: #37517e;
  &:hover {
    background-color: #37517e;
  }
`;

const BookingCard = ({
  booking: { bookingId, userId, dateOfAppointment, slot },
  isUser,
  showModal,
}) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    console.log(`my uid is `);
    console.log(userId);
    dispatch(cancelAppointment({ bookingId, userId }));
    showModal();
  };

  return (
    <Col lg={6} className="my-3">
      <Container className="member" data-aos="zoom-in" data-aos-delay="100">
        <Row>
          <Col>
            <div className="member-info">
              <h4>Appointment: {bookingId}</h4>
              <span>Date: {dateOfAppointment}</span>
              <p>Slot : {slot}</p>
              <p>User : {userId}</p>
            </div>
          </Col>
        </Row>
        {isUser && (
          <Row className="m-3">
            <Col>
              <Link to={`/reschedule/${bookingId}`}>
                <StyledButton variant="outline-primary">
                  Reschedule
                </StyledButton>
              </Link>
            </Col>
            <Col>
              <StyledButton variant="outline-primary" onClick={handleCancel}>
                Cancel
              </StyledButton>
            </Col>
          </Row>
        )}
      </Container>
    </Col>
  );
};

export default BookingCard;
