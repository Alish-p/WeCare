import { Formik, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../redux/Slices/UserAuth';
import TextField from '../Util/FormComponents/TextField';
import SelectField from '../Util/FormComponents/RadioField';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { userSchema } from '../Util/ValidationSchema';
import { Link } from 'react-router-dom';

const UserSignup = () => {
  const isRegistered = useSelector((state) => state.user.isRegistered);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const initialvalues = {
    name: '',
    password: '',
    email: '',
    dateOfBirth: '',
    mobileNumber: '',
    gender: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerUser(values));
    setSubmitting(false);
  };

  if (isRegistered) {
    return (
      <div>
        <section id="contact" className="contact">
          <Container data-aos="fade-in">
            <div className="section-title">
              <h1>Account created Successflly !</h1>
              <h3>Your User-ID is {userId}</h3>
              <Link to={'/userlogin'}>
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
            <h2>User Profile</h2>
          </div>

          <Formik
            initialValues={initialvalues}
            onSubmit={handleSubmit}
            validationSchema={userSchema}
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
                  type="email"
                  name="email"
                  component={TextField}
                  label="Email"
                  placeholder="Enter your Email"
                />
                <Field
                  type="password"
                  name="password"
                  component={TextField}
                  label="Password"
                  placeholder="Enter your password"
                />
                <Row>
                  <Col lg={6} md={6}>
                    <Field
                      type="date"
                      name="dateOfBirth"
                      component={TextField}
                      label="Date of Birth"
                      placeholder="Enter your Birth Date"
                    />
                  </Col>
                  <Col lg={6} md={6}>
                    <Field
                      type="tel"
                      name="mobileNumber"
                      component={TextField}
                      label="Mobile Number"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} md={6}>
                    <Field
                      type="postal"
                      name="pincode"
                      component={TextField}
                      label="Pincode"
                    />
                  </Col>
                  <Col lg={6} md={6}>
                    <Field
                      type="text"
                      name="city"
                      component={TextField}
                      label="City"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} md={6}>
                    <Field
                      type="text"
                      name="state"
                      component={TextField}
                      label="State"
                    />
                  </Col>
                  <Col lg={6} md={6}>
                    <Field
                      type="text"
                      name="country"
                      component={TextField}
                      label="Coutry"
                    />
                  </Col>
                </Row>

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

export default UserSignup;
