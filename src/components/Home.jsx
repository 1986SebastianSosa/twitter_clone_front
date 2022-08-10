import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidenav from "./sidenav/Sidenav";
import TrendingSidenav from "./trendingSidenav/TrendingSidenav";
import Topnav from "./topnav/Topnav";
import Searchbar from "./searchbar/Searchbar";

const Home = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={3}>
            <Sidenav />
          </Col>
          <Col xs={6}>
            <Topnav />
          </Col>
          <Col xs={3}>
            <Searchbar />
            <TrendingSidenav />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
