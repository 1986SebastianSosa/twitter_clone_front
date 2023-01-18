import { Modal, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  faImage,
  faSquarePollHorizontal,
  faFaceSmile,
  faCalendarDay,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/authSlice";
import { selectWindowWidth } from "../../redux/appSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getTimeElapsed } from "./../../util/getTimeElapsed";
import { PuffLoader } from "react-spinners";

const TweetReplyModal = ({
  tweet,
  comments,
  setComments,
  showCommentModal,
  handleCloseCommentModal,
}) => {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const windowWidth = useSelector(selectWindowWidth);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);

  useEffect(() => {
    if (commentInput.length) {
      setIsError(false);
    }
  }, [commentInput]);

  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.length) {
      return setIsError(false);
    }
    setIsLoading(true);
    try {
      const response = await axiosPrivate({
        url: `/comment/${tweet._id}`,
        method: "post",
        data: {
          commentInput,
        },
      });
      setComments([...comments, response.data._id]);
      handleCloseCommentModal();
    } catch (error) {
      setIsError(true);
      setError(error?.response?.data?.msg);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={showCommentModal}
      onHide={handleCloseCommentModal}
      backdrop="static"
      keyboard={false}
    >
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton />
        <Modal.Body>
          {" "}
          <Row className="border-bottom mb-3 pb-3">
            <Col xs={2} className="p-0">
              <div
                className={`rounded-circle d-flex justify-content-center align-items-center user-icon bg-light ${
                  windowWidth < 576 && "avatar"
                }`}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className={`${
                    windowWidth > 576 ? "fa-3x" : "fa-2x"
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
                </Col>
                <Col>{tweet.content}</Col>
              </Row>
            </Col>
          </Row>
          {isLoading ? (
            <>
              <PuffLoader size={100} color="#1d9bf0" className="m-auto" />
              <h6 className="m-auto text-center text-muted pt-3">
                Just a moment...
              </h6>
            </>
          ) : (
            <Row>
              <Col xs={2} className="p-0">
                <div
                  className={`rounded-circle d-flex justify-content-center align-items-center user-icon bg-light ${
                    windowWidth < 576 && "avatar"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className={`${
                      windowWidth > 576 ? "fa-3x" : "fa-2x"
                    } text-secondary`}
                  />
                </div>
              </Col>
              <Col xs={10}>
                <input
                  name="tweetContent"
                  type="text"
                  className="border-0 main-input text-muted fs-5"
                  placeholder="Tweet your reply"
                  onChange={handleChange}
                  value={commentInput}
                />
                {error && (
                  <div>
                    <span className="text-danger">
                      * You need to write something!
                    </span>
                  </div>
                )}
              </Col>
            </Row>
          )}
        </Modal.Body>

        <div className="p-2 d-flex justify-content-between">
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
          <Button
            className="px-3 text-white rounded-pill fw-bold"
            type="submit"
          >
            Reply
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TweetReplyModal;
