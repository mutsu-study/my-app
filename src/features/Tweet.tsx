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
    <div className="tweet">
      <div className="icon-container">{icon}</div>
      <div className="body-container">
        <div className="status-display">
          <span className="display-name">{displayName}</span>
          <span className="display-name">@{accountName}</span>
        </div>
        <div className="content">{content}</div>
        <div className="status-action">
          <span onClick={toggleLiked}>{liked ? "♥" : "♡"}</span>
        </div>
      </div>
    </div>
  );
};
