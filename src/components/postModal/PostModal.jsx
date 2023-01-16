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
import { useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { addTweet } from "../../redux/tweetsSlice";
import MyToast from "../myToast/MyToast";
import "./postModal.css";

const PostModal = ({ showPostModal, handleClosePostModal }) => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const [focused, setFocused] = useState(false);
  const [tweetContent, setTweetContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tweetContent.length) {
      setIsError(false);
    }
  }, [tweetContent]);

  const handlePostTweet = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const postResponse = await axiosPrivate.post("/tweet", {
        tweetContent,
      });
      const fetchResponse = await axiosPrivate.get(
        `/tweet/${postResponse.data._id}`
      );
      console.log(fetchResponse.data);
      dispatch(addTweet(fetchResponse.data));
      setTweetContent("");
      handleClosePostModal();
    } catch (error) {
      setIsError(true);
      error.response?.data?.msg
        ? setError(error?.response?.data?.msg)
        : setError("The server seems to be offline. Try again later.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={showPostModal}
        onHide={handleClosePostModal}
        keyboard={false}
        centered
      >
        {isLoading ? (
          <PuffLoader size={100} color="#1d9bf0" className="m-auto my-5" />
        ) : isError ? (
          <div className="m-auto my-5">
            <MyToast
              show={isError}
              content={error}
              onClose={() => setIsError(false)}
            />
          </div>
        ) : (
          <Row className="px-2 py-5 border-bottom border-light">
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
                <form onSubmit={handlePostTweet}>
                  <Col className="p-2">
                    <input
                      name="tweetContent"
                      type="text"
                      className="border-0 main-input text-muted fs-5"
                      placeholder="What's happening?"
                      onFocus={() => setFocused(true)}
                      onChange={(e) => setTweetContent(e.target.value)}
                      value={tweetContent}
                    />

                    <Col>
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
        )}
      </Modal>
    </>
  );
};

export default PostModal;
