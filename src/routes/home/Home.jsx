import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import Topnav from "../../components/topnav/Topnav";
import Searchbar from "../../components/searchbar/Searchbar";
import TrendingSidenav from "../../components/trendingSidenav/TrendingSidenav";
import Sidenav from "../../components/sidenav/Sidenav";
import MainPost from "../../components/post/MainPost";
import TweetsList from "../../components/tweetsList/tweetList";
import GoFollowModal from "../../components/goFollowModal/GoFollowModal";
import "./home.css";
import { useNavigate } from "react-router-dom";
import WhoToFollow from "../../components/whoToFollow/WhoToFollow";
import BotNav from "../../components/botNav/BotNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import PostModal from "../../components/postModal/PostModal";
import { selectTweetsToShow, setTweetsToShow } from "../../redux/tweetsSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  selectIsLoading,
  selectIsSuccess,
  selectPage,
  selectWindowWidth,
  setIsError,
  setIsLoading,
  setIsSuccess,
  setWindowWidth,
} from "../../redux/appSlice";
import { selectUser } from "../../redux/authSlice";

const Home = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const allTweets = useSelector(selectTweetsToShow);
  const page = useSelector(selectPage);
  const windowWidth = useSelector(selectWindowWidth);
  const isLoading = useSelector(selectIsLoading);
  const isSuccess = useSelector(selectIsSuccess);

  const [showGoFollowModal, setShowGoFollowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleWindowResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleWindowResize);
  }, []);
  // const handleShowGoFollowModal = () => {
  //   setShowGoFollowModal(true);
  // };

  // const handleCloseGoFollowModal = () => {
  //   setShowGoFollowModal(false);
  // };

  // const handleShowPostModal = () => {
  //   setShowPostModal(true);
  // };
  // const handleClosePostModal = () => {
  //   setShowPostModal(false);
  // };

  useEffect(() => {
    const fetchTweets = async () => {
      dispatch(setIsLoading(true));
      try {
        const response = await axiosPrivate.get(`/tweet?page=${page}`);
        dispatch(setTweetsToShow(response.data));
        dispatch(setIsLoading(false));
        dispatch(setIsSuccess(true));
      } catch (error) {
        dispatch(setIsError(true));
        console.log(error);
      }
    };
    if (page && user) {
      fetchTweets();
    }
  }, [page, user]);

  return (
    <>
      {isSuccess && (
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
              {windowWidth > 576 && (
                <>
                  <Topnav title="Home" />
                  <MainPost />
                </>
              )}

              {isLoading ? (
                <div className="loading">
                  <PuffLoader size={200} color="#1d9bf0" />
                </div>
              ) : !allTweets.length ? (
                <h4 className="p-2 mt-5 text-muted">
                  Sorry, there are no tweets to show at this moment :({" "}
                </h4>
              ) : (
                <TweetsList />
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
          {windowWidth < 576 && (
            <Button
              className="tweetMobileBtn tweetBtn rounded-circle text-white fw-bold fs-5"
              onClick={() => setShowPostModal}
            >
              <FontAwesomeIcon icon={faFeather} />
            </Button>
          )}
          {windowWidth < 576 && <BotNav />}
        </Container>
      )}
      <GoFollowModal
        handleCloseGoFollowModal={() => setShowGoFollowModal(false)}
        showGoFollowModal={showGoFollowModal}
      />
      <PostModal
        showPostModal={showPostModal}
        handleClosePostModal={() => setShowPostModal(false)}
      />
    </>
  );
};

export default Home;
