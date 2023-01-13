import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { setWindowWidth } from "../../redux/appSlice";
import accessImg from "../../img/lohp_en_1302x955.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faApple } from "@fortawesome/free-brands-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import GoogleIcon from "../../img/google_icon.png";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useDispatch } from "react-redux";
import "./access.css";

const Access = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWindowWidth(window.innerWidth));
  }, []);

  return (
    <Container fluid className="m-0 p-0">
      <Row className="accessMain m-0">
        <Col xs={12} lg={7} className="m-0 p-0">
          <div className="accessImgDiv">
            <img src={accessImg} alt="" />
            <FontAwesomeIcon icon={faTwitter} className="twitterLogo" />
          </div>
        </Col>
        <Col xs={12} lg={5} className=" p-0 accessRegisterColumn">
          <Row className="accessRegisterLogin flex-column">
            <Col className="mb-5">
              <FontAwesomeIcon icon={faTwitter} className="twitterLogo fa-3x" />
            </Col>
            <Col className="mb-4">
              <h1>Happening now</h1>
            </Col>
            <Col className="mb-3">
              <h3>Join Twitter today</h3>
            </Col>
            <Col className="btnContainer mb-2">
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="comming-soon">
                    <div>
                      <FontAwesomeIcon icon={faCircleInfo} />
                      {"   "}
                      <span>Comming soon!</span>
                    </div>
                  </Tooltip>
                }
              >
                <button className="button" id="google">
                  <img src={GoogleIcon} alt="" className="btnImg" />
                  Sign up with Google
                </button>
              </OverlayTrigger>
            </Col>
            <Col className="mb-2">
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="comming-soon">
                    <div>
                      <FontAwesomeIcon icon={faCircleInfo} />
                      {"   "}
                      <span>Comming soon!</span>
                    </div>
                  </Tooltip>
                }
              >
                <button className="button" data-for="apple" data-tip="">
                  {" "}
                  <FontAwesomeIcon icon={faApple} className="appleLogo fa-xl" />
                  Sign up with Apple
                </button>
              </OverlayTrigger>
            </Col>
            <Col className="mb-2" style={{ display: "flex", width: "300px" }}>
              <div className="divider">
                <div className="dividerLine"></div>
              </div>
              <span>or</span>
              <div className="divider">
                <div className="dividerLine"></div>
              </div>
            </Col>
            <Col className="mb-2">
              <button
                className="button phoneOrEmail"
                onClick={() => setShowRegisterModal(true)}
              >
                Sign up with phone or email
              </button>
              <RegisterModal
                showRegisterModal={showRegisterModal}
                handleCloseRegisterModal={() => setShowRegisterModal(false)}
              />
            </Col>
            <Col className="mb-5">
              <p className="disclaimer">
                By signing up, you agree to the <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a> including{" "}
                <a href="#">Cookie Use</a>.
              </p>
            </Col>
            <Col className="mb-3">
              <h5>Already have an account?</h5>
            </Col>
            <Col>
              <button
                className="button signInBtn"
                onClick={() => setShowLoginModal(true)}
              >
                Sign in
              </button>
            </Col>
            <LoginModal
              showLoginModal={showLoginModal}
              handleCloseLoginModal={() => setShowLoginModal(false)}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Access;
