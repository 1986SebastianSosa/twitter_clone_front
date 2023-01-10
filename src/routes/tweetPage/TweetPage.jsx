import { Container, Row, Col } from "react-bootstrap";
import Sidenav from "../../components/sidenav/Sidenav";
import TrendingSidenav from "../../components/trendingSidenav/TrendingSidenav";
import Searchbar from "../../components/searchbar/Searchbar";
import Topnav from "../../components/topnav/Topnav";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { deleteTweet, getOneTweet } from "../../services/tweetServices";
import { useState } from "react";
import Comment from "../../components/comment/Comment";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faCircleInfo,
  faRepeat,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { fetchTweetLikes, likeTweet } from "../../services/likeServices";
import { postComment } from "../../services/commentServices";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import BotNav from "../../components/botNav/BotNav";
import { Tooltip } from "react-tooltip";
import "./tweetPage.css";

const TweetPage = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [tweet, setTweet] = useState({});
  const [tweetLikes, setTweetLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [focused, setFocused] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [commentIsLoading, setCommentIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();

  const handleShowDeleteModal = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteTweet = async () => {
    setIsDeleteLoading(true);
    await deleteTweet(tweet._id, token);
    return navigate("/home");
  };

  const handleShowCommentModal = (e) => {
    e.stopPropagation();
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    await likeTweet(tweet._id, user._id, token);
    const response = await fetchTweetLikes(tweet._id, token);
    setTweetLikes(response.data);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!commentInput.length) {
        setErrorMsg("* You need to write something");
        setShowErrorMsg(true);
      } else {
        await postComment(commentInput, user._id, tweet._id, token);
        setCommentIsLoading(true);
        e.preventDefault();
        const fetch = async () => {
          const response = await getOneTweet(id, token);
          setTweet(response.data);
          setCommentIsLoading(false);
        };
        fetch();
      }

      setCommentInput("");
      setFocused(false);
    } catch (error) {
      setErrorMsg("You need to be logged in to write something");
      setShowErrorMsg(true);
      // setTimeout(() => {
      //   navigate("/");
      // }, 5000);
    }
  };

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await getOneTweet(id, token);
      setTweet(response.data);
      setIsLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (tweet.comments) {
      const sortedCommentsArr = tweet.comments.sort((a, b) => {
        return Date.parse(b.createdOn) - Date.parse(a.createdOn);
      });
      setComments(sortedCommentsArr);
    }
  }, [tweet]);

  useEffect(() => {
    if (commentInput.length) {
      setShowErrorMsg(false);
    }
  }, [commentInput]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
  }, []);

  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col sm={2} md={3} className={`${windowWidth < 576 && "d-none"}`}>
            <Sidenav windowWidth={windowWidth} />
          </Col>
          <Col
            xs={11}
            sm={10}
            md={9}
            lg={6}
            className="border-start border-end border-light p-0"
          >
            <Topnav title="Tweet" />
            {isLoading ? (
              <PuffLoader color="#1d9bf0" />
            ) : (
              <>
                <Container>
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
                      <Row>
                        <Col className="tweetHead" xs={10}>
                          <div>
                            <b>
                              {tweet.author.firstname +
                                " " +
                                tweet.author.lastname}
                            </b>{" "}
                          </div>
                          <div>{" @" + tweet.author.username + " "}</div>
                          <div>
                            <span>{getTimeElapsed(tweet.createdOn)}</span>
                          </div>
                        </Col>
                        {tweet.author._id === user._id ? (
                          <Col
                            className="p-0 d-flex justify-content-end"
                            xs={2}
                          >
                            <div className="deleteIcon me-2">
                              <FontAwesomeIcon
                                icon={faTrashCan}
                                onClick={(e) => handleShowDeleteModal(e)}
                              />
                            </div>
                          </Col>
                        ) : null}
                      </Row>
                    </Col>
                  </Row>
                  <Row className="p-2">
                    <Col xs={12} className="p-2">
                      <p className="fs-5 my-0 ">{tweet.content}</p>
                    </Col>
                  </Row>
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
                        data-for="outOfScope"
                        data-tip={showTooltip && ""}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                      </div>
                    </Col>
                  </Row>
                  {commentIsLoading ? (
                    <PuffLoader color="#1d9bf0" className="mx-auto my-5" />
                  ) : (
                    <Row className="p-2 my-2 border-top border-bottom">
                      <Col
                        xs={2}
                        className="d-flex justify-content-center align-items-center p-0"
                      >
                        <div
                          className={`rounded-circle d-flex justify-content-center align-items-center user-icon user-icon-small bg-light m-0 ${
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
                      <Col xs={10} className="py-2 my-2">
                        <div>
                          <form
                            onSubmit={handleSubmit}
                            className="reply-input-form"
                          >
                            <input
                              name="commentContent"
                              type="text"
                              className="border-0 main-input text-muted fs-5"
                              placeholder="Tweet your reply"
                              onFocus={handleFocus}
                              onChange={handleChange}
                              value={commentInput}
                              width="100%"
                            />
                          </form>
                        </div>
                        <div className="py-2">
                          {showErrorMsg && (
                            <span className="text-danger">{errorMsg}</span>
                          )}
                        </div>
                      </Col>
                    </Row>
                  )}
                </Container>
              </>
            )}
            {isLoading ? (
              <PuffLoader color="#1d9bf0" />
            ) : (
              <Container>
                {comments.map((comment) => (
                  <Comment
                    tweet={tweet}
                    setTweet={setTweet}
                    key={comment._id}
                    comment={comment}
                    setComments={setComments}
                    setShowDeleteToast={setShowDeleteToast}
                    windowWidth={windowWidth}
                  />
                ))}
              </Container>
            )}
          </Col>
          {windowWidth >= 992 && (
            <Col xs={3}>
              <Searchbar />
              <TrendingSidenav />
            </Col>
          )}
        </Row>
        {windowWidth < 576 && <BotNav className="mb-5" />}
      </Container>
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
      {showTooltip && (
        <Tooltip
          id="outOfScope"
          getContent={() => {
            return;
          }}
          event="click"
          type="info"
        >
          <FontAwesomeIcon icon={faCircleInfo} /> This functionality is beyond
          the scope of this project
        </Tooltip>
      )}
      {/* {isLoading ? (
        <PuffLoader color="#1d9bf0" className="m-auto" />
      ) : (
        <TweetReplyModal
          user={user}
          setUpdatedTweet={setUpdatedTweet}
          updatedTweet={updatedTweet}
          showCommentModal={showCommentModal}
          handleCloseCommentModal={handleCloseCommentModal}
        />
      )} */}
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

export default TweetPage;
