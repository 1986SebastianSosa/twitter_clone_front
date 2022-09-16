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
  const [followSuggestions, setFollowSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    const fetch = async () => {
      const response = await showFollowSuggestions(user);
      setFollowSuggestions(response.data);
    };
    fetch();
  }, []);

  return (
    <>
      <Container>
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
