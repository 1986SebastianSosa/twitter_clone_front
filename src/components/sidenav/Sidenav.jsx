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
import { Button } from "react-bootstrap";
import UserMenu from "./../userMenu/UserMenu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactTooltip from "react-tooltip";

const Sidenav = ({ windowWidth }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  const homeClickHandler = () => {
    navigate("/home");
  };

  const sideNavItems = [
    {
      id: 1,
      name: "Home",
      icon: faHouse,
      handler: homeClickHandler,
    },
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
        <div className="logoDiv">
          <FontAwesomeIcon
            icon={faTwitter}
            className="fa-2xl logo"
            onClick={homeClickHandler}
          />
        </div>
        {sideNavItems.map((item) => {
          return (
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
                  icon={item.icon}
                  className={`${windowWidth > 1260 ? "me-3" : "m-auto"} fa-xl`}
                />
              </div>
              <h5 className="sidenavItemTitle">{item.name}</h5>
            </div>
          );
        })}
        {windowWidth >= 1260 ? (
          <Button className="tweetBtn rounded-pill text-white fw-bold fs-5">
            Tweet
          </Button>
        ) : (
          <Button className="tweetBtn rounded-circle text-white fw-bold fs-5">
            <FontAwesomeIcon icon={faFeather} />
          </Button>
        )}

        <UserMenu windowWidth={windowWidth} />
        {showTooltip && (
          <ReactTooltip
            id="outOfScope"
            getContent={() => {
              return;
            }}
            event="click"
            type="info"
          >
            <FontAwesomeIcon icon={faCircleInfo} /> This functionality is beyond
            the scope of this project
          </ReactTooltip>
        )}
      </nav>
    </>
  );
};

export default Sidenav;
