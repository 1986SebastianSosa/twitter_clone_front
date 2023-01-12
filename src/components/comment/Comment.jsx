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
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteModal from "./../deleteModal/DeleteModal";
import { PuffLoader } from "react-spinners";
import { selectUser } from "../../redux/authSlice";
import useAxiosPrivate from "./../../hooks/useAxiosPrivate";
import { getTimeElapsed } from "./../../util/getTimeElapsed";

const Comment = ({
  comment,
  setShowDeleteToast,
  comments,
  setComments,
  windowWidth,
}) => {
  const user = useSelector(selectUser);
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentLikes, setCommentLikes] = useState([]);
  const [userLiked, setUserLiked] = useState(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  useEffect(() => {
    setCommentLikes(comment.likes);
  }, []);

  useEffect(() => {
    if (commentLikes.includes(user._id)) {
      setUserLiked(true);
    } else {
      setUserLiked(false);
    }
  }, [commentLikes]);

  const handleDeleteComment = async () => {
    setIsLoading(true);
    try {
      await axiosPrivate.delete(`/comment/${comment._id}`);
      setComments(comments.filter((el) => el._id !== comment._id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeComment = async () => {
    if (commentLikes.includes(user._id)) {
      setCommentLikes(commentLikes.filter((el) => el !== user._id));
    } else {
      setCommentLikes([user._id, ...commentLikes]);
    }
    try {
      await axiosPrivate.post(`/commentLike/${comment._id}`);
    } catch (error) {
      console.log(error);
    }
  };

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
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="out-of-scope">
                          This feature is out of the scope of this project
                        </Tooltip>
                      }
                    >
                      <div className="rounded-circle tweetIcon me-3">
                        <FontAwesomeIcon icon={faMessage} />
                      </div>
                    </OverlayTrigger>
                  </div>
                </Col>
                <Col>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="out-of-scope">
                        This feature is out of the scope of this project
                      </Tooltip>
                    }
                  >
                    <div className="rounded-circle tweetIcon">
                      <FontAwesomeIcon icon={faRepeat} />
                    </div>
                  </OverlayTrigger>
                </Col>
                <Col>
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle tweetIcon me-3"
                      onClick={handleLikeComment}
                    >
                      {userLiked ? (
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
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="out-of-scope">
                        This feature is out of the scope of this project
                      </Tooltip>
                    }
                  >
                    <div className="rounded-circle tweetIcon">
                      <FontAwesomeIcon icon={faArrowUpFromBracket} />
                    </div>
                  </OverlayTrigger>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <DeleteModal
        isDeleteLoading={isLoading}
        title={"Comment"}
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDelete={handleDeleteComment}
      />
    </>
  );
};

export default Comment;
