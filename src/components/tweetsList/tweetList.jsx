import { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import MyToast from "../myToast/MyToast";
import Tweet from "../tweet/tweet";
import { useDispatch, useSelector } from "react-redux";
import {
  resetTweetsToShow,
  selectHasMore,
  selectTweetsToShow,
  setHasMore,
  setTweetsToShow,
} from "../../redux/tweetsSlice";
import { selectPage, setPage } from "../../redux/appSlice";
import "./tweetList.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/authSlice";

const TweetsList = () => {
  const user = useSelector(selectUser);
  const allTweets = useSelector(selectTweetsToShow);
  const hasMore = useSelector(selectHasMore);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  useEffect(() => {
    dispatch(resetTweetsToShow());
    return () => {
      dispatch(setPage(1));
    };
  }, []);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axiosPrivate.get(`/tweet?page=${page}`);
        dispatch(setTweetsToShow(response.data.tweetsToShow));
        dispatch(setHasMore(response.data.hasMore));
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTweets();
  }, []);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axiosPrivate.get(`/tweet?page=${page}`);
        dispatch(setTweetsToShow(response.data.tweetsToShow));
        dispatch(setHasMore(response.data.hasMore));
      } catch (error) {
        setIsError(true);
        error.response
          ? setError(error?.response?.data?.msg)
          : setError("The server seems to be offline. Try again later.");

        console.log(error);
      }
    };
    fetchTweets();
  }, [page]);

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <>
      <MyToast
        show={showDeleteToast}
        onClose={() => setShowDeleteToast(!showDeleteToast)}
        content="Your tweet has been deleted"
      />
      {isLoading ? (
        <PuffLoader size={200} className="m-auto my-5" color="#1d9bf0" />
      ) : !isLoading && allTweets.length ? (
        <InfiniteScroll
          dataLength={allTweets.length}
          next={handleNextPage}
          hasMore={hasMore}
          loader={<PuffLoader color="#1d9bf0" className="m-auto" />}
          endMessage={
            <p style={{ textAlign: "center", color: "#1d9bf0" }}>
              <b>Yay! You have seen all of the tweets!</b>
            </p>
          }
          style={{ overflow: "hidden" }}
        >
          {allTweets.map((tweet) => {
            return (
              <Tweet
                key={tweet._id}
                tweet={tweet}
                setShowDeleteToast={setShowDeleteToast}
              />
            );
          })}
        </InfiniteScroll>
      ) : isError ? (
        <Container>
          <Row>
            <Col className="message d-flex align-items-center">
              <h4>The server seems to be offline. Try again later.</h4>
            </Col>
          </Row>
        </Container>
      ) : (
        !isLoading &&
        !allTweets.length && (
          <Container>
            <Row>
              <Col className="message d-flex align-items-center">
                <h4>You don't seem to have any Tweets :(</h4>
                <Link to={`/follow/${user._id}`}>
                  <h6>Try following some people</h6>
                </Link>
              </Col>
            </Row>
          </Container>
        )
      )}
    </>
  );
};

export default TweetsList;
