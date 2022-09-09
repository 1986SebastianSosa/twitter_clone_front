import { Modal, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { postComment } from "../../services/commentServices";
import {
  faImage,
  faSquarePollHorizontal,
  faFaceSmile,
  faCalendarDay,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { getOneTweet } from "../../services/tweetServices";

const TweetReplyModal = ({
  updatedTweet,
  setUpdatedTweet,
  showCommentModal,
  handleCloseCommentModal,
  user,
}) => {
  const [commentInput, setCommentInput] = useState("");

  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postComment(
      commentInput,
      user._id,
      updatedTweet._id
    );
    setCommentInput("");
    const fetchResponse = await getOneTweet(updatedTweet._id);
    setUpdatedTweet(fetchResponse.data);
    handleCloseCommentModal();
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
          <Row className="p-2">
            <Col xs={2} className="p-0">
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
                </Col>
                <Col>{updatedTweet.content}</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <div className="rounded-circle d-flex justify-content-center align-items-center user-icon bg-light">
                <FontAwesomeIcon
                  icon={faUser}
                  className="fa-3x text-secondary"
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
            </Col>
          </Row>
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
  function getTimeElapsed(date) {
    const second = 1000;
    const minute = 1000 * 60;
    const hour = 1000 * 60 * 60;
    const day = 1000 * 60 * 60 * 24;
    const month = 1000 * 60 * 60 * 24 * 30;
    const year = 1000 * 60 * 60 * 24 * 30 * 12;
    let difference = Date.now() - Date.parse(new Date(date));
    // console.log("difference: ", difference);

    // console.log("difference < second: ", difference < second);
    // console.log("difference < minute: ", difference < minute);
    // console.log("difference < hour: ", difference < hour);
    // console.log("difference < month: ", difference < month);
    // console.log("difference < year: ", difference < year);

    switch (difference) {
      case difference < second:
        return "Now";
      case difference < minute:
        return `${Math.floor(difference / second)} seconds ago`;
      case difference < hour:
        return `${Math.floor(difference / minute)} minutes ago`;
      case difference < day:
        return `${Math.floor(difference / hour)} hours ago`;
      case difference < month:
        return `${Math.floor(difference / day)} days ago`;
      case difference < year:
        return `${Math.floor(difference / month)} months ago`;
      default:
        return `${Math.floor(difference / year)} years ago`;
    }
  }
};

export default TweetReplyModal;
