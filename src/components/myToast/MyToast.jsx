import Toast from "react-bootstrap/Toast";

function MyToast({ show, onClose, content }) {
  return (
    <Toast show={show} onClose={onClose} delay={5000} autohide>
      <Toast.Header className="bg-danger text-white">
        <img
          src="holder.js/20x20?text=%20"
          className="rounded ms-auto"
          alt=""
        />
      </Toast.Header>
      <Toast.Body>
        <h6 className="fw-bold text-center">{content}</h6>
      </Toast.Body>
    </Toast>
  );
}

export default MyToast;
