import {
  Modal,
  FormGroup,
  FormLabel,
  FormControl,
  Form,
  Button,
} from "react-bootstrap";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { loginUser } from "../../services/authServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserReducer } from "../../redux/userSlice";

const LoginModal = ({ showLoginModal, handleCloseLoginModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const response = await loginUser(values);
      console.log(response);
      if (Object.entries(response).length > 0) {
        handleCloseLoginModal();
        dispatch(loginUserReducer(response));
        navigate("/home");
      }
    },
  });

  const inputFields = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email:",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password:",
    },
  ];

  return (
    <>
      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Modal.Dialog className="m-0">
          <Modal.Header closeButton>
            <Modal.Title>
              <FontAwesomeIcon
                icon={faTwitter}
                className="twitterLogo fa"
                color="rgb(29, 155, 240)"
              />{" "}
              Login to your account
            </Modal.Title>
          </Modal.Header>

          <Form noValidate onSubmit={formik.handleSubmit}>
            <Modal.Body>
              {inputFields.map((field) => {
                return (
                  <FormGroup
                    key={field.id}
                    controlId={field.name}
                    className="mb-4"
                  >
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formik.values[field.name]}
                      onChange={formik.handleChange}
                    />
                    {formik.errors[field.name] && formik.touched[field.name] ? (
                      <div>
                        <p className="text-danger">
                          <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className="me-1"
                          />
                          {formik.errors[field.name]}
                        </p>
                      </div>
                    ) : null}
                  </FormGroup>
                );
              })}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseLoginModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default LoginModal;
