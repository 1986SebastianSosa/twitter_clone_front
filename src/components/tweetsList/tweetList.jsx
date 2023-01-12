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

const TweetsList = () => {
  const allTweets = useSelector(selectTweetsToShow);
  const hasMore = useSelector(selectHasMore);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [isError, setIsError] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  useEffect(() => {
    setPage(1);
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
      {!allTweets.length ? (
        <div className="loading w-100">
          <PuffLoader size={200} color="#1d9bf0" className="m-auto" />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={allTweets.length}
          next={handleNextPage}
          hasMore={hasMore}
          loader={<PuffLoader color="#1d9bf0" />}
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
      )}
    </>
  );
};

export default TweetsList;
