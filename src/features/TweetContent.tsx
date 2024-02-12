import { Box, IconButton, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { Delete, Favorite } from "@mui/icons-material";

export type tweetProps = {
  id: number;
  icon: string;
  displayName: string;
  accountName: string;
  content: string;
};

type tweetContentProps = {
  tweet: tweetProps;
  key: number;
  handleDeleteTweet: (id: number) => void;
};

export const TweetContent = ({
  tweet,
  handleDeleteTweet,
}: tweetContentProps): JSX.Element => {
  const [liked, setLiked] = useState(false);

  const toggleLiked = useCallback(() => {
    setLiked(!liked);
  }, [liked]);

  return (
    <Box className="tweet" key={tweet.id}>
      <Box className="icon-container">{tweet.icon}</Box>
      <Box className="body-container">
        <Box className="status-display">
          <span className="display-name">{tweet.displayName}</span>
          <span className="display-name">@{tweet.accountName}</span>
        </Box>
        <Box className="content">{tweet.content}</Box>
        <Stack>
          <Box className="status-action">
            <IconButton
              aria-label="favorite"
              color={liked ? "primary" : "default"}
              onClick={toggleLiked}
            >
              <Favorite />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteTweet(tweet.id)}
            >
              <Delete />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
