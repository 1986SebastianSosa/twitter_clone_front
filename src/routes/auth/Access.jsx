import { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import accessImg from "../../img/lohp_en_1302x955.png";
import "./access.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faApple } from "@fortawesome/free-brands-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import GoogleIcon from "../../img/google_icon.png";
import ReactTooltip from "react-tooltip";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

const Access = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  return (
    <Container fluid className="m-0 p-0">
      <ReactTooltip
        id="google"
        getContent={() => {
          return;
        }}
      >
        <FontAwesomeIcon icon={faCircleInfo} /> Comming soon!
      </ReactTooltip>
      <ReactTooltip
        id="apple"
        getContent={() => {
          return;
        }}
      >
        <FontAwesomeIcon icon={faCircleInfo} /> Comming soon!
      </ReactTooltip>
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
              <button className="button" data-tip="" data-for="google">
                <img src={GoogleIcon} alt="" className="btnImg" />
                Sign up with Google
              </button>
            </Col>
            <Col className="mb-2">
              <button className="button" data-for="apple" data-tip="">
                {" "}
                <FontAwesomeIcon icon={faApple} className="appleLogo fa-xl" />
                Sign up with Apple
              </button>
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
                onClick={handleShowRegisterModal}
              >
                Sign up with phone or email
              </button>
              <RegisterModal
                showRegisterModal={showRegisterModal}
                handleCloseRegisterModal={handleCloseRegisterModal}
              />
            </Col>
            <Col className="mb-5">
              <p className="disclaimer">
                By signing up, you agree to the <a href="">Terms of Service</a>{" "}
                and <a href="">Privacy Policy</a> including{" "}
                <a href="">Cookie Use</a>.
              </p>
            </Col>
            <Col className="mb-3">
              <h5>Already have an account?</h5>
            </Col>
            <Col>
              <button
                className="button signInBtn"
                onClick={handleShowLoginModal}
              >
                Sign in
              </button>
            </Col>
            <LoginModal
              showLoginModal={showLoginModal}
              handleCloseLoginModal={handleCloseLoginModal}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Access;
