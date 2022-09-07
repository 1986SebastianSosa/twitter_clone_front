import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyToast from "../myToast/MyToast";
import Tweet from "../tweet/tweet";
import "./tweetList.css";

const TweetsList = ({ allTweets, setAllTweets }) => {
  const toggleDeleteToast = () => setShowDeleteToast(!showDeleteToast);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const navigate = useNavigate();

  const handleClick = (tweetId) => {
    navigate(`/tweet/${tweetId}`);
  };

  return (
    <>
      <MyToast
        showDeleteToast={showDeleteToast}
        toggleDeleteToast={toggleDeleteToast}
        content="Your tweet has been deleted"
      />
      {allTweets.map((tweet) => {
        return (
          <div
            className="tweet"
            key={tweet._id}
            onClick={() => handleClick(tweet._id)}
          >
            <Tweet
              tweet={tweet}
              setAllTweets={setAllTweets}
              setShowDeleteToast={setShowDeleteToast}
            />
          </div>
        );
      })}
    </>
  );
};

export default TweetsList;
