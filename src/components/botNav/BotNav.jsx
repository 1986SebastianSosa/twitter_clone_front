import { faHome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBell, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./botnav.css";
import { useNavigate } from "react-router-dom";

const BotNav = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container className="botnav border-top">
        <Row className="d-flex justify-content-between">
          <Col>
            <Button
              className="bg-white border-0"
              onClick={() => navigate("/home")}
            >
              <FontAwesomeIcon icon={faHome} className="fs-2 " />
            </Button>
          </Col>
          <Col className="d-flex align-items-center">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-2" />
          </Col>
          <Col className="d-flex align-items-center">
            <FontAwesomeIcon icon={faBell} className="fs-2" />
          </Col>
          <Col className="d-flex align-items-center">
            <FontAwesomeIcon icon={faEnvelope} className="fs-2" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BotNav;
