import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faHouseUser,
  faHashtag,
  faBell,
  faEnvelope,
  faBookmark,
  faFileLines,
  faCircleUser,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import "./sidenav.css";
import { Button } from "react-bootstrap";

const Sidenav = () => {
  return (
    <>
      <nav className="sidenav px-2">
        <FontAwesomeIcon icon={faTwitter} className="fa-2xl logo" />

        <div className="navItem">
          <div className="iconDiv">
            <FontAwesomeIcon icon={faHouseUser} className="me-3 fa-xl" />
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
      </nav>
    </>
  );
};

export default Sidenav;
