import { useCallback, useRef } from "react";
import { tweetProps } from "../Tweet";
import { Box, Button, TextField } from "@mui/material";

export type tweetInputProps = {
  addTweet: (tweet: tweetProps) => void;
};

export const TweetInput = ({ addTweet }: tweetInputProps): JSX.Element => {
  //要素にアクセスするための参照を取得
  // ref.currentのデフォルト値はnullにしておく
  // 参照したい要素にJSXの方でこのrefをセットしてする
  const textareaRef = useRef<HTMLInputElement>(null);

  const sendTweet = useCallback(() => {
    if (textareaRef.current) {
      console.log(textareaRef);
      addTweet({
        id: new Date().getTime(),
        icon: "☠",
        displayName: "ミスター死",
        accountName: "mrdeath",
        content: textareaRef.current.value,
      });
    }
  }, [addTweet]);

  return (
    <Box>
      <Box>
        <TextField
          className="tweet-textarea"
          inputRef={textareaRef}
          rows={4}
          multiline
        />
      </Box>
      <Box>
        <Button className="send-tweet" variant="outlined" onClick={sendTweet}>
          Tweet
        </Button>
      </Box>
    </Box>
  );
};
