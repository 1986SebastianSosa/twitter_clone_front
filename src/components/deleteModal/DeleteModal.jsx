import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({
  showDeleteModal,
  handleCloseDeleteModal,
  handleDeleteTweet,
}) => {
  return (
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Tweet</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this tweet?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="text-white"
          onClick={handleCloseDeleteModal}
        >
          Don't delete
        </Button>
        <Button variant="danger" onClick={handleDeleteTweet}>
          Delete Tweet
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
