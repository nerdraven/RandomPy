import React, { FC, useEffect, useState } from "react";
import { sendMessage, subscribe } from "../../listener";

import "./index.css";

const Form: FC = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("Help");
  useEffect(() => {
    subscribe("message", (data) => {
      setTitle(data.data);
    });
  }, [text]);
  return (
    <div>
      <p>{title}</p>
      <input type="text" value={text} onChange={(e) => {
        setText(e.target.value);
      }} />
      <input type="submit" onClick={() => {
        console.log("Data");
        sendMessage(text);
      }} />
    </div>
  );
};

export default Form;