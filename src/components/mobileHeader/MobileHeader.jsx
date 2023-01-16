import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";
import "./mobileHeader.css";
import MobileUserMenu from "./mobileUserMenu/MobileUserMenu";

const MobileHeader = () => {
  return (
    <div className="header border-bottom">
      <div className="userMenu">
        <MobileUserMenu />
      </div>
      <div className="logo">
        <FontAwesomeIcon icon={faTwitter} className="fa-xl" />
      </div>
    </div>
  );
};

export default MobileHeader;
