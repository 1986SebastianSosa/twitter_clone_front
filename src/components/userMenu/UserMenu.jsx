import { Col, Row, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./../../services/authServices";
import { logOut } from "../../redux/authSlice";
import "./userMenu.css";

const UserMenu = ({ windowWidth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const { firstname, lastname, username } = user;

  const logoutHandler = async () => {
    const response = await logoutUser();
    dispatch(logOut());
    navigate("/");
  };

  const popover = (
    <Popover className="popover">
      <Popover.Body className="p-0">
        <div className="border-bottom">
          <div className="p-2 py-3">
            <Row>
              <Col xs={3}>
                <div className="avatar bg-light">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="fa-2x text-secondary"
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <span className="fw-bold">{firstname + " " + lastname}</span>
                </div>
                <div>
                  <span className="text-muted">@{username}</span>
                </div>
              </Col>
              <Col xs={1} className="p-0 d-flex align-items-center">
                <div className="menuDots d-flex align-items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-primary" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="logout py-3" onClick={logoutHandler}>
          <p className="text-lead m-0 px-2">{"Log out @" + username}</p>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger trigger="click" placement="top" overlay={popover}>
        <div
          className={`userMenu mt-5 rounded-pill ${
            windowWidth >= 1260 && "px-4"
          } py-2`}
        >
          <Row className="d-flex justify-content-center">
            <Col className="d-flex justify-content-center p-0" xs={3}>
              <div className="avatar bg-light">
                <FontAwesomeIcon
                  icon={faUser}
                  className="fa-2x text-secondary"
                />
              </div>
            </Col>
            {windowWidth >= 1260 ? (
              <>
                {" "}
                <Col className="p-0">
                  <div>
                    <span className="fw-bold">
                      {firstname + " " + lastname}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted">@{username}</span>
                  </div>
                </Col>
                <Col xs={1} className="p-0 d-flex align-items-center">
                  <div className="menuDots d-flex align-items-center">
                    <span className="fw-bold">...</span>
                  </div>
                </Col>
              </>
            ) : null}
          </Row>
        </div>
      </OverlayTrigger>
    </>
  );
};

export default UserMenu;
