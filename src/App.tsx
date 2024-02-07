import { useCallback, useState } from "react";
import { Timeline } from "./features/Timeline";
import { TweetInput } from "./features/components/TweetInput";
import { tweetProps } from "./features/Tweet";

const App = (): JSX.Element => {
  const [tweets, setTweets] = useState<tweetProps[]>([
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
  ]);

  const addTweet = useCallback(
    (newtweet: tweetProps) => {
      const newTweets = [newtweet, ...tweets];
      setTweets(newTweets);
    },
    [tweets]
  );

  return (
    <div className="App">
      <TweetInput addTweet={addTweet} />
      <Timeline tweets={tweets} />
    </div>
  );
};

export default App;
