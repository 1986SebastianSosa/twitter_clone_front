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
import { useState } from "react";
import MyToast from "../../components/myToast/MyToast";
import { PuffLoader } from "react-spinners";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { loginInputFields } from "./util/authUtils";

const LoginModal = ({ showLoginModal, handleCloseLoginModal }) => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

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
      setIsLoading(true);
      try {
        const response = await axiosPrivate.post("/auth/login", values);
        dispatch(setCredentials(response.data));
        navigate("/home");
        handleCloseLoginModal();
      } catch (error) {
        setIsError(true);
        error?.response
          ? setError(error?.response?.data?.msg)
          : setError("The server seems to be offline. Try again later.");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        {isLoading ? (
          <div className="py-4">
            <PuffLoader size={100} color="#1d9bf0" className="m-auto" />
            <h6 className="m-auto my-5 text-center text-muted pt-3">
              Just a moment...
            </h6>
          </div>
        ) : isError ? (
          <div className="m-auto my-5">
            <MyToast
              show={isError}
              content={error}
              onClose={() => setIsError(false)}
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
                {loginInputFields.map((field) => {
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
                        value={formik.values[field.name].toLowerCase()}
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
