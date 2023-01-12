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
  faFeather,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import "./sidenav.css";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import UserMenu from "./../userMenu/UserMenu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PostModal from "../postModal/PostModal";

const Sidenav = ({ windowWidth }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const navigate = useNavigate();
  const homeClickHandler = () => {
    navigate("/home");
  };

  const sideNavItems = [
    {
      id: 2,
      name: "Explore",
      icon: faHashtag,
    },
    {
      id: 3,
      name: "Notifications",
      icon: faBell,
    },
    {
      id: 4,
      name: "Messages",
      icon: faEnvelope,
    },
    {
      id: 5,
      name: "Bookmarks",
      icon: faBookmark,
    },
    {
      id: 6,
      name: "Lists",
      icon: faFileLines,
    },
    {
      id: 7,
      name: "Profile",
      icon: faCircleUser,
    },
    {
      id: 8,
      name: "More",
      icon: faEllipsis,
    },
  ];

  return (
    <>
      <nav className="sidenav px-2">
        <div className="logoDiv" onClick={homeClickHandler}>
          <FontAwesomeIcon icon={faTwitter} className="fa-2xl logo" />
        </div>
        <div className="navItem" key={1} onClick={homeClickHandler}>
          <div className="iconDiv">
            <FontAwesomeIcon
              color="#1d9bf0"
              icon={faHouse}
              className={`${windowWidth > 1260 ? "me-3" : "m-auto"} fa-xl`}
            />
          </div>
          <h5 className="sidenavItemTitle">Home</h5>
        </div>

        {sideNavItems.map((item, i) => {
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
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                data-tip={!item.handler && ""}
                data-for={!item.handler && "outOfScope"}
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

        <UserMenu windowWidth={windowWidth} />
        <PostModal
          showPostModal={showPostModal}
          handleClosePostModal={() => setShowPostModal(false)}
        />
        {/* {showTooltip && <FontAwesomeIcon icon={faCircleInfo} />} */}
      </nav>
    </>
  );
};

export default Sidenav;
