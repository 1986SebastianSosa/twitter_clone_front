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
import {
  deleteTweet,
  getAllTweets,
  getOneTweet,
} from "../../services/tweetServices";
import { useSelector } from "react-redux";
import DeleteModal from "./../deleteModal/DeleteModal";
import { fetchCommentLikes, likeComment } from "../../services/likeServices";
import { PuffLoader } from "react-spinners";
import { deleteComment } from "../../services/commentServices";

const Comment = ({
  comment,
  setShowDeleteToast,
  tweet,
  setTweet,
  setComments,
}) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentLikes, setCommentLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDeleteComment = async () => {
    const deleteResponse = await deleteComment(comment._id, token, tweet._id);
    const response = await getOneTweet(tweet._id, token);
    setTweet(response.data);
    setIsLoading(false);
    const sortedCommentsArr = tweet.comments.sort((a, b) => {
      return Date.parse(b.createdOn) - Date.parse(a.createdOn);
    });
    setComments(sortedCommentsArr);
    setShowDeleteModal(false);
    setShowDeleteToast(true);
  };

  const handleLike = async () => {
    await likeComment(comment._id, user._id, token);
    const response = await fetchCommentLikes(comment._id, user._id, token);
    setCommentLikes(response.data);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchCommentLikes(
        tweet._id,
        comment._id,
        user._id,
        token
      );
      setCommentLikes(response.data);
      setIsLoading(false);
    };
    fetch();
  }, []);

  return (
    <>
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
                    {isLoading ? (
                      <PuffLoader size={18} color="#1d9bf0" />
                    ) : (
                      <span>{commentLikes.length}</span>
                    )}
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
      <DeleteModal
        title={"Comment"}
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDelete={handleDeleteComment}
      />
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
  function userLiked() {
    return commentLikes.filter((el) => el._id === user._id).length;
  }
};

export default Comment;
