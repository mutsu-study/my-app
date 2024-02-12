import { useCallback, useEffect, useState } from "react";
import { Timeline } from "./features/Timeline";
import { TweetInput } from "./features/components/TweetInput";
import { tweetProps } from "./features/Tweet";
import { Box } from "@mui/material";

const App = (): JSX.Element => {
  const DEFAULT_TWEET = [
    {
      id: 0,
      icon: "🌽",
      displayName: "もろこし太郎",
      accountName: "morokoshi",
      content: "今日も一日もろこしがうまい",
    },
    {
      id: 1,
      icon: "🦐",
      displayName: "エビデンス",
      accountName: "evidence",
      content: "かにみそ食べたい",
    },
  ];

  const STORED_TWEET = localStorage.getItem("tweet");
  const INITIAL_TWEET: tweetProps[] = STORED_TWEET
    ? JSON.parse(STORED_TWEET).length === 0
      ? DEFAULT_TWEET
      : JSON.parse(STORED_TWEET)
    : DEFAULT_TWEET;

  const [tweets, setTweets] = useState<tweetProps[]>(INITIAL_TWEET);

  const addTweet = useCallback(
    (newtweet: tweetProps) => {
      const newTweets = [newtweet, ...tweets];
      setTweets(newTweets);
    },
    [tweets]
  );

  useEffect(() => {
    localStorage.setItem("tweet", JSON.stringify(tweets));
  }, [tweets]);

  return (
    <Box className="App" sx={{ m: 2 }}>
      <TweetInput addTweet={addTweet} />
      <Timeline tweets={tweets} />
    </Box>
  );
};

export default App;
