import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faUser,
  faRepeat,
  faArrowUpFromBracket,
  faCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteTweet, getAllTweets } from "../../services/tweetServices";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteModal from "./../deleteModal/DeleteModal";
import { fetchTweetLikes, likeTweet } from "../../services/likeServices";
import { PuffLoader } from "react-spinners";
import "./tweet.css";
import TweetReplyModal from "../tweetReplyModal/TweetReplyModal";

const Tweet = ({ tweet, setAllTweets, setShowDeleteToast }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [updatedTweet, setUpdatedTweet] = useState({});
  const [tweetLikes, setTweetLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleShowDeleteModal = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowCommentModal = (e) => {
    e.stopPropagation();
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
  };

  const handleDeleteTweet = async () => {
    setIsDeleteLoading(true);
    await deleteTweet(updatedTweet._id, token);
    if (location.pathname.split("/")[1] === "tweet") {
      return navigate("/home");
    } else {
      try {
        const response = await getAllTweets(user, token);
        const sortedData = await response.data.sort(
          (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
        );
        setAllTweets(sortedData);
        setIsDeleteLoading(false);
        setShowDeleteModal(false);
        setShowDeleteToast(true);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    await likeTweet(updatedTweet._id, user._id, token);
    const response = await fetchTweetLikes(updatedTweet._id, token);
    setTweetLikes(response.data);
  };

  const handleClick = (tweetId) => {
    navigate(`/tweet/${tweetId}`);
  };

  useEffect(() => {
    setUpdatedTweet(tweet);
  }, []);

  useEffect(() => {
    if (updatedTweet._id) {
      const fetch = async () => {
        const response = await fetchTweetLikes(updatedTweet._id, token);
        setTweetLikes(response.data);
        setIsLoading(false);
      };
      fetch();
    }
  }, [updatedTweet]);

  return (
    <>
      {isLoading ? (
        <PuffLoader color="#1d9bf0" className="m-auto" />
      ) : (
        <div onClick={(e) => handleClick(updatedTweet._id)} className="tweet">
          <Row className="p-2">
            <Col xs={2}>
              <div className="rounded-circle d-flex justify-content-center align-items-center user-icon bg-light">
                <FontAwesomeIcon
                  icon={faUser}
                  className="fa-3x text-secondary"
                />
              </div>
            </Col>
            <Col xs={10}>
              <Row className="d-flex flex-column">
                <Col className="d-flex justify-content-between tweetHead">
                  <div>
                    <div>
                      <b>
                        {updatedTweet.author.firstname +
                          " " +
                          updatedTweet.author.lastname}
                      </b>{" "}
                      {" @" + updatedTweet.author.username + " "}
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="dot text-muted mx-1"
                      />
                      <span>{getTimeElapsed(updatedTweet.createdOn)}</span>
                    </div>
                  </div>
                  {updatedTweet.author._id === user._id ? (
                    <div className="deleteIcon">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={(e) => handleShowDeleteModal(e)}
                      />
                    </div>
                  ) : null}
                </Col>
                <Col>{updatedTweet.content}</Col>
                <Col>
                  <Row className="text-muted">
                    <Col>
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle tweetIcon me-3"
                          onClick={(e) => handleShowCommentModal(e)}
                        >
                          <FontAwesomeIcon icon={faMessage} />
                        </div>
                        <span>{updatedTweet.comments.length}</span>
                      </div>
                    </Col>
                    <Col>
                      <div className="rounded-circle tweetIcon">
                        <FontAwesomeIcon icon={faRepeat} />
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle tweetIcon me-3"
                          onClick={(e) => handleLike(e)}
                        >
                          {userLiked() ? (
                            <FontAwesomeIcon
                              icon={faSolidHeart}
                              className="text-danger"
                            />
                          ) : (
                            <FontAwesomeIcon icon={faHeart} />
                          )}
                        </div>
                        {isLoading ? (
                          <PuffLoader size={18} color="#1d9bf0" />
                        ) : (
                          <span>{tweetLikes.length}</span>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div className="rounded-circle tweetIcon">
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
      {isLoading ? (
        <PuffLoader color="#1d9bf0" className="m-auto" />
      ) : (
        <DeleteModal
          isDeleteLoading={isDeleteLoading}
          title="Tweet"
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleDelete={handleDeleteTweet}
        />
      )}
      {isLoading ? (
        <PuffLoader color="#1d9bf0" className="m-auto" />
      ) : (
        <TweetReplyModal
          user={user}
          setUpdatedTweet={setUpdatedTweet}
          updatedTweet={updatedTweet}
          showCommentModal={showCommentModal}
          handleCloseCommentModal={handleCloseCommentModal}
        />
      )}
    </>
  );

  function getTimeElapsed(date) {
    const second = 1000;
    const minute = 1000 * 60;
    const hour = 1000 * 60 * 60;
    const day = 1000 * 60 * 60 * 24;
    const month = 1000 * 60 * 60 * 24 * 30;
    const year = 1000 * 60 * 60 * 24 * 30 * 12;
    let difference = Date.now() - Date.parse(date);

    if (difference < second) {
      return "Now";
    }
    if (difference < minute) {
      return `${Math.floor(difference / second)} seconds ago`;
    }
    if (difference < hour) {
      return `${Math.floor(difference / minute)} minutes ago`;
    }
    if (difference < day) {
      return `${Math.floor(difference / hour)} hours ago`;
    }
    if (difference < month) {
      return `${Math.floor(difference / day)} days ago`;
    }
    if (difference < year) {
      return `${Math.floor(difference / month)} months ago`;
    } else {
      return `${Math.floor(difference / year)} years ago`;
    }
  }

  function userLiked() {
    return tweetLikes.filter((el) => el._id === user._id).length;
  }
};

export default Tweet;
