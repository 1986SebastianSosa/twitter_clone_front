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

const Home = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [allTweets, setAllTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noTweets, setNoTweets] = useState(false);
  const [showGoFollowModal, setShowGoFollowModal] = useState(false);

  const handleShowGoFollowModal = () => {
    setShowGoFollowModal(true);
  };

  const handleCloseGoFollowModal = () => {
    setShowGoFollowModal(false);
  };
  useEffect(() => {
    const fetchUser = async (userId) => {
      const response = await getUser(userId);
      if (!response.data.following.length) {
        handleShowGoFollowModal();
      }
    };
    fetchUser(user._id);
    window.scrollTo(0, 0);
    const fetchTweets = async () => {
      const response = await getAllTweets(user);
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
          </Col>
        </Row>
      </Container>
      <GoFollowModal
        handleCloseGoFollowModal={handleCloseGoFollowModal}
        showGoFollowModal={showGoFollowModal}
      />
    </>
  );
};

export default Home;
