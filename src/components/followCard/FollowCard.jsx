import { Row, Col, Button } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./followCard.css";
import { selectUser, updateUser } from "../../redux/authSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { selectWindowWidth } from "./../../redux/appSlice";
import { useLocation, useNavigate } from "react-router-dom";

const FollowCard = ({ suggestion, windowWidth }) => {
  const axiosPrivate = useAxiosPrivate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user.following.includes(suggestion._id)) {
      setIsFollowed(true);
    }
    setIsLoading(false);
  }, [user]);

  const handleFollow = async () => {
    setIsFollowed(true);
    try {
      await axiosPrivate.post("/follower/follow", {
        userToFollowId: suggestion._id,
      });

      const response = await axiosPrivate.get("/user");
      dispatch(updateUser(response.data));
    } catch (error) {
      setIsError(true);
      error.response?.status === 401 || error.response?.status === 403
        ? navigate("/")
        : error.response?.data?.msg
        ? setError(error?.response?.data?.msg)
        : setError("*Something went wrong. Try again later.");
    }
  };

  const handleUnfollow = async () => {
    setIsFollowed(false);
    try {
      await axiosPrivate.post("/follower/unfollow", {
        userToUnfollowId: suggestion._id,
      });
      const response = await axiosPrivate.get("/user");
      dispatch(updateUser(response.data));
    } catch (error) {
      setIsError(true);
      error.response?.status === 401 || error.response?.status === 403
        ? navigate("/")
        : error.response?.data?.msg
        ? setError(error?.response?.data?.msg)
        : setError("*Something went wrong. Try again later.");
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
      default:
        return;
    }
  };

  return (
    !isLoading && (
      <div className="border-bottom border-light">
        <Row className="follow-suggestion py-4 px-2 ">
          <Col
            xs={3}
            // sm={2}
            // lg={1}
            className="px-0 mx-2 d-flex justify-content-center"
          >
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
          <Col
            xs={
              location.pathname.split("/")[1] === "follow" && windowWidth > 400
                ? 4
                : 12
            }
          >
            <div
              className={`d-flex justify-content-${
                location.pathname.split("/")[1] === "follow" ? "end" : "center"
              }`}
            >
              {isError ? (
                <span className="text-danger">{error}</span>
              ) : (
                setFollowBtn(isFollowed)
              )}
            </div>
          </Col>
        </Row>
      </div>
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
