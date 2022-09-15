import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faEnvelope,
  faBookmark,
  faFileLines,
  faCircleUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHouse,
  faEllipsis,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import "./sidenav.css";
import { Button } from "react-bootstrap";
import UserMenu from "./../userMenu/UserMenu";
import { useNavigate } from "react-router-dom";

const Sidenav = () => {
  const navigate = useNavigate();
  const homeClickHandler = () => {
    navigate("/home");
  };
  return (
    <>
      <nav className="sidenav px-2">
        <FontAwesomeIcon
          icon={faTwitter}
          className="fa-2xl logo"
          onClick={homeClickHandler}
        />

        <div className="navItem" onClick={homeClickHandler}>
          <div className="iconDiv">
            <FontAwesomeIcon icon={faHouse} className="me-3 fa-xl" />
          </div>
          <h5>Home</h5>
        </div>
        <div className="navItem">
          <div className="iconDiv">
            <FontAwesomeIcon icon={faHashtag} className="me-3 fa-xl" />
          </div>
          <h5>Explore</h5>
        </div>
        <div className="navItem">
          <div className="iconDiv">
            <FontAwesomeIcon icon={faBell} className="me-3 fa-xl" />
          </div>
          <h5>Notifications</h5>
        </div>
        <div className="navItem">
          <div className="iconDiv">
            <FontAwesomeIcon icon={faEnvelope} className="me-3 fa-xl" />
          </div>
          <h5>Messages</h5>
        </div>
        <div className="navItem">
          <div className="iconDiv">
            <FontAwesomeIcon icon={faBookmark} className="me-3 fa-xl" />
          </div>
          <h5>Bookmarks</h5>
        </div>
        <div className="navItem">
          <div className="iconDiv">
            <FontAwesomeIcon icon={faFileLines} className="me-3 fa-xl" />
          </div>
          <h5>Lists</h5>
        </div>
        <div className="navItem">
          <div className="iconDiv">
            <FontAwesomeIcon icon={faCircleUser} className="me-3 fa-xl" />
          </div>
          <h5>Profile</h5>
        </div>
        <div className="navItem">
          <div className="iconDiv">
            <FontAwesomeIcon icon={faEllipsis} className="me-3 fa-xl" />
          </div>
          <h5>More</h5>
        </div>
        <Button className="rounded-pill text-white fw-bold py-3 fs-5 ">
          Tweet
        </Button>
        <UserMenu />
      </nav>
    </>
  );
};

export default Sidenav;
