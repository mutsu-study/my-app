import { Box } from "@mui/material";
import { TweetContent, tweetProps } from "./TweetContent";

export type timelineProps = {
  tweets: tweetProps[];
  handleDeleteTweet: (id: number) => void;
};

export const Timeline = ({
  tweets,
  handleDeleteTweet,
}: timelineProps): JSX.Element => {
  return (
    <Box className="timeline">
      {tweets
        ? tweets.map((tweet) => {
            return (
              <TweetContent
                tweet={tweet}
                key={tweet.id}
                handleDeleteTweet={handleDeleteTweet}
              />
            );
          })
        : null}
    </Box>
  );
};
