import { Col, Row } from "react-bootstrap";
import Sidenav from "../sidenav/Sidenav";
import "./errorPage.css";

const ErrorPage = () => {
  const windowWidth = window.innerWidth;
  return (
    <main id="error-page">
      <Row>
        <Col sm={2} md={3} className={`${windowWidth < 576 && "d-none"}`}>
          <Sidenav />
        </Col>
        <Row>
          <Col className="text-center">
            <h1>404</h1>
            <h2>Page not found!</h2>
          </Col>
        </Row>
      </Row>
    </main>
  );
};

export default ErrorPage;
