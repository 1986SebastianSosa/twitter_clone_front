import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Topnav from "../../components/topnav/Topnav";
import Searchbar from "../../components/searchbar/Searchbar";
import TrendingSidenav from "../../components/trendingSidenav/TrendingSidenav";
import Sidenav from "../../components/sidenav/Sidenav";
import MainPost from "../../components/post/MainPost";
import TweetsList from "../../components/tweetsList/tweetList";
import { useSelector } from "react-redux";
import { getAllTweets } from "../../services/tweetServices";
import { PuffLoader } from "react-spinners";
import "./home.css";

const Home = () => {
  const user = useSelector((state) => state.user);
  const [allTweets, setAllTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await getAllTweets(user);
      const sortedData = response.data.sort(
        (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
      );
      setAllTweets(sortedData);
      setIsLoading(false);
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
    </>
  );
};

export default Home;
