import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img from '../../Assets/team/team-1.jpg';

const StyledButton = styled(Button)`
  padding-left: '-3px';
  color: #37517e;
  border-color: #37517e;
  &:hover {
    background-color: #37517e;
  }
`;

const CoachCard = ({ name, coachId, speciality, mobileNumber }) => {
  return (
    <Col lg={6} className="my-3">
      <Container className="member" data-aos="zoom-in" data-aos-delay="100">
        <Row>
          <Col>
            <div className="pic">
              <img src={img} className="img-fluid" alt="" />
            </div>
          </Col>
          <Col>
            <div className="member-info">
              <h4>{name}</h4>
              <span>Coach ID: {coachId}</span>
              <p>Specializes in {speciality}</p>
              <div className="social">
                <Link to={`/makeappointment/${coachId}`}>
                  <StyledButton variant="outline-primary">
                    Book an Appointment
                  </StyledButton>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default CoachCard;
