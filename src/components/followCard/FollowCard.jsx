import { Row, Col, Button } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./followCard.css";
import { selectUser, updateUser } from "../../redux/authSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const FollowCard = ({ suggestion }) => {
  const axiosPrivate = useAxiosPrivate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosPrivate.get("/user");
        dispatch(updateUser(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user.following.includes(suggestion._id)) {
      setIsFollowed(true);
    }
    setIsLoading(false);
  }, [user]);

  const handleFollow = async () => {
    setIsFollowed(true);
    try {
      const response = await axiosPrivate.post("/follower/follow", {
        userToFollowId: suggestion._id,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    setIsFollowed(false);
    try {
      const response = await axiosPrivate.post("/follower/unfollow", {
        userToUnfollowId: suggestion._id,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setFollowBtn = (following) => {
    switch (following) {
      case false:
        return (
          <Button
            className="follow-btn bg-dark text-white rounded-pill px-3 py-1"
            onClick={handleFollow}
          >
            <span>Follow</span>
          </Button>
        );
      case true:
        return (
          <Button
            className="unfollow-btn bg-light text-dark rounded-pill px-3 py-1"
            onClick={handleUnfollow}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <span>{isMouseOver ? "Unfollow" : "Following"}</span>
          </Button>
        );
    }
  };

  return (
    !isLoading && (
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
    )
  );

  function handleMouseOver() {
    setIsMouseOver(true);
  }

  function handleMouseOut() {
    setIsMouseOver(false);
  }
};

export default FollowCard;
