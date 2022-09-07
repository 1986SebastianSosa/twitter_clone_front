import Toast from "react-bootstrap/Toast";

function MyToast({ showDeleteToast, toggleDeleteToast, content }) {
  return (
    <Toast
      show={showDeleteToast}
      onClose={toggleDeleteToast}
      delay={3000}
      autohide
    >
      <Toast.Header className="bg-danger text-white">
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Delete</strong>
        <small>Just now</small>
      </Toast.Header>
      <Toast.Body>{content}</Toast.Body>
    </Toast>
  );
}

export default MyToast;
