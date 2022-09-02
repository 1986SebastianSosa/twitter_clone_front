import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faUser,
  faRepeat,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import "./tweet.css";

const Tweet = ({ tweet }) => {
  return (
    <>
      <Row className="p-2">
        <Col xs={2}>
          <div className="rounded-circle d-flex justify-content-center align-items-center user-icon bg-light">
            <FontAwesomeIcon icon={faUser} className="fa-3x text-secondary" />
          </div>
        </Col>
        <Col xs={10}>
          <Row className="d-felx flex-column">
            <Col className="d-flex justify-content-between tweetHead">
              <div>
                <div>
                  <b>{tweet.author.firstname + " " + tweet.author.lastname}</b>{" "}
                  {" @" + tweet.username}
                </div>
              </div>
              <div className="tweetHead">{getTimeElapsed(tweet.createdOn)}</div>
            </Col>
            <Col>{tweet.content}</Col>
            <Col>
              <Row className="text-muted">
                <Col>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle tweetIcon me-3">
                      <FontAwesomeIcon icon={faMessage} />
                    </div>
                    <span>{tweet.comments.length}</span>
                  </div>
                </Col>
                <Col>
                  <div className="rounded-circle tweetIcon">
                    <FontAwesomeIcon icon={faRepeat} />
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle tweetIcon me-3">
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <span>{tweet.likes.length}</span>
                  </div>
                </Col>
                <Col>
                  <div className="rounded-circle tweetIcon">
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
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

export default Tweet;
