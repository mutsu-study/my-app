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

export const Tweet = ({
  id,
  icon,
  displayName,
  accountName,
  content,
}: tweetProps): JSX.Element => {
  const [liked, setLiked] = useState(false);

  const toggleLiked = useCallback(() => {
    setLiked(!liked);
  }, [liked]);

  return (
    <Box className="tweet" key={id}>
      <Box className="icon-container">{icon}</Box>
      <Box className="body-container">
        <Box className="status-display">
          <span className="display-name">{displayName}</span>
          <span className="display-name">@{accountName}</span>
        </Box>
        <Box className="content">{content}</Box>
        <Stack>
          <Box className="status-action">
            <IconButton
              aria-label="favorite"
              color={liked ? "primary" : "default"}
              onClick={toggleLiked}
            >
              <Favorite />
            </IconButton>
            <IconButton aria-label="delete">
              <Delete />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
