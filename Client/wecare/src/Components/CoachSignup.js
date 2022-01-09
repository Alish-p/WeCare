import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { registerCoach } from '../redux/Slices/Auth';
import TextField from '../Util/FormComponents/TextField';
import SelectField from '../Util/FormComponents/RadioField';
import { Form, Container, Button, Row, Col, Card } from 'react-bootstrap';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name should have 3 to 50 characters')
    .max(50, 'Name should have 3 to 50 characters')
    .required('Name is Required'),
  password: Yup.string()
    .min(5, 'Password should have 5 to 10 characters')
    .max(10, 'Password should have 5 to 10 characters')
    .required('Password is Required'),
  speciality: Yup.string()
    .min(10, 'Speciality should have 10 to 50 characters')
    .max(50, 'Speciality should have 10 to 50 characters')
    .required('Speciality is Required'),
  mobileNumber: Yup.string().matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    'Mobile Number should have 10 digits'
  ),
  dateOfBirth: Yup.string()
    .required('DOB is Required')
    .test(
      'DOB',
      'Age should be between 20 and 100 years',
      (date) =>
        moment().diff(moment(date), 'years') >= 20 &&
        moment().diff(moment(date), 'years') <= 100
    ),
  gender: Yup.string().required('Gender is Required'),
});

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
    console.log(values);
    dispatch(registerCoach(values));
    setSubmitting(false);
  };

  if (isRegistered) {
    return (
      <div>
        <h1 color="yello">You are registered</h1>
        <h3>Your coach id {coachId}</h3>
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
            validationSchema={schema}
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
                      placeholder="Enter your Birth Date"
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
