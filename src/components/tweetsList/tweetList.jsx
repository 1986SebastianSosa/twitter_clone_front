import { useState } from "react";
import { PuffLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import MyToast from "../myToast/MyToast";
import Tweet from "../tweet/tweet";
import { useDispatch, useSelector } from "react-redux";
import { selectHasMore, selectTweetsToShow } from "../../redux/tweetsSlice";
import { selectPage, setPage } from "../../redux/appSlice";
import "./tweetList.css";

const TweetsList = () => {
  const allTweets = useSelector(selectTweetsToShow);
  const hasMore = useSelector(selectHasMore);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  console.log(allTweets);

  const [showDeleteToast, setShowDeleteToast] = useState(false);

  return (
    <>
      <MyToast
        show={showDeleteToast}
        onClose={() => setShowDeleteToast(!showDeleteToast)}
        content="Your tweet has been deleted"
      />
      <InfiniteScroll
        dataLength={allTweets.length} //This is important field to render the next data
        // next={dispatch(setPage(page + 1))}
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
    </>
  );
};

export default TweetsList;
