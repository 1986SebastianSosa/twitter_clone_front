import Toast from "react-bootstrap/Toast";

function MyToast({ show, close, content }) {
  return (
    <Toast show={show} onClose={() => close()} delay={5000} autohide>
      <Toast.Header className="bg-danger text-white">
        <img
          src="holder.js/20x20?text=%20"
          className="rounded ms-auto"
          alt=""
        />
      </Toast.Header>
      <Toast.Body>{content}</Toast.Body>
    </Toast>
  );
}

export default MyToast;
