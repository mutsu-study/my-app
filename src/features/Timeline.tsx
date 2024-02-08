import { Box } from "@mui/material";
import { Tweet, tweetProps } from "./Tweet";

export type timelineProps = {
  tweets: tweetProps[];
};

export const Timeline = ({ tweets }: timelineProps): JSX.Element | null => {
  //tweetsからタイムラインを作成する
  const tweetList = tweets.map((tweet) => {
    return (
      <Tweet
        key={tweet.id}
        id={tweet.id}
        icon={tweet.icon}
        displayName={tweet.displayName}
        accountName={tweet.accountName}
        content={tweet.content}
      />
    );
  });

  return <Box className="timeline">{tweetList}</Box>;
};
