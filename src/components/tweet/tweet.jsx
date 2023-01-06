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
import { useState } from "react";
import DeleteModal from "./../deleteModal/DeleteModal";
import { PuffLoader } from "react-spinners";
import "./tweet.css";
import TweetReplyModal from "../tweetReplyModal/TweetReplyModal";
import ReactTooltip from "react-tooltip";
import {
  useDeleteTweetMutation,
  useLazyFetchTweetsQuery,
} from "../../app/api/tweetsApiSlice";
import { selectPage, selectWindowWidth } from "../../redux/appSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePostTweetLikeMutation } from "../../app/api/tweetLikesApiSlice";
import getTimeElapsed from "../../util/getTimeElapsed";
import { isUserLiked } from "../../util/isUserLikedTweet";

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
  const [deleteTweet, deleteTweetResult] = useDeleteTweetMutation(tweet.id);
  const [trigger, lazyFetchTweetResult] = useLazyFetchTweetsQuery();
  const [postTweetLike, tweetLikeResult] = usePostTweetLikeMutation();

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
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    await postTweetLike(tweet._id);
  };

  const handleClick = (tweetId) => {
    navigate(`/tweet/${tweetId}`);
  };

  // useEffect(() => {
  //   setUpdatedTweet(tweet);
  // }, []);

  // useEffect(() => {
  //   if (tweet._id) {
  //     const fetch = async () => {
  //       const response = await fetchTweetLikes(tweet._id);
  //       setTweetLikes(response.data);
  //       setIsLoading(false);
  //     };
  //     fetch();
  //   }
  // }, [tweet]);

  return (
    <>
      {lazyFetchTweetResult.isFetching ? (
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
                          {isUserLiked(tweet, user) ? (
                            <FontAwesomeIcon
                              icon={faSolidHeart}
                              className="text-danger"
                            />
                          ) : (
                            <FontAwesomeIcon icon={faHeart} />
                          )}
                        </div>

                        <span>{tweet.likes.length}</span>
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
      {deleteTweetResult.isLoading ? (
        <PuffLoader color="#1d9bf0" className="m-auto" />
      ) : (
        <DeleteModal
          isDeleteLoading={deleteTweetResult.isLoading}
          title="Tweet"
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleDelete={handleDeleteTweet}
        />
      )}
      {/* {isLoading ? (
        <PuffLoader color="#1d9bf0" className="m-auto" />
      ) : ( */}
      <TweetReplyModal
        user={user}
        // setUpdatedTweet={setUpdatedTweet}
        tweet={tweet}
        showCommentModal={showCommentModal}
        handleCloseCommentModal={handleCloseCommentModal}
        windowWidth={windowWidth}
      />
      {/* )} */}
    </>
  );

  // function userLiked() {
  //   return tweetLikes.filter((el) => el._id === user._id).length;
  // }
};

export default Tweet;
