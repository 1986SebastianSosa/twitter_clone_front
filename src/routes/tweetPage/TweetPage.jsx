import Tweet from "../../components/tweet/tweet";
import { Container, Row, Col } from "react-bootstrap";
import Sidenav from "../../components/sidenav/Sidenav";
import TrendingSidenav from "../../components/trendingSidenav/TrendingSidenav";
import Searchbar from "../../components/searchbar/Searchbar";
import Topnav from "../../components/topnav/Topnav";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneTweet } from "../../services/tweetServices";
import { useState } from "react";
import Comment from "../../components/comment/Comment";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";

const TweetPage = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [tweet, setTweet] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await getOneTweet(id, token);
      setTweet(response.data);
      setIsLoading(false);
    };
    fetch();
  }, [comments]);

  useEffect(() => {
    if (tweet.comments) {
      const sortedCommentsArr = tweet.comments.sort((a, b) => {
        return Date.parse(b.createdOn) - Date.parse(a.createdOn);
      });
      setComments(sortedCommentsArr);
    }
  }, [tweet]);

  return (
    <>
      <Container>
        <Row>
          <Col xs={3}>
            <Sidenav />
          </Col>
          <Col xs={6} className="border-start border-end border-light p-0">
            <Topnav title="Tweet" />
            {isLoading ? (
              <PuffLoader color="#1d9bf0" />
            ) : (
              <Tweet tweet={tweet} />
            )}
            {isLoading ? (
              <PuffLoader color="#1d9bf0" />
            ) : (
              comments.map((comment) => (
                <Comment
                  tweet={tweet}
                  setTweet={setTweet}
                  key={comment._id}
                  comment={comment}
                  setComments={setComments}
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
