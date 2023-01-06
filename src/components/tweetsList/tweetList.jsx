import { useState } from "react";
import { PuffLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import MyToast from "../myToast/MyToast";
import Tweet from "../tweet/tweet";
import { useFetchTweetsQuery } from "../../redux/tweetsApiSlice";
import { useEffect } from "react";
import "./tweetList.css";
import { useDispatch, useSelector } from "react-redux";
import { selectPage, setPage } from "../../redux/appSlice";
import { selectAllTweets, selectHasMore } from "../../redux/tweetsSlice";

const TweetsList = () => {
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const toggleDeleteToast = () => setShowDeleteToast(!showDeleteToast);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const { data, isLoading, isFetching, isSuccess } = useFetchTweetsQuery(page);
  // const tweetsToShow = useSelector(selectAllTweets);
  // const hasMore = useSelector(selectHasMore);

  const handleNextPage = () => {
    dispatch(setPage({ page: page + 1 }));
  };

  if (isLoading) {
    return (
      <div className="loading">
        <PuffLoader size={200} color="#1d9bf0" />
      </div>
    );
  }
  if (isSuccess && data.tweetsToShow.length === 0) {
    return (
      <h4 className="p-2 mt-5 text-muted">
        Sorry, there are no tweets to show at this moment :({" "}
      </h4>
    );
  }
  if (isSuccess && data.tweetsToShow.length > 0) {
    return (
      <InfiniteScroll
        dataLength={data.tweetsToShow.length}
        next={handleNextPage}
        hasMore={data.hasMore}
        loader={<PuffLoader color="#1d9bf0" />}
        endMessage={
          <p style={{ textAlign: "center", color: "#1d9bf0" }}>
            <b>Yay! You have seen all of the tweets!</b>
          </p>
        }
        style={{ overflow: "hidden" }}
      >
        {data.tweetsToShow.map((tweet) => {
          return (
            <Tweet
              key={tweet._id}
              tweet={tweet}
              setShowDeleteToast={setShowDeleteToast}
            />
          );
        })}
      </InfiniteScroll>
    );
  }

  return (
    <>
      <MyToast
        show={showDeleteToast}
        onClose={toggleDeleteToast}
        content="Your tweet has been deleted"
      />
    </>
  );
};

export default TweetsList;
