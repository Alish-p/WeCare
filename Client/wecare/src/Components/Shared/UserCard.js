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

const UserCard = ({
  user: { name, userId, dateOfBirth, email, city, state, country, pincode },
}) => {
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
              <span>User ID: {userId}</span>
              <p>Date Of Birth: {dateOfBirth}</p>
              <p>Email: {email}</p>
              <p>Address: {`${city}, ${state},${country}`}</p>
              <p>Pincode: {pincode}</p>
            </div>
            <div className="social">
              <Link to={`/userhome`}>
                <StyledButton variant="outline-primary">Go Back</StyledButton>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default UserCard;
