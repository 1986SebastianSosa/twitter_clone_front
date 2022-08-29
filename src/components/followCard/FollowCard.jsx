import { Row, Col, Button } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./followCard.css";
import { useSelector } from "react-redux";
import { followUser } from "../../services/followServices";

const FollowCard = ({ suggestion }) => {
  const loggedUser = useSelector((state) => state.user);
  const followHandler = async () => {
    const response = await followUser(loggedUser, suggestion);
    console.log(response.data);
  };

  return (
    <>
      <Row className="follow-suggestion py-3">
        <Col xs={1} className="px-0 mx-2 d-flex justify-content-center">
          <div className="avatar border rounded-circle d-flex justify-content-center align-items-center bg-light">
            <FontAwesomeIcon icon={faUser} className="fa-2x text-secondary" />
          </div>
        </Col>
        <Col className="p-0">
          <h6 className="fw-bold m-0">
            {suggestion.firstname + " " + suggestion.lastname}
          </h6>
          <div>
            <span className="text-muted">{"@" + suggestion.username}</span>
          </div>
        </Col>
        <Col xs={2}>
          <Button
            className="follow-btn bg-dark text-white rounded-pill px-3 py-1"
            onClick={followHandler}
          >
            <span>Follow</span>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default FollowCard;
