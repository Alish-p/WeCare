import { Formik, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/Slices/UserAuth';
import TextField from '../Util/FormComponents/TextField';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import { LoginSchema } from '../Util/ValidationSchema';
import { Link, Navigate, Re } from 'react-router-dom';

const UserLogin = () => {
  const isLogged = useSelector((state) => state.user.isLogged);
  const userId = useSelector((state) => state.user.userId);
  const isInvalid = useSelector((state) => state.user.isInvalid);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const initialvalues = {
    id: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    dispatch(loginUser(values));
    setSubmitting(false);
  };

  if (isLogged) {
    return <Navigate replace={true} to="/userhome"></Navigate>;
  }

  return (
    <div>
      <section id="contact" className="contact">
        <Container data-aos="fade-in">
          <div className="section-title">
            <h2>Login as a User</h2>
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
                  label="User Id"
                  placeholder="Enter your User-Id"
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

export default UserLogin;
