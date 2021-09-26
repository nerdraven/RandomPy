import React, { FC, useEffect, useState } from "react";
import { sendMessage, subscribe } from "../../../listener";

import "./index.css";

const Form: FC = () => {
  const [userName, setUserName] = useState("");
  const [mainCode, setMainCode] = useState("");
  const [title, setTitle] = useState("Help");

  useEffect(() => {
    subscribe("message", (data) => {
      setTitle(data.data);
    });
  }, [title]);

  return (
    <div>
      <p>{title}</p>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" value={userName} onChange={(e) => {
        setUserName(e.target.value);
      }} />
      <label htmlFor="maincode">MainCode</label>
      <input type="text" name="username" value={mainCode} onChange={(e) => {
        setMainCode(e.target.value);
      }} />
      <input type="submit" onClick={() => {
        console.log("Data");
        sendMessage(JSON.stringify({ type: "CONNECT", message: { mainCode, userName } }));
      }} />
    </div>
  );
};

export default Form;