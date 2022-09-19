import { useState } from "react";
import MyToast from "../myToast/MyToast";
import Tweet from "../tweet/tweet";
import "./tweetList.css";

const TweetsList = ({ allTweets, setAllTweets, windowWidth }) => {
  const toggleDeleteToast = () => setShowDeleteToast(!showDeleteToast);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  return (
    <>
      <MyToast
        show={showDeleteToast}
        onClose={toggleDeleteToast}
        content="Your tweet has been deleted"
      />

      {allTweets.map((tweet) => {
        return (
          <Tweet
            key={tweet._id}
            tweet={tweet}
            setAllTweets={setAllTweets}
            setShowDeleteToast={setShowDeleteToast}
            windowWidth={windowWidth}
          />
        );
      })}
    </>
  );
};

export default TweetsList;
