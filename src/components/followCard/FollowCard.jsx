import { Row, Col, Button } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../services/followServices";
import { useEffect, useState } from "react";
import "./followCard.css";
import { selectToken, selectUser } from "../../redux/authSlice";

const FollowCard = ({ suggestion }) => {
  const loggedUser = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (loggedUser.following.includes(suggestion._id)) {
      setIsFollowed(true);
    }
  }, []);

  const followHandler = async () => {
    setIsFollowed(true);
    const response = await followUser(loggedUser, suggestion, token);
  };

  const unfollowHandler = async () => {
    setIsFollowed(false);
    const response = await unfollowUser(loggedUser, suggestion, token);
  };

  const setFollowBtn = (following) => {
    switch (following) {
      case false:
        return (
          <Button
            className="follow-btn bg-dark text-white rounded-pill px-3 py-1"
            onClick={followHandler}
          >
            <span>Follow</span>
          </Button>
        );
      case true:
        return (
          <Button
            className="unfollow-btn bg-light text-dark rounded-pill px-3 py-1"
            onClick={unfollowHandler}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <span>{isMouseOver ? "Unfollow" : "Following"}</span>
          </Button>
        );
    }
  };

  return (
    <>
      <Row className="follow-suggestion py-3 px-2">
        <Col xs={2} xl={1} className="px-0 mx-2 d-flex justify-content-center">
          <div className="avatar border rounded-circle d-flex justify-content-center align-items-center bg-light">
            <FontAwesomeIcon icon={faUser} className="fa-2x text-secondary" />
          </div>
        </Col>
        <Col className="p-0">
          <h6 className="fw-bold m-0">
            {suggestion.firstname + " " + suggestion.lastname}
          </h6>
          <div>
            <span className="text-muted">{"@" + suggestion.username}</span>
          </div>
        </Col>
        <Col xs={3}>
          <div className="d-flex justify-content-end">
            {setFollowBtn(isFollowed)}
          </div>
        </Col>
      </Row>
    </>
  );
  function handleMouseOver() {
    setIsMouseOver(true);
  }

  function handleMouseOut() {
    setIsMouseOver(false);
  }
};

export default FollowCard;
