import Tweet from "../tweet/tweet";

const TweetsList = ({ allTweets }) => {
  return (
    <>
      {allTweets.map((tweet) => {
        return (
          <Tweet
            key={tweet._id}
            fullName={tweet.author.firstname + " " + tweet.author.lastname}
            username={tweet.author.username}
            createdOn={tweet.createdOn}
            content={tweet.content}
          />
        );
      })}
    </>
  );
};

export default TweetsList;
