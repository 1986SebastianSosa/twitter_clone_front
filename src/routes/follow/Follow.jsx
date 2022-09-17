import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FollowCard from "../../components/followCard/FollowCard";
import Searchbar from "../../components/searchbar/Searchbar";
import Sidenav from "../../components/sidenav/Sidenav";
import Topnav from "../../components/topnav/Topnav";
import TrendingSidenav from "../../components/trendingSidenav/TrendingSidenav";
import { showFollowSuggestions } from "../../services/followServices";

const Follow = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [followSuggestions, setFollowSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await showFollowSuggestions(user, token);
      setFollowSuggestions(response.data);
    };
    fetch();
  }, []);

  return (
    <>
      <Container className="followCard">
        <Row>
          <Col xs={3}>
            <Sidenav />
          </Col>
          <Col xs={6} className="border-start border-end border-light">
            <Topnav />
            {followSuggestions.map((suggestion, index) => {
              return <FollowCard suggestion={suggestion} key={index} />;
            })}
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

export default Follow;
