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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/authSlice";
import MyToast from "../../components/myToast/MyToast";
import { PuffLoader } from "react-spinners";
import { useState } from "react";
import { useLoginMutation } from "../../app/api/authApiSlice";
import { inputFields } from "../../util/loginModalInputFields";

const LoginModal = ({ showLoginModal, handleCloseLoginModal }) => {
  const [showToast, setShowToast] = useState(false);
  const [login, response] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleCloseToast = () => {
    setShowToast(false);
  };

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
      try {
        const results = await login(values).unwrap();
        dispatch(setCredentials(results));
        navigate("/home");
      } catch (err) {
        setShowToast(true);
      }
      if (response.isSuccess) {
        navigate("/home");
      }
    },
  });

  return (
    <>
      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        {response.isLoading ? (
          <PuffLoader size={200} color="#1d9bf0" className="m-auto my-5" />
        ) : showToast ? (
          <div className="m-auto my-5">
            <MyToast
              show={showToast}
              close={toggleCloseToast}
              content={response?.error?.data?.msg || response?.error?.error}
            />
          </div>
        ) : (
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
                      {formik.errors[field.name] &&
                      formik.touched[field.name] ? (
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
                <Button variant="primary" type="submit" className="text-white">
                  Login
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        )}
      </Modal>
    </>
  );
};

export default LoginModal;
