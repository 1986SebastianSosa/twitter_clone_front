import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Sidenav from "../../components/sidenav/Sidenav";
import TrendingSidenav from "../../components/trendingSidenav/TrendingSidenav";
import Searchbar from "../../components/searchbar/Searchbar";
import Topnav from "../../components/topnav/Topnav";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Comment from "../../components/comment/Comment";
import { PuffLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
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
import DeleteModal from "../../components/deleteModal/DeleteModal";
import BotNav from "../../components/botNav/BotNav";
import "./tweetPage.css";
import { selectUser } from "../../redux/authSlice";
import useAxiosPrivate from "./../../hooks/useAxiosPrivate";
import { getTimeElapsed } from "../../util/getTimeElapsed";
import { selectWindowWidth, setWindowWidth } from "../../redux/appSlice";
import { selectTweetsToShow, setTweetsToShow } from "../../redux/tweetsSlice";

const TweetPage = () => {
  const user = useSelector(selectUser);
  const windowWidth = useSelector(selectWindowWidth);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const allTweets = useSelector(selectTweetsToShow);
  const location = useLocation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tweet, setTweet] = useState({});
  const [userLikedTweet, setUserLikedTweet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [tweetLikes, setTweetLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [focused, setFocused] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleWindowResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const response = await axiosPrivate.get(`tweet/${id}`);
        setTweet(response.data);
        setTweetLikes(response.data.likes);
      } catch (error) {
        navigate("/error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTweet();
  }, []);

  useEffect(() => {
    setTweetLikes(tweet.likes);
    if (tweet?.likes?.includes(user._id)) {
      setUserLikedTweet(true);
    }
  }, []);

  useEffect(() => {
    if (tweet?.comments) {
      const sortedCommentsArr = tweet.comments.sort(
        (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
      );
      setComments(sortedCommentsArr);
    }
  }, [tweet]);

  useEffect(() => {
    if (commentInput.length) {
      setIsError(false);
    }
  }, [commentInput]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!commentInput.length) {
      setError("You need to write something!");
      return setIsError(true);
    }
    setIsLoading(true);
    try {
      const postResponse = await axiosPrivate.post(`/comment/${tweet._id}`, {
        commentInput,
      });
      const fetchResponse = await axiosPrivate.get(
        `/comment/${postResponse.data._id}`
      );
      setComments([fetchResponse.data, ...comments]);
      setCommentInput("");
    } catch (error) {
      setIsError(true);
      error.response?.status === 401 || error.response?.status === 403
        ? navigate("/")
        : error.response?.data?.msg
        ? setError(error?.response?.data?.msg)
        : setError("*Something went wrong. Try again later.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowDeleteModal = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteTweet = async () => {
    setIsDeleteLoading(true);
    try {
      await axiosPrivate.delete(`/tweet/${tweet._id}`);
      dispatch(setTweetsToShow(allTweets.filter((el) => el._id !== tweet._id)));
      if (location.pathname.split("/")[1] === "tweet") {
        return navigate("/home");
      }
    } catch (error) {
      setIsError(true);
      error.response?.status === 401 || error.response?.status === 403
        ? navigate("/")
        : error.response?.data?.msg
        ? setError(error?.response?.data?.msg)
        : setError("*Something went wrong. Try again later.");
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleLikeTweet = async () => {
    if (tweetLikes.includes(user._id)) {
      setTweetLikes(tweetLikes.filter((el) => el !== user._id));
      setUserLikedTweet(false);
    } else {
      setTweetLikes([user._id, ...tweetLikes]);
      setUserLikedTweet(true);
    }
    try {
      await axiosPrivate({
        url: `/tweetLike/${tweet._id}`,
        method: "post",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };

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
              <PuffLoader color="#1d9bf0" size={200} className="m-auto my-5" />
            ) : (
              tweet?._id && (
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
                      <Col xs={2}></Col>
                      <Col>
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle tweetIcon me-3">
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
                          <div className="rounded-circle tweetIcon">
                            <FontAwesomeIcon icon={faRepeat} />
                          </div>
                        </OverlayTrigger>
                      </Col>
                      <Col>
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle tweetIcon me-3"
                            onClick={handleLikeTweet}
                          >
                            {userLikedTweet ? (
                              <FontAwesomeIcon
                                icon={faSolidHeart}
                                className="text-danger"
                              />
                            ) : (
                              <FontAwesomeIcon icon={faHeart} />
                            )}
                          </div>

                          <span>{tweetLikes?.length}</span>
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
                          <div className="rounded-circle tweetIcon">
                            <FontAwesomeIcon icon={faArrowUpFromBracket} />
                          </div>
                        </OverlayTrigger>
                      </Col>
                    </Row>

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
                            onSubmit={handlePostComment}
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
                          {isError && (
                            <span className="text-danger">{error}</span>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Container>

                  <Container>
                    {comments.map((comment) => (
                      <Comment
                        key={comment._id}
                        comment={comment}
                        comments={comments}
                        setComments={setComments}
                        setShowDeleteToast={setShowDeleteToast}
                        windowWidth={windowWidth}
                      />
                    ))}
                  </Container>
                </>
              )
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

      <DeleteModal
        title="Tweet"
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDelete={handleDeleteTweet}
        isDeleteLoading={isDeleteLoading}
      />

      {/* {showTooltip && <FontAwesomeIcon icon={faCircleInfo} />} */}
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
};

export default TweetPage;
