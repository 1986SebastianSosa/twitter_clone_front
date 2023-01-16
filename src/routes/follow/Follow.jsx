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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { selectUser, updateUser } from "../../redux/authSlice";
import { PuffLoader } from "react-spinners";
import "./follow.css";

const Follow = () => {
  const user = useSelector(selectUser);
  const [followSuggestions, setFollowSuggestions] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosPrivate.get("/user");
        dispatch(updateUser(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }

    window.scrollTo(0, 0);
    const fetchFollowers = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get("/follower");
        const sortedFollowSuggestions = response.data.sort(
          (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
        );
        setFollowSuggestions(sortedFollowSuggestions);
      } catch (error) {
        setIsError(true);
        error.response?.status === 401 || error.response?.status === 403
          ? navigate("/")
          : error.response?.data?.msg
          ? setError(error?.response?.data?.msg)
          : setError("*Something went wrong. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFollowers();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleWindowResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleWindowResize);
  }, []);

  return (
    <Container className="mb-5">
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
          {isLoading ? (
            <div className="loading">
              <PuffLoader size={200} color="#1d9bf0" />
            </div>
          ) : isError ? (
            <div className="message">
              <h4>{error}</h4>
            </div>
          ) : (
            followSuggestions.map((suggestion, index) => {
              return (
                <FollowCard
                  suggestion={suggestion}
                  key={index}
                  windowWidth={windowWidth}
                />
              );
            })
          )}
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
  );
};

export default Follow;
