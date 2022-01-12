import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCoaches } from '../redux/Slices/Coaches';
import { setBooked } from '../redux/Slices/UserAuth';
import CoachCard from './Shared/CoachCard';

const UserHome = ({ showBookButton = true }) => {
  const dispatch = useDispatch();
  const coaches = useSelector((state) => state.coaches.coaches);
  const isLoading = useSelector((state) => state.coaches.isLoading);

  useEffect(() => {
    dispatch(setBooked(false));
    dispatch(getAllCoaches());
  }, []);

  return (
    <div>
      <section id="team" className="team section-bg">
        <Container data-aos="fade-in">
          {/* <!-- ======= Team Section ======= --> */}
          <div className="section-title">
            <h2>Team</h2>
            <p>
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur
              ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
              quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
              Quia fugiat sit in iste officiis commodi quidem hic quas.
            </p>
          </div>

          <Row>
            {!isLoading &&
              coaches.map(({ coachId, name, speciality }) => (
                <CoachCard
                  key={coachId}
                  name={name}
                  coachId={coachId}
                  speciality={speciality}
                  showBookButton={showBookButton}
                />
              ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default UserHome;
