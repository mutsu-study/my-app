import { useCallback, useRef, useState } from "react";
import { tweetProps } from "../TweetContent";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Send } from "@mui/icons-material";

export type tweetInputProps = {
  addTweet: (tweet: tweetProps) => void;
};

export type Icon = {
  iconId: string;
  displayIcon: string;
};

export const TweetInput = ({ addTweet }: tweetInputProps): JSX.Element => {
  const { handleSubmit, reset, register } = useForm<tweetProps>({
    defaultValues: {
      displayName: "",
      accountName: "",
      content: "",
    },
  });

  const iconList: Icon[] = [
    {
      iconId: "shrimp",
      displayIcon: "🦐",
    },
    {
      iconId: "skull",
      displayIcon: "☠",
    },
    {
      iconId: "corn",
      displayIcon: "🌽",
    },
    {
      iconId: "bike",
      displayIcon: "🏍",
    },
    {
      iconId: "car",
      displayIcon: "🚗",
    },
  ];

  const [icon, setIcon] = useState("");

  //要素にアクセスするための参照を取得
  // ref.currentのデフォルト値はnullにしておく
  // 参照したい要素にJSXの方でこのrefをセットしてする
  const displayNameRef = useRef<HTMLInputElement>(null);
  const accontNameRef = useRef<HTMLInputElement>(null);
  const tweetRef = useRef<HTMLInputElement>(null);

  const sendTweet = useCallback(() => {
    if (tweetRef.current) {
      addTweet({
        id: new Date().getTime(),
        icon: icon,
        displayName: displayNameRef.current?.value ?? "",
        accountName: accontNameRef.current?.value ?? "",
        content: tweetRef.current.value,
      });
      setIcon("");
      reset();
    }
  }, [addTweet, icon, reset]);

  const handleSelectIcon = useCallback((event: SelectChangeEvent) => {
    setIcon(event.target.value);
  }, []);

  return (
    <Box>
      <Stack>
        <form onSubmit={handleSubmit(sendTweet)}>
          <Stack>
            <Grid container>
              <Grid item xs={2}>
                <Box sx={{ mr: 1 }}>
                  <FormControl className="iconSelect" variant="filled">
                    <InputLabel className="iconSelect">icon</InputLabel>
                    <Select
                      {...register("icon")}
                      sx={{ mr: 1 }}
                      value={icon}
                      onChange={handleSelectIcon}
                    >
                      {iconList.map((icon) => (
                        <MenuItem key={icon.iconId} value={icon.displayIcon}>
                          {icon.displayIcon}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={3} className="displayName" sx={{ mr: 2 }}>
                <Box className="displayName">
                  <TextField
                    {...register("displayName")}
                    label="displayName"
                    variant="filled"
                    inputRef={displayNameRef}
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="accountName" sx={{ mr: 2 }}>
                  <TextField
                    {...register("accountName")}
                    label="accontName"
                    variant="filled"
                    inputRef={accontNameRef}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">@</InputAdornment>
                      ),
                    }}
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Stack>
          <Box>
            <TextField
              {...register("content")}
              className="tweet-textarea"
              rows={4}
              multiline
              inputRef={tweetRef}
              sx={{ mt: 1 }}
            />
          </Box>
        </form>
        <Box>
          <Button
            className="send-tweet"
            variant="outlined"
            sx={{ mt: 1, mb: 1 }}
            onClick={sendTweet}
            endIcon={<Send />}
          >
            Tweet
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
