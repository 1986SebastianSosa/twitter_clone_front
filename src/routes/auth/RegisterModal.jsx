import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  Button,
  Modal,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import * as Yup from "yup";
import { registerUser } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import MyToast from "./../../components/myToast/MyToast";

function RegisterModal({ showRegisterModal, handleCloseRegisterModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    username: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const response = await registerUser(values);
      console.log(response);
      if (!response) {
        setIsLoading(false);
        setErrorMsg("No server response");
        setError(true);
      } else if (response.response?.status === 409) {
        setIsLoading(false);
        setErrorMsg(response.response.data.msj);
        setError(true);
      }

      if (response.data) {
        dispatch(setCredentials(response.data));
        handleCloseRegisterModal();
        setIsLoading(false);
        navigate("/home");
      }
    },
  });

  const inputFields = [
    {
      id: 1,
      name: "firstname",
      type: "text",
      placeholder: "Enter your firstname",
      label: "Firstname:",
    },
    {
      id: 2,
      name: "lastname",
      type: "text",
      placeholder: "Enter your lastname",
      label: "Lastname:",
    },
    {
      id: 3,
      name: "username",
      type: "text",
      placeholder: "Enter your username",
      label: "Username:",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password:",
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      label: "Password confirmation:",
    },
    {
      id: 6,
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email:",
    },
  ];

  return (
    <>
      <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
        {isLoading ? (
          <PuffLoader size={200} color="#1d9bf0" className="m-auto" />
        ) : error ? (
          <div className="m-auto py-5">
            <MyToast
              show={error}
              onClose={() => setError(false)}
              content={errorMsg}
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
                Create your account
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
                <Button variant="secondary" onClick={handleCloseRegisterModal}>
                  Close
                </Button>
                <Button variant="primary" type="submit" className="text-white">
                  Create account
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        )}
      </Modal>
    </>
  );
}

export default RegisterModal;
