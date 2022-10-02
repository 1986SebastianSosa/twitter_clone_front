import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BotNav from "../../components/botNav/BotNav";
import FollowCard from "../../components/followCard/FollowCard";
import Searchbar from "../../components/searchbar/Searchbar";
import Sidenav from "../../components/sidenav/Sidenav";
import Topnav from "../../components/topnav/Topnav";
import TrendingSidenav from "../../components/trendingSidenav/TrendingSidenav";
import { updateUser } from "../../redux/authSlice";
import { showFollowSuggestions } from "../../services/followServices";
import { getUser } from "../../services/userServices";

const Follow = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [followSuggestions, setFollowSuggestions] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    const fetchUser = async () => {
      const response = await getUser(user._id);
      dispatch(updateUser(response.data));
    };
    fetchUser();
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await showFollowSuggestions(user, token);
      const sortedFollowSuggestions = response.data.sort(
        (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
      );
      setFollowSuggestions(sortedFollowSuggestions);
    };
    fetch();
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
  }, []);

  return (
    <>
      <Container className="followCard mb-5">
        <Row>
          <Col sm={2} md={3} className={`${windowWidth < 576 && "d-none"}`}>
            <Sidenav windowWidth={windowWidth} />
          </Col>
          <Col
            xs={11}
            sm={10}
            md={9}
            lg={6}
            className="border-start border-end border-light p-0"
          >
            <Topnav />
            {followSuggestions.map((suggestion, index) => {
              return (
                <FollowCard
                  suggestion={suggestion}
                  key={index}
                  windowWidth={windowWidth}
                />
              );
            })}
          </Col>
          {windowWidth >= 992 && (
            <Col xs={3}>
              <Searchbar />
              <TrendingSidenav />
            </Col>
          )}
        </Row>
        {windowWidth < 576 && <BotNav />}
      </Container>
    </>
  );
};

export default Follow;
