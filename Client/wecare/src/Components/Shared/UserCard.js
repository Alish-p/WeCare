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

const StyledSpan = styled.div`
  color: #37517e;
  display: inline;
  font-weight: bolder;
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
              <span>
                <h4>{name}</h4>
              </span>
              <br></br>
              <div>
                <StyledSpan>User ID: </StyledSpan> {userId}
              </div>
              <div>
                <StyledSpan>Date Of Birth: </StyledSpan>{' '}
                {new Date(dateOfBirth).toLocaleDateString('en-US')}
              </div>
              <div>
                <StyledSpan>Email: </StyledSpan> {email}
              </div>
              <div>
                <StyledSpan>Address: </StyledSpan>{' '}
                {`${city}, ${state},${country}`}
              </div>
              <div>
                <StyledSpan>Pincode: </StyledSpan> {pincode}
              </div>

              <div className="mt-3">
                <Link to={`/userhome`}>
                  <StyledButton variant="outline-primary">Go Back</StyledButton>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default UserCard;
