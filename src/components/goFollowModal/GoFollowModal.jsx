import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/authSlice";

const GoFollowModal = ({ handleCloseGoFollowModal, showGoFollowModal }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/follow/" + user._id);
  };
  return (
    <>
      <Modal
        show={showGoFollowModal}
        onHide={handleCloseGoFollowModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>You're not following anyone yet!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          In order to have fun on Twitter (clone) you need to follow some users.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="text-white"
            onClick={clickHandler}
          >
            Lets follow some people!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GoFollowModal;
