import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faUser,
  faRepeat,
  faArrowUpFromBracket,
  faCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteTweet, getAllTweets } from "../../services/tweetServices";
import { useSelector } from "react-redux";
import DeleteModal from "./../deleteModal/DeleteModal";
import { fetchCommentLikes, likeComment } from "../../services/likeServices";

const Comment = ({ comment, setShowDeleteToast }) => {
  const user = useSelector((state) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentLikes, setCommentLikes] = useState([]);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDeleteTweet = async () => {
    const deleteResponse = await deleteTweet(comment._id);
    console.log("deleteTweet response: ", deleteResponse.data);
    const getResponse = await getAllTweets(user);
    const sortedData = await getResponse.data.sort(
      (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
    );

    setShowDeleteModal(false);
    setShowDeleteToast(true);
  };

  const handleLike = async () => {
    await likeComment(comment._id, user._id);
    const response = await fetchCommentLikes(comment._id);
    setCommentLikes(response.data);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchCommentLikes(comment._id);
      setCommentLikes(response.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log("commentLikes: ", commentLikes);
  }, [commentLikes]);

  return (
    <Row className="p-2">
      <Col xs={2}>
        <div className="rounded-circle d-flex justify-content-center align-items-center user-icon bg-light">
          <FontAwesomeIcon icon={faUser} className="fa-3x text-secondary" />
        </div>
      </Col>
      <Col xs={10}>
        <Row className="d-flex flex-column">
          <Col className="d-flex justify-content-between tweetHead">
            <div>
              <div>
                <b>
                  {comment.author.firstname + " " + comment.author.lastname}
                </b>{" "}
                {" @" + comment.author.username + " "}
                <FontAwesomeIcon
                  icon={faCircle}
                  className="dot text-muted mx-1"
                />
                <span>{getTimeElapsed(comment.createdOn)}</span>
              </div>
            </div>
            {comment.author._id === user._id ? (
              <div className="deleteIcon">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={handleShowDeleteModal}
                />
              </div>
            ) : null}

            <DeleteModal
              showDeleteModal={showDeleteModal}
              handleCloseDeleteModal={handleCloseDeleteModal}
              handleDeleteTweet={handleDeleteTweet}
            />
          </Col>
          <Col>{comment.content}</Col>
          <Col>
            <Row className="text-muted">
              <Col>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle tweetIcon me-3">
                    <FontAwesomeIcon icon={faMessage} />
                  </div>
                </div>
              </Col>
              <Col>
                <div className="rounded-circle tweetIcon">
                  <FontAwesomeIcon icon={faRepeat} />
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle tweetIcon me-3"
                    onClick={handleLike}
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
                  <span>{commentLikes.length}</span>
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
  function userLiked() {
    return commentLikes.filter((el) => el._id === user._id).length;
  }
};

export default Comment;
