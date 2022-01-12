import { Field, Formik } from 'formik';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { bookAppointment } from '../redux/Slices/UserAuth';
import SelectField from '../Util/FormComponents/RadioField';
import TextField from '../Util/FormComponents/TextField';
import { BookingSchema } from '../Util/ValidationSchema';

const MakeAppointment = () => {
  const { coachId } = useParams();
  const userId = useSelector((state) => state.user.userId);
  const booked = useSelector((state) => state.user.booked);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const initialvalues = {
    dateOfAppointment: '',
    slot: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(
      bookAppointment({
        userId,
        coachId,
        appointment: {
          slot: values.slot,
          dateOfAppointment: values.dateOfAppointment,
        },
      })
    );
    setSubmitting(false);
  };

  if (booked) {
    return (
      <div>
        <section id="contact" className="contact">
          <Container data-aos="fade-in">
            <div className="section-title">
              <h2>Your Appointment is scheduled successfully</h2>
              <Link to="/userhome">
                <Button>Go Back</Button>
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
            <h2>Make an Appointment</h2>
          </div>

          <Formik
            initialValues={initialvalues}
            onSubmit={handleSubmit}
            validationSchema={BookingSchema}
          >
            {({ isSubmitting, handleSubmit, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  type="date"
                  name="dateOfAppointment"
                  component={TextField}
                  label="Date Of Appointment"
                />
                <Field
                  name="slot"
                  component={SelectField}
                  label="Slot"
                  handleChange={handleChange}
                  options={[
                    { label: '9 am to 10 am', value: '9 am to 10 am' },
                    { label: '10 am to 11 am', value: '10 am to 11 am' },
                    { label: '11 am to 12 am', value: '11 am to 12 am' },
                    { label: '2 pm to 3 pm', value: '2 pm to 3 pm' },
                    { label: '3 pm to 4 pm', value: '3 pm to 4 pm' },
                    { label: '4 pm to 5 pm', value: '4 pm to 5 pm' },
                  ]}
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

export default MakeAppointment;
