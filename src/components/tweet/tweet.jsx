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
import DeleteModal from "./../deleteModal/DeleteModal";
import { fetchTweetLikes, likeTweet } from "../../services/likeServices";
import { PuffLoader } from "react-spinners";
import "./tweet.css";
import TweetReplyModal from "../tweetReplyModal/TweetReplyModal";
import ReactTooltip from "react-tooltip";
import {
  useDeleteTweetMutation,
  useLazyFetchTweetsQuery,
} from "../../redux/tweetsApiSlice";
import { selectPage, selectWindowWidth } from "../../redux/appSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Tweet = ({ tweet }) => {
  const user = useSelector((state) => state.auth.user);
  const page = useSelector(selectPage);
  const windowWidth = useSelector(selectWindowWidth);
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [tweetLikes, setTweetLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [deleteTweet, result] = useDeleteTweetMutation(tweet.id);
  const [trigger] = useLazyFetchTweetsQuery();

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
    await deleteTweet(tweet._id);
    setShowDeleteModal(false);
    trigger(page);
    // dispatch(setTweets({ tweetsToShow: [], hasMore: true }));
    // setIsDeleteLoading(true);
    // if (location.pathname.split("/")[1] === "tweet") {
    //   return navigate("/home");
    // } else {
    //   try {
    //     const fetchTweets = async () => {
    //       const response = await getAllTweets(user, token, page);
    //       if (!response.data.tweetsToShow.length && !allTweets.length) {
    //         setNoTweets(true);
    //         setIsLoading(false);
    //         return;
    //       }
    //       if (response.data.tweetsToShow.length === 0) {
    //         setHasMore(false);
    //       }

    //       setAllTweets(response.data.tweetsToShow);
    //       setIsLoading(false);
    //       setIsDeleteLoading(false);
    //       setShowDeleteModal(false);
    //       setShowDeleteToast(true);
    //     };
    //     fetchTweets();
    //   } catch (error) {
    //     console.log(error);
    //     navigate("/");
    //   }
    // }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    await likeTweet(tweet._id, user._id);
    const response = await fetchTweetLikes(tweet._id);
    setTweetLikes(response.data);
  };

  const handleClick = (tweetId) => {
    navigate(`/tweet/${tweetId}`);
  };

  // useEffect(() => {
  //   setUpdatedTweet(tweet);
  // }, []);

  useEffect(() => {
    if (tweet._id) {
      const fetch = async () => {
        const response = await fetchTweetLikes(tweet._id);
        setTweetLikes(response.data);
        setIsLoading(false);
      };
      fetch();
    }
  }, [tweet]);

  return (
    <>
      {result.isLoading ? (
        <PuffLoader color="#1d9bf0" className="m-auto" />
      ) : (
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
            <ReactTooltip
              id="outOfScope"
              getContent={() => {
                return;
              }}
              event="click"
              type="info"
            >
              <FontAwesomeIcon icon={faCircleInfo} /> This functionality is
              beyond the scope of this project
            </ReactTooltip>
          )}
        </div>
      )}
      {isLoading ? (
        <PuffLoader color="#1d9bf0" className="m-auto" />
      ) : (
        <DeleteModal
          isDeleteLoading={result.isLoading}
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
          // setUpdatedTweet={setUpdatedTweet}
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

  function userLiked() {
    return tweetLikes.filter((el) => el._id === user._id).length;
  }
};

export default Tweet;
