import Tweet from "../tweet/tweet";

const TweetsList = ({ allTweets }) => {
  return (
    <>
      {allTweets.map((tweet) => {
        return <Tweet key={tweet._id} tweet={tweet} />;
      })}
    </>
  );
};

export default TweetsList;
