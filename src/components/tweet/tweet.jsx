import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMessage,
  faRepeat,
  faHeart,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import "./tweet.css";

const Tweet = ({ username, fullName, createdOn, content }) => {
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
                  <b>{fullName}</b> {" @" + username}
                </div>
              </div>
              <div className="tweetHead">{createdOn.split("T")[0]}</div>
            </Col>
            <Col>{content}</Col>
            <Col>
              <Row>
                <Col>
                  <div className="rounded-circle tweetIcon">
                    <FontAwesomeIcon icon={faMessage} />
                  </div>
                </Col>
                <Col>
                  <div className="rounded-circle tweetIcon">
                    <FontAwesomeIcon icon={faRepeat} />
                  </div>
                </Col>
                <Col>
                  <div className="rounded-circle tweetIcon">
                    <FontAwesomeIcon icon={faHeart} />
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
};

export default Tweet;
