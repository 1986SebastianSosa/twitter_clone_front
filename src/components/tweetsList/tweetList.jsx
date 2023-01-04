import { useState } from "react";
import { PuffLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import MyToast from "../myToast/MyToast";
import Tweet from "../tweet/tweet";
import "./tweetList.css";
import { selectAllTweets } from "../../redux/tweetsSlice";
import { useSelector } from "react-redux";

const TweetsList = ({
  // allTweets,
  setAllTweets,
  hasMore,
  windowWidth,
  setPage,
  page,
  setNoTweets,
  setHasMore,
  setAllTweetsLength,
}) => {
  const allTweets = useSelector(selectAllTweets);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const toggleDeleteToast = () => setShowDeleteToast(!showDeleteToast);

  return (
    <>
      <MyToast
        show={showDeleteToast}
        onClose={toggleDeleteToast}
        content="Your tweet has been deleted"
      />
      <InfiniteScroll
        dataLength={allTweets.length} //This is important field to render the next data
        next={() => setPage((prev) => prev + 1)}
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
              setAllTweets={setAllTweets}
              page={page}
              setNoTweets={setNoTweets}
              setHasMore={setHasMore}
              setAllTweetsLength={setAllTweetsLength}
              setShowDeleteToast={setShowDeleteToast}
              windowWidth={windowWidth}
            />
          );
        })}
      </InfiniteScroll>
    </>
  );
};

export default TweetsList;
