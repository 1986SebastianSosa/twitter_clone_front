import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faUser,
  faRepeat,
  faArrowUpFromBracket,
  faCircle,
  faTrashCan,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteTweet, getAllTweets } from "../../services/tweetServices";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteModal from "./../deleteModal/DeleteModal";
import { fetchTweetLikes, likeTweet } from "../../services/likeServices";
import { PuffLoader } from "react-spinners";
import "./tweet.css";
import TweetReplyModal from "../tweetReplyModal/TweetReplyModal";
import { Tooltip } from "react-tooltip";
import { selectToken, selectUser } from "../../redux/authSlice";
import {
  selectError,
  selectIsError,
  selectIsLoading,
  selectIsSuccess,
  selectPage,
  setIsLoading,
} from "../../redux/appSlice";
import { selectWindowWidth } from "./../../redux/appSlice";
import { selectHasMore, selectTweetsToShow } from "../../redux/tweetsSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Tweet = ({ tweet, setShowDeleteToast }) => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const page = useSelector(selectPage);
  const windowWidth = useSelector(selectWindowWidth);
  const allTweets = useSelector(selectTweetsToShow);
  const hasMore = useSelector(selectHasMore);
  const isLoading = useSelector(selectIsLoading);
  const isSuccess = useSelector(selectIsSuccess);
  const isError = useSelector(selectIsError);
  const Error = useSelector(selectError);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [tweetLikes, setTweetLikes] = useState([]);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    const fetchTweetLikes = async () => {
      try {
        const response = await axiosPrivate.get(`/tweetLike/${tweet._id}`);
        setTweetLikes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTweetLikes();
  }, []);

  useEffect(() => {
    if (tweetLikes.includes(user._id)) {
      setUserLiked(true);
    }
  }, [tweetLikes]);

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
    await deleteTweet(tweet._id, token);
    if (location.pathname.split("/")[1] === "tweet") {
      return navigate("/home");
    } else {
      try {
        const fetchTweets = async () => {
          const response = await getAllTweets(user, token, page);
          if (!response.data.tweetsToShow.length && !allTweets.length) {
            // setIsLoading(false);
            return;
          }
          // setAllTweets(response.data.tweetsToShow);
          setIsLoading(false);
          setIsDeleteLoading(false);
          setShowDeleteModal(false);
          setShowDeleteToast(true);
        };
        fetchTweets();
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (tweetLikes.includes(user._id)) {
      setTweetLikes(tweetLikes.filter((el) => el !== user._id));
      setUserLiked(false);
    } else {
      setTweetLikes([...tweetLikes, user._id]);
      setUserLiked(true);
    }
    try {
      const response = await axiosPrivate({
        url: `/tweetLike/${tweet._id}`,
        method: "post",
      });
      console.log(response);
    } catch (error) {}
    // await likeTweet(tweet._id, user._id, token);
    // const response = await fetchTweetLikes(tweet._id, token);
    // setTweetLikes(response.data);
  };

  const handleClick = (tweetId) => {
    navigate(`/tweet/${tweetId}`);
  };

  // useEffect(() => {
  //   setUpdatedTweet(tweet);
  // }, []);

  return (
    <>
      {isLoading && <PuffLoader color="#1d9bf0" className="m-auto" />}
      {isSuccess && (
        <div
          onClick={(e) => handleClick(tweet._id)}
          className="tweet py-2 border-bottom"
        >
          <Row className="p-2">
            <Col xs={2} className="d-flex justify-content-center p-0">
              <div
                className={`rounded-circle d-flex justify-content-center align-items-center user-icon bg-light ${
                  windowWidth < 768 && "avatar"
                }`}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className={`${
                    windowWidth < 768 ? "fa-2x" : "fa-3x"
                  } text-secondary`}
                />
              </div>
            </Col>
            <Col xs={10}>
              <Row className="d-flex flex-column">
                <Col className="d-flex justify-content-between tweetHead">
                  <div>
                    <div>
                      <b>
                        {tweet.author.firstname + " " + tweet.author.lastname}
                      </b>{" "}
                      {" @" + tweet.author.username + " "}
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="dot text-muted mx-1"
                      />
                      <span>{getTimeElapsed(tweet.createdOn)}</span>
                    </div>
                  </div>
                  {tweet.author._id === user._id ? (
                    <div className="deleteIcon">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={(e) => handleShowDeleteModal(e)}
                      />
                    </div>
                  ) : null}
                </Col>
                <Col>{tweet.content}</Col>
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
                        <span>{tweet.comments.length}</span>
                      </div>
                    </Col>
                    <Col>
                      <div
                        className="rounded-circle tweetIcon"
                        onClick={(e) => {
                          return e.stopPropagation;
                        }}
                        data-for="outOfScope"
                        data-tip={showTooltip && ""}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <FontAwesomeIcon icon={faRepeat} />
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle tweetIcon me-3"
                          onClick={(e) => handleLike(e)}
                        >
                          {userLiked ? (
                            <FontAwesomeIcon
                              icon={faSolidHeart}
                              className="text-danger"
                            />
                          ) : (
                            <FontAwesomeIcon icon={faHeart} />
                          )}
                        </div>
                        <span>{tweetLikes.length}</span>
                      </div>
                    </Col>
                    <Col>
                      <div
                        className="rounded-circle tweetIcon"
                        onClick={(e) => {
                          return e.stopPropagation;
                        }}
                        data-for="outOfScope"
                        data-tip={showTooltip && ""}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          {showTooltip && (
            <Tooltip
              id="outOfScope"
              getContent={() => {
                return;
              }}
              event="click"
              type="info"
            >
              <FontAwesomeIcon icon={faCircleInfo} /> This functionality is
              beyond the scope of this project
            </Tooltip>
          )}
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
          tweet={tweet}
          showCommentModal={showCommentModal}
          handleCloseCommentModal={handleCloseCommentModal}
          windowWidth={windowWidth}
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
};

export default Tweet;
