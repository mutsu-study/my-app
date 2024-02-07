import { useCallback, useRef } from "react";
import { tweetProps } from "../Tweet";

export type tweetInputProps = {
  addTweet: (tweet: tweetProps) => void;
};

export const TweetInput = ({ addTweet }: tweetInputProps): JSX.Element => {
  //要素にアクセスするための参照を取得
  // ref.currentのデフォルト値はnullにしておく
  // 参照したい要素にJSXの方でこのrefをセットしてする
  const textareaRef = useRef(null);

  const sendTweet = useCallback(() => {
    if (textareaRef.current) {
      addTweet({
        id: new Date().getTime(),
        icon: "☠",
        displayName: "ミスター死",
        accountName: "mrdeath",
        content: textareaRef.current,
      });
    }
  }, [addTweet]);

  return (
    <div>
      <div>
        <textarea className="tweet-textarea" ref={textareaRef}></textarea>
      </div>
      <div>
        <button onClick={sendTweet} className="send-tweet">
          Tweet
        </button>
      </div>
    </div>
  );
};
