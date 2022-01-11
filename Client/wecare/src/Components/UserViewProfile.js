import { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile } from '../redux/Slices/UserAuth';
import UserCard from './Shared/UserCard';

const UserViewProfile = () => {
  const userId = useSelector((state) => state.user.userId);
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile(userId));
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
          <div className="section-title">
            <h2>Profile</h2>
          </div>
          <UserCard user={user} />
        </Container>
      </section>
    </div>
  );
};

export default UserViewProfile;
