import { Button, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

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
}) => {
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
      </Container>
    </Col>
  );
};

export default BookingCard;
