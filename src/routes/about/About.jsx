import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import BotNav from "../../components/botNav/BotNav";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import Searchbar from "../../components/searchbar/Searchbar";
import Sidenav from "../../components/sidenav/Sidenav";
import Topnav from "../../components/topnav/Topnav";
import TrendingSidenav from "../../components/trendingSidenav/TrendingSidenav";
import WhoToFollow from "../../components/whoToFollow/WhoToFollow";
import { selectWindowWidth } from "../../redux/appSlice";

const About = () => {
  const windowWidth = useSelector(selectWindowWidth);
  return (
    <Container>
      <Row>
        <Col sm={2} md={3} className={`${windowWidth < 576 && "d-none"}`}>
          <Sidenav windowWidth={windowWidth} />
        </Col>
        <Col
          xs={12}
          sm={10}
          md={9}
          lg={6}
          className="border-start border-end border-light p-0"
        >
          {windowWidth > 576 ? (
            <>
              <Topnav title="About" />
            </>
          ) : (
            <MobileHeader />
          )}
        </Col>
        {windowWidth >= 992 && (
          <Col xs={3}>
            <Searchbar />
            <TrendingSidenav />
            <WhoToFollow />
          </Col>
        )}
      </Row>

      {windowWidth < 576 && <BotNav />}
    </Container>
  );
};

export default About;
