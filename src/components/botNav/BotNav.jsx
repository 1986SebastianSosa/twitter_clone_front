import {
  faHome,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./botnav.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BotNav = () => {
  const user = useSelector((state) => state.auth.user);
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
              <FontAwesomeIcon icon={faHome} className="fs-2" color="#1d9bf0" />
            </Button>
          </Col>
          <Col className="d-flex align-items-center">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-2" />
          </Col>
          <Col className="d-flex align-items-center">
            <FontAwesomeIcon icon={faBell} className="fs-2" />
          </Col>
          <Col className="d-flex align-items-center">
            <FontAwesomeIcon
              icon={faUser}
              className="fs-2"
              color="#1d9bf0"
              onClick={() => navigate(`/follow/${user._id}`)}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BotNav;
