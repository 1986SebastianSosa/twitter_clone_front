import { useState } from "react";
import { PuffLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import MyToast from "../myToast/MyToast";
import Tweet from "../tweet/tweet";
import { useFetchTweetsQuery } from "../../redux/tweetsApiSlice";
import { useEffect } from "react";
import "./tweetList.css";
import { useDispatch, useSelector } from "react-redux";
import { selectpage, setPage } from "../../redux/appSlice";
import { selectAllTweets, selectHasMore } from "../../redux/tweetsSlice";

const TweetsList = () => {
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const toggleDeleteToast = () => setShowDeleteToast(!showDeleteToast);
  const page = useSelector(selectpage);
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useFetchTweetsQuery(page);
  const tweetsToShow = useSelector(selectAllTweets);
  const hasMore = useSelector(selectHasMore);

  console.log(tweetsToShow);

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
  if (isSuccess && tweetsToShow.length === 0) {
    return (
      <h4 className="p-2 mt-5 text-muted">
        Sorry, there are no tweets to show at this moment :({" "}
      </h4>
    );
  }
  if (isSuccess && tweetsToShow.length > 0) {
    console.log(tweetsToShow.length);
    return (
      <InfiniteScroll
        dataLength={tweetsToShow.length}
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
        {tweetsToShow.map((tweet) => {
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
