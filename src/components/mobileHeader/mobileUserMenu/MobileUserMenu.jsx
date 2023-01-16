import { Col, Row, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut, selectUser } from "../../../redux/authSlice";
import "./mobileUserMenu.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const MobileUserMenu = ({ windowWidth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const user = useSelector(selectUser);
  const { firstname, lastname, username } = user;

  const logoutHandler = async () => {
    await axiosPrivate.post("/auth/logout");
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
          <p className="text-lead m-0 px-2 fw-bold fs-6">
            {"Log out @" + username}
          </p>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <div className="userMenu rounded-pill">
          <div className="avatar bg-light">
            <FontAwesomeIcon icon={faUser} className="fa-2x text-secondary" />
          </div>
        </div>
      </OverlayTrigger>
    </>
  );
};

export default MobileUserMenu;
