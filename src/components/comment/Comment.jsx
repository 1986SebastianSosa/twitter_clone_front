import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faUser,
  faRepeat,
  faArrowUpFromBracket,
  faCircle,
  faTrashCan,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteModal from "./../deleteModal/DeleteModal";
import { fetchCommentLikes, likeComment } from "../../services/likeServices";
import { PuffLoader } from "react-spinners";
import getTimeElapsed from "../../util/getTimeElapsed";
import ReactTooltip from "react-tooltip";
import { useDeleteCommentMutation } from "../../app/api/commentsApiSlice";

const Comment = ({
  comment,
  setShowDeleteToast,

  windowWidth,
}) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentLikes, setCommentLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteComment, result] = useDeleteCommentMutation();

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDeleteComment = async () => {
    await deleteComment(comment._id, comment.tweet);
    result.isSuccess && setShowDeleteModal(false);
    result.isSuccess && setShowDeleteToast(true);
  };

  const handleLike = async () => {
    await likeComment(comment._id, user._id, token);
    const response = await fetchCommentLikes(comment._id, user._id, token);
    setCommentLikes(response.data);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchCommentLikes(comment._id, user._id, token);
      setCommentLikes(response.data);
      setIsLoading(false);
    };
    fetch();
  }, []);

  return (
    <>
      <Row className="p-2 border-bottom my-2">
        <Col xs={2} className="d-flex justify-content-center p-0">
          <div
            className={`rounded-circle d-flex justify-content-center align-items-center user-icon-small bg-light  ${
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
              <Row className="text-muted mt-1">
                <Col>
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle tweetIcon me-3"
                      data-for="outOfScope"
                      data-tip={showTooltip && ""}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <FontAwesomeIcon icon={faMessage} />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div
                    className="rounded-circle tweetIcon"
                    data-for="outOfScope"
                    data-tip={showTooltip && ""}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
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
                  <div
                    className="rounded-circle tweetIcon"
                    data-for="outOfScope"
                    data-tip={showTooltip && ""}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {showTooltip && (
        <ReactTooltip
          id="outOfScope"
          getContent={() => {
            return;
          }}
          event="click"
          type="info"
        >
          <FontAwesomeIcon icon={faCircleInfo} /> This functionality is beyond
          the scope of this project
        </ReactTooltip>
      )}
      <DeleteModal
        title={"Comment"}
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDelete={handleDeleteComment}
        isDeleteCommentLoading={result.isLoading}
      />
    </>
  );

  function userLiked() {
    return commentLikes.filter((el) => el._id === user._id).length;
  }
};

export default Comment;
