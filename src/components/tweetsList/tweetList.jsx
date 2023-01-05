import { useState } from "react";
import { PuffLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import MyToast from "../myToast/MyToast";
import Tweet from "../tweet/tweet";
import { useFetchTweetsQuery } from "../../redux/tweetsApiSlice";
import { useEffect } from "react";
import "./tweetList.css";

const TweetsList = ({}) => {
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [page, setPage] = useState(1);
  const toggleDeleteToast = () => setShowDeleteToast(!showDeleteToast);
  const { data, isLoading, isSuccess, error } = useFetchTweetsQuery(page);

  const handleNextPage = () => {
    if (isSuccess) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <MyToast
        show={showDeleteToast}
        onClose={toggleDeleteToast}
        content="Your tweet has been deleted"
      />
      {isLoading ? (
        <div className="loading">
          <PuffLoader size={200} color="#1d9bf0" />
        </div>
      ) : false ? (
        <h4 className="p-2 mt-5 text-muted">
          Sorry, there are no tweets to show at this moment :({" "}
        </h4>
      ) : (
        <InfiniteScroll
          dataLength={data.tweetsToShow.length}
          next={handleNextPage}
          hasMore={data?.hasMore}
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
      )}
    </>
  );
};

export default TweetsList;
