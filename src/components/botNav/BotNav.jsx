import {
  faCircleInfo,
  faHome,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import "./botnav.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";

const BotNav = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleHomeClicked = () => {
    window.scrollTo(0, 0);
    navigate("/home");
  };

  return (
    <>
      <Container className="botnav border-top">
        <Row className="d-flex justify-content-between">
          <Col>
            <Button className="bg-white border-0" onClick={handleHomeClicked}>
              <FontAwesomeIcon icon={faHome} className="fs-2" color="#1d9bf0" />
            </Button>
          </Col>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="out-of-scope">
                <FontAwesomeIcon icon={faCircleInfo} />{" "}
                <span>This feature is out of the scope of this project</span>
              </Tooltip>
            }
          >
            <Col className="d-flex align-items-center">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-2" />
            </Col>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="out-of-scope">
                <FontAwesomeIcon icon={faCircleInfo} />{" "}
                <span>This feature is out of the scope of this project</span>
              </Tooltip>
            }
          >
            <Col className="d-flex align-items-center">
              <FontAwesomeIcon icon={faBell} className="fs-2" />
            </Col>
          </OverlayTrigger>
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
