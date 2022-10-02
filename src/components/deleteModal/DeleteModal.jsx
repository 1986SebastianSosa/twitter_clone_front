import { Modal, Button } from "react-bootstrap";
import { PuffLoader } from "react-spinners";

const DeleteModal = ({
  isDeleteCommentLoading,
  isDeleteLoading,
  showDeleteModal,
  handleCloseDeleteModal,
  handleDelete,
  title,
}) => {
  return (
    <Modal
      show={showDeleteModal}
      onHide={handleCloseDeleteModal}
      backdrop="static"
      keyboard={false}
    >
      {isDeleteCommentLoading || isDeleteLoading ? (
        <div className="py-5">
          <PuffLoader className="m-auto" color="#1d9bf0" />
          <h6 className="m-auto text-center text-muted pt-3">
            Just a moment...
          </h6>
        </div>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Delete {title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this {title}?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="text-white"
              onClick={handleCloseDeleteModal}
            >
              Don't delete
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete {title}
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default DeleteModal;
