import { Box } from "@mui/material";
import { useCallback, useState } from "react";

export type tweetProps = {
  id: number;
  icon: string;
  displayName: string;
  accountName: string;
  content: string;
};

export const Tweet = ({
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
    <Box className="tweet">
      <Box className="icon-container">{icon}</Box>
      <Box className="body-container">
        <Box className="status-display">
          <span className="display-name">{displayName}</span>
          <span className="display-name">@{accountName}</span>
        </Box>
        <Box className="content">{content}</Box>
        <Box className="status-action">
          <span onClick={toggleLiked}>{liked ? "♥" : "♡"}</span>
        </Box>
      </Box>
    </Box>
  );
};
