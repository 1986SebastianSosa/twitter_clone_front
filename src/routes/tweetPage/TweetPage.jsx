import Tweet from "../../components/tweet/tweet";
import { Container, Row, Col } from "react-bootstrap";
import Sidenav from "../../components/sidenav/Sidenav";
import TrendingSidenav from "../../components/trendingSidenav/TrendingSidenav";
import Searchbar from "../../components/searchbar/Searchbar";
import Topnav from "../../components/topnav/Topnav";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneTweet } from "../../services/tweetServices";
import { useState } from "react";
import Comment from "../../components/comment/Comment";

const TweetPage = () => {
  const [tweet, setTweet] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await getOneTweet(id);
      setTweet(response.data);
      setIsLoading(false);
    };
    fetch();
  }, []);

  // useEffect(() => {
  //   console.log(tweet);
  // }, [tweet]);

  return (
    <>
      <Container>
        <Row>
          <Col xs={3}>
            <Sidenav />
          </Col>
          <Col xs={6} className="border-start border-end border-light p-0">
            <Topnav title="Tweet" />
            {isLoading ? <div>Loading...</div> : <Tweet tweet={tweet} />}
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              tweet.comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  setShowDeleteToast={setShowDeleteToast}
                />
              ))
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

export default TweetPage;
