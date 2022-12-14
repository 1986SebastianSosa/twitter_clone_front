import { faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faUser,
  faCalendarDay,
  faEarthAmericas,
  faFaceSmile,
  faLocationDot,
  faSquarePollHorizontal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import { getAllTweets, postTweet } from "../../services/tweetServices";
import "./postModal.css";

const PostModal = ({
  showPostModal,
  handleClosePostModal,
  page,
  allTweets,
  setAllTweets,
  setNoTweets,
  setHasMore,
  setAllTweetsLength,
}) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [focused, setFocused] = useState(false);
  const [tweetInput, setTweetInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = (e) => {
    setTweetInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!tweetInput.length) {
        setErrorMsg("* You need to write something");
        setShowErrorMsg(true);
      } else {
        setIsLoading(true);
        await postTweet(token, tweetInput);
        setTweetInput("");
        const fetchTweets = async () => {
          const response = await getAllTweets(user, token, page);
          if (!response.data.tweetsToShow.length && !allTweets.length) {
            setNoTweets(true);
            setIsLoading(false);
            return;
          }
          if (response.data.tweetsToShow.length === 0) {
            setHasMore(false);
          }
          setNoTweets(false);
          setAllTweetsLength(response.data.allTweetsLength);
          setAllTweets(response.data.tweetsToShow);
          setIsLoading(false);
          handleClosePostModal();
        };
        fetchTweets();
      }
    } catch (error) {
      setErrorMsg("You need to be logged in to write something");
      setShowErrorMsg(true);
      // setTimeout(() => {
      //   navigate("/");
      // }, 5000);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [allTweets]);

  useEffect(() => {
    if (tweetInput.length) {
      setShowErrorMsg(false);
    }
  }, [tweetInput]);

  return (
    <>
      {isLoading ? (
        <PuffLoader size={100} color="#1d9bf0" className="m-auto" />
      ) : (
        <Modal
          show={showPostModal}
          onHide={handleClosePostModal}
          keyboard={false}
        >
          <Row className="postModal p-2 border-bottom border-light">
            <Col xs={2}>
              <div className="rounded-circle d-flex justify-content-center align-items-center user-icon bg-light">
                <FontAwesomeIcon
                  icon={faUser}
                  className="fa-3x text-secondary"
                />
              </div>
            </Col>
            <Col xs={10}>
              <Row className="flex-column">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <Col className="p-2">
                    <input
                      name="tweetContent"
                      type="text"
                      className="border-0 main-input text-muted fs-5"
                      placeholder="What's happening?"
                      onFocus={handleFocus}
                      onChange={handleChange}
                      value={tweetInput}
                    />

                    <Col>
                      {showErrorMsg && (
                        <span className="text-danger">{errorMsg}</span>
                      )}
                      {focused && (
                        <div className="border-bottom border-light">
                          <Button className="bg-white border-0 text-primary reply-btn rounded-pill py-0 mt-3 mb-2">
                            <FontAwesomeIcon icon={faEarthAmericas} />
                            <span className="ms-1 fs-6 fw-semibold">
                              Everyone can reply
                            </span>
                          </Button>
                        </div>
                      )}
                    </Col>
                  </Col>
                  <Col className="p-2 d-flex justify-content-between">
                    <div>
                      <ul className="d-flex icon-list p-0 m-0">
                        <li>
                          <FontAwesomeIcon icon={faImage} />
                        </li>
                        <li>
                          <img src="/gif-icon.svg" alt="" />
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faSquarePollHorizontal} />
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faFaceSmile} />
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCalendarDay} />
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faLocationDot} />
                        </li>
                      </ul>
                    </div>
                    <div>
                      <Button
                        className="px-3 text-white rounded-pill fw-bold"
                        type="submit"
                      >
                        Tweet
                      </Button>
                    </div>
                  </Col>
                </form>
              </Row>
            </Col>
          </Row>
        </Modal>
      )}
    </>
  );
};

export default PostModal;
