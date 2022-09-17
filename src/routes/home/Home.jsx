import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllTweets } from "../../services/tweetServices";
import { PuffLoader } from "react-spinners";
import { getUser } from "../../services/userServices";
import Topnav from "../../components/topnav/Topnav";
import Searchbar from "../../components/searchbar/Searchbar";
import TrendingSidenav from "../../components/trendingSidenav/TrendingSidenav";
import Sidenav from "../../components/sidenav/Sidenav";
import MainPost from "../../components/post/MainPost";
import TweetsList from "../../components/tweetsList/tweetList";
import GoFollowModal from "../../components/goFollowModal/GoFollowModal";
import "./home.css";
import { Navigate, useNavigate } from "react-router-dom";
import WhoToFollow from "../../components/whoToFollow/WhoToFollow";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [allTweets, setAllTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noTweets, setNoTweets] = useState(false);
  const [showGoFollowModal, setShowGoFollowModal] = useState(false);
  const navigate = useNavigate();

  const handleShowGoFollowModal = () => {
    setShowGoFollowModal(true);
  };

  const handleCloseGoFollowModal = () => {
    setShowGoFollowModal(false);
  };

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    const fetchUser = async (userId) => {
      const response = await getUser(userId);
      if (response.data.following.length <= 1) {
        handleShowGoFollowModal();
      }
    };

    fetchUser(user._id);
    window.scrollTo(0, 0);
    const fetchTweets = async () => {
      const response = await getAllTweets(user, token);
      if (!response.data.length) {
        setNoTweets(true);
        setIsLoading(false);
        return;
      }
      setNoTweets(false);
      const sortedData = response.data.sort(
        (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
      );
      setAllTweets(sortedData);
      setIsLoading(false);
    };
    fetchTweets();
  }, []);

  return (
    <>
      {user && (
        <Container>
          <Row>
            <Col xs={3}>
              <Sidenav />
            </Col>
            <Col xs={6} className="border-start border-end border-light p-0">
              <Topnav title="Home" />
              <MainPost
                user={user}
                setAllTweets={setAllTweets}
                allTweets={allTweets}
              />
              {isLoading ? (
                <div className="loading">
                  <PuffLoader size={200} color="#1d9bf0" />
                </div>
              ) : noTweets ? (
                <h4 className="p-2 mt-5 text-muted">
                  Sorry, there are no tweets to show at this moment :({" "}
                </h4>
              ) : (
                <TweetsList allTweets={allTweets} setAllTweets={setAllTweets} />
              )}
            </Col>
            <Col xs={3}>
              <Searchbar />
              <TrendingSidenav />
              <WhoToFollow />
            </Col>
          </Row>
        </Container>
      )}
      <GoFollowModal
        handleCloseGoFollowModal={handleCloseGoFollowModal}
        showGoFollowModal={showGoFollowModal}
      />
    </>
  );
};

export default Home;
