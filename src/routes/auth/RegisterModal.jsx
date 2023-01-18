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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import MyToast from "./../../components/myToast/MyToast";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { registerInputFields } from "./util/authUtils";

function RegisterModal({ showRegisterModal, handleCloseRegisterModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

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
      try {
        setIsLoading(true);
        const response = await axiosPrivate.post("/auth/register", values);

        dispatch(setCredentials(response.data));
        handleCloseRegisterModal();
        setIsLoading(false);
        navigate("/home");
      } catch (error) {
        console.log(error);
        setIsError(true);
        error?.response
          ? setError(error?.response?.data?.msg)
          : setError("The server seems to be offline. Try again later.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
        {isLoading ? (
          <>
            <PuffLoader size={100} color="#1d9bf0" className="m-auto" />
            <h6 className="m-auto text-center text-muted pt-3">
              Just a moment...
            </h6>
          </>
        ) : isError ? (
          <div className="m-auto py-5">
            <MyToast
              show={isError}
              onClose={() => setIsError(false)}
              content={error}
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
                {registerInputFields.map((field) => {
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
                        value={formik.values[field.name].toLocaleLowerCase()}
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
