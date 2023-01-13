import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectWindowWidth } from "../../redux/appSlice";
import Searchbar from "../searchbar/Searchbar";
import Sidenav from "../sidenav/Sidenav";
import WhoToFollow from "../whoToFollow/WhoToFollow";
import TrendingSidenav from "../trendingSidenav/TrendingSidenav";
import "./errorPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const windowWidth = useSelector(selectWindowWidth);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
  return (
    <Container>
      <Row>
        <Col sm={2} md={3} className={`${windowWidth < 576 && "d-none"}`}>
          <Sidenav windowWidth={windowWidth} />
        </Col>

        <Col className="border-start border-end">
          <main id="error-page">
            <div className="text-center">
              <FontAwesomeIcon icon={faTwitter} className="twitterLogo fa-5x" />
              <h1>404</h1>
              <h2>Page not found!</h2>
              <h5>The requested URL may have been removed</h5>
              <Button className="text-white mt-2" onClick={handleGoBack}>
                Go Back
              </Button>
            </div>
          </main>
        </Col>
        {windowWidth >= 992 && (
          <Col xs={3}>
            <Searchbar />
            <TrendingSidenav />
            <WhoToFollow />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ErrorPage;
