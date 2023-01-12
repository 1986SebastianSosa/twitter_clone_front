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
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteModal from "./../deleteModal/DeleteModal";
import { PuffLoader } from "react-spinners";
import "./tweet.css";
import TweetReplyModal from "../tweetReplyModal/TweetReplyModal";
import { selectToken, selectUser } from "../../redux/authSlice";
import { selectPage, selectWindowWidth } from "../../redux/appSlice";
import {
  deleteTweet,
  selectHasMore,
  selectTweetsToShow,
  setTweetsToShow,
} from "../../redux/tweetsSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getTimeElapsed } from "../../util/getTimeElapsed";

const Tweet = ({ tweet, setShowDeleteToast }) => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const page = useSelector(selectPage);
  const windowWidth = useSelector(selectWindowWidth);
  const allTweets = useSelector(selectTweetsToShow);
  const hasMore = useSelector(selectHasMore);

  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [tweetLikes, setTweetLikes] = useState([]);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    setTweetLikes(tweet.likes);
    setComments(tweet.comments);
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
    try {
      await axiosPrivate.delete(`/tweet/${tweet._id}`);
      dispatch(deleteTweet(tweet._id));
      if (location.pathname.split("/")[1] === "tweet") {
        return navigate("/home");
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleLikeTweet = async (e) => {
    e.stopPropagation();
    if (tweetLikes.includes(user._id)) {
      setTweetLikes(tweetLikes.filter((el) => el !== user._id));
      setUserLiked(false);
    } else {
      setTweetLikes([user._id, ...tweetLikes]);
      setUserLiked(true);
    }
    try {
      await axiosPrivate.post(`/tweetLike/${tweet._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (tweetId) => {
    navigate(`/tweet/${tweetId}`);
  };

  return (
    <>
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
                      <span>{comments.length}</span>
                    </div>
                  </Col>
                  <Col>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="out-of-scope">
                          This feature is out of the scope of this project
                        </Tooltip>
                      }
                    >
                      <div
                        className="rounded-circle tweetIcon"
                        onClick={(e) => {
                          return e.stopPropagation();
                        }}
                        data-for="outOfScope"
                        data-tip={showTooltip && ""}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <FontAwesomeIcon icon={faRepeat} />
                      </div>
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle tweetIcon me-3"
                        onClick={(e) => handleLikeTweet(e)}
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
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="out-of-scope">
                          This feature is out of the scope of this project
                        </Tooltip>
                      }
                    >
                      <div
                        className="rounded-circle tweetIcon"
                        onClick={(e) => {
                          return e.stopPropagation();
                        }}
                      >
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                      </div>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

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
          tweet={tweet}
          comments={comments}
          setComments={setComments}
          showCommentModal={showCommentModal}
          handleCloseCommentModal={handleCloseCommentModal}
        />
      )}
    </>
  );
};

export default Tweet;
