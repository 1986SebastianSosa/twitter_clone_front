import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import accessImg from "../../img/lohp_en_1302x955.png";
import "./access.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { Button } from "react-bootstrap";
import GoogleIcon from "../../img/google_icon.png";

const Access = () => {
  return (
    <Container fluid className="m-0 p-0">
      <Row className="accessMain">
        <Col xs={12} lg={7} className="m-0 p-0">
          <div className="accessImgDiv">
            <img src={accessImg} alt="" />
            <FontAwesomeIcon icon={faTwitter} className="twitterLogo" />
          </div>
        </Col>
        <Col xs={12} lg={5} className="m-0 p-0">
          <Row flex-column className="accessRegisterLogin">
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
              <button className="button">
                <img src={GoogleIcon} alt="" className="btnImg" />
                Sign up with Google
              </button>
            </Col>
            <Col className="mb-2">
              <button className="button">
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
              <button className="button phoneOrEmail">
                Sign up with phone or email
              </button>
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
              <button className="button signInBtn">Sign in</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Access;
