import { Container } from 'react-bootstrap';

const About = () => {
  return (
    <>
      <section id="team" className="team section-bg">
        <Container data-aos="fade-in">
          <div className="section-title">
            <h2>About WeCare</h2>
            <p>
              WeCare is an online Life Coaching application that helps its users
              to sign up and log in to seek the guidance of famous Life Coaches.
              Users can search for a Life Coach based on specialty and can book
              an appointment within 7 days. They can also see upcoming
              appointments and can reschedule or cancel the appointments.
              Similarly, Life Coaches can also sign up and login and can see
              their upcoming schedule.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default About;
