import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { sidenavItems } from "./utils/sidevavUtils";
import {
  faHouse,
  faFeather,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import "./sidenav.css";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import UserMenu from "./../userMenu/UserMenu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PostModal from "../postModal/PostModal";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";

const Sidenav = ({ windowWidth }) => {
  const user = useSelector(selectUser);
  const [showPostModal, setShowPostModal] = useState(false);
  const navigate = useNavigate();

  const handleHomeClicked = () => {
    window.scrollTo(0, 0);
    navigate("/home");
  };

  return (
    <>
      <nav className="sidenav px-2">
        <div className="logoDiv" onClick={handleHomeClicked}>
          <FontAwesomeIcon icon={faTwitter} className="fa-2xl logo" />
        </div>
        <div className="navItem" key={1} onClick={handleHomeClicked}>
          <div className="iconDiv">
            <FontAwesomeIcon
              color="#1d9bf0"
              icon={faHouse}
              className={`${windowWidth > 1260 ? "me-3" : "m-auto"} fa-xl`}
            />
          </div>
          <h5 className="sidenavItemTitle">Home</h5>
        </div>

        {sidenavItems.map((item, i) => {
          return (
            <OverlayTrigger
              key={i}
              placement="right"
              overlay={
                <Tooltip id="out-of-scope">
                  <FontAwesomeIcon icon={faCircleInfo} />{" "}
                  <span>This feature is out of the scope of this project</span>
                </Tooltip>
              }
            >
              <div
                className="navItem"
                key={item.id}
                onClick={item.handler && item.handler}
              >
                <div className="iconDiv">
                  <FontAwesomeIcon
                    color={item.color}
                    icon={item.icon}
                    className={`${
                      windowWidth > 1260 ? "me-3" : "m-auto"
                    } fa-xl`}
                  />
                </div>
                <h5 className="sidenavItemTitle">{item.name}</h5>
              </div>
            </OverlayTrigger>
          );
        })}
        {windowWidth >= 1260 ? (
          <Button
            onClick={() => setShowPostModal(true)}
            className="tweetBtn rounded-pill text-white fw-bold fs-5"
          >
            Tweet
          </Button>
        ) : (
          <Button className="tweetBtn rounded-circle text-white fw-bold fs-5">
            <FontAwesomeIcon icon={faFeather} />
          </Button>
        )}
        {user && <UserMenu windowWidth={windowWidth} />}

        <PostModal
          showPostModal={showPostModal}
          handleClosePostModal={() => setShowPostModal(false)}
        />
      </nav>
    </>
  );
};

export default Sidenav;
