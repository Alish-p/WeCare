import { Formik, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerCoach } from '../redux/Slices/CoachAuth';
import TextField from '../Util/FormComponents/TextField';
import SelectField from '../Util/FormComponents/RadioField';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { coachSchema } from '../Util/ValidationSchema';

const CoachSignup = () => {
  const isRegistered = useSelector((state) => state.coach.isRegistered);
  const coachId = useSelector((state) => state.coach.coachId);
  const dispatch = useDispatch();

  const initialvalues = {
    name: '',
    password: '',
    dateOfBirth: '',
    mobileNumber: '',
    speciality: '',
    gender: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerCoach(values));
    setSubmitting(false);
  };

  if (isRegistered) {
    return (
      <div>
        <section id="contact" className="contact">
          <Container data-aos="fade-in">
            <div className="section-title">
              <h1>You are a Coach Now !</h1>
              <h3>Your Coach-ID is {coachId}</h3>
              <Link to={'/coachlogin'}>
                <Button>Login Now</Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section id="contact" className="contact">
        <Container data-aos="fade-in">
          <div className="section-title">
            <h2>Life Coach Profile</h2>
          </div>

          <Formik
            initialValues={initialvalues}
            onSubmit={handleSubmit}
            validationSchema={coachSchema}
          >
            {({ isSubmitting, handleSubmit, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  type="text"
                  name="name"
                  component={TextField}
                  label="Name"
                  placeholder="Enter your Name"
                />
                <Field
                  type="password"
                  name="password"
                  component={TextField}
                  label="Password"
                  placeholder="Enter your password"
                />
                <Row>
                  <Col lg={4} md={4}>
                    <Field
                      type="date"
                      name="dateOfBirth"
                      component={TextField}
                      label="Date of Birth"
                      placeholder="Enter your Birth Date"
                    />
                  </Col>
                  <Col lg={8} md={4}>
                    <Field
                      type="tel"
                      name="mobileNumber"
                      component={TextField}
                      label="Mobile Number"
                      placeholder="Enter your Mobile Number"
                    />
                  </Col>
                </Row>

                <Field
                  type="text"
                  name="speciality"
                  component={TextField}
                  label="Speciality"
                  placeholder="Enter your Speciality"
                />

                <Field
                  name="gender"
                  component={SelectField}
                  label="Gender"
                  handleChange={handleChange}
                  options={[
                    { label: 'Female', value: 'F' },
                    { label: 'Male', value: 'M' },
                  ]}
                />

                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </section>
    </div>
  );
};

export default CoachSignup;
