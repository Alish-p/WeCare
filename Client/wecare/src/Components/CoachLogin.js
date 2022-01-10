import { Formik, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { loginCoach } from '../redux/Slices/CoachAuth';
import TextField from '../Util/FormComponents/TextField';
import { Form, Container, Button } from 'react-bootstrap';
import { LoginSchema } from '../Util/ValidationSchema';
import { Navigate } from 'react-router-dom';

const CoachLogin = () => {
  const isLogged = useSelector((state) => state.coach.isLogged);
  const coachId = useSelector((state) => state.coach.coachId);
  const error = useSelector((state) => state.coach.error);
  const dispatch = useDispatch();

  const initialvalues = {
    id: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    dispatch(loginCoach(values));
    setSubmitting(false);
  };

  if (isLogged) {
    return <Navigate replace={true} to="/coachhome"></Navigate>;
  }

  return (
    <div>
      <section id="contact" className="contact">
        <Container data-aos="fade-in">
          <div className="section-title">
            <h2>Login as a Coach</h2>
          </div>

          <Formik
            initialValues={initialvalues}
            onSubmit={handleSubmit}
            validationSchema={LoginSchema}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  type="text"
                  name="id"
                  component={TextField}
                  label="Coach Id"
                  placeholder="Enter your Coach-Id"
                />
                <Field
                  type="password"
                  name="password"
                  component={TextField}
                  label="Password"
                  placeholder="Enter your password"
                />

                {error && <p class="text-danger">{error}</p>}

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

export default CoachLogin;
