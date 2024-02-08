import { useCallback, useRef } from "react";
import { tweetProps } from "../Tweet";
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export type tweetInputProps = {
  addTweet: (tweet: tweetProps) => void;
};

export const TweetInput = ({ addTweet }: tweetInputProps): JSX.Element => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {},
  });

  //要素にアクセスするための参照を取得
  // ref.currentのデフォルト値はnullにしておく
  // 参照したい要素にJSXの方でこのrefをセットしてする
  const displayNameRef = useRef<HTMLInputElement>(null);
  const accontNameRef = useRef<HTMLInputElement>(null);
  const tweetRef = useRef<HTMLInputElement>(null);

  const sendTweet = useCallback(() => {
    if (tweetRef.current) {
      console.log(tweetRef);
      addTweet({
        id: new Date().getTime(),
        icon: "☠",
        displayName: displayNameRef.current?.value ?? "",
        accountName: accontNameRef.current?.value ?? "",
        content: tweetRef.current.value,
      });
    }
  }, [addTweet]);

  return (
    <Box>
      <form onSubmit={handleSubmit(sendTweet)}>
        <Stack>
          <Box>
            <TextField
              label="displayName"
              variant="filled"
              inputRef={displayNameRef}
              sx={{
                mr: 1,
              }}
            />
            <TextField
              label="accontName"
              variant="filled"
              inputRef={accontNameRef}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">@</InputAdornment>
                ),
              }}
              sx={{ mr: 1 }}
            />
          </Box>
        </Stack>
        <Box>
          <TextField
            className="tweet-textarea"
            rows={4}
            multiline
            inputRef={tweetRef}
            sx={{ mt: 1 }}
          />
        </Box>
        <Box>
          <Button
            className="send-tweet"
            variant="outlined"
            sx={{ mt: 1, mb: 1 }}
            onClick={sendTweet}
          >
            Tweet
          </Button>
        </Box>
      </form>
    </Box>
  );
};
