import { useCallback, useRef, useState } from "react";
import { tweetProps } from "../TweetContent";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<tweetProps>({
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
                      {...register("icon", { required: true })}
                      error={!!errors.icon}
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
                    {!!errors.icon ? (
                      <FormHelperText error>
                        {"アイコンを選択してください。"}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={3} className="displayName" sx={{ mr: 2 }}>
                <Box className="displayName">
                  <TextField
                    {...register("displayName", { required: true })}
                    error={!!errors.displayName}
                    label="displayName"
                    variant="filled"
                    inputRef={displayNameRef}
                    helperText={
                      !!errors.displayName && "表示名を入力してください。"
                    }
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="accountName" sx={{ mr: 2 }}>
                  <TextField
                    {...register("accountName", {
                      pattern: {
                        value: /[A-Za-z]+/,
                        message: "形式が不正です。",
                      },
                      required: {
                        value: true,
                        message: "アカウント名を入力してください。",
                      },
                    })}
                    error={!!errors.accountName}
                    label="accontName"
                    variant="filled"
                    inputRef={accontNameRef}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position="start">@</InputAdornment>
                      ),
                    }}
                    helperText={
                      !!errors.accountName && (
                        <p>{errors.accountName.message}</p>
                      )
                    }
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

          <Box>
            <Button
              className="send-tweet"
              variant="outlined"
              type="submit"
              sx={{ mt: 1, mb: 1 }}
              endIcon={<Send />}
            >
              Tweet
            </Button>
          </Box>
        </form>
      </Stack>
    </Box>
  );
};
