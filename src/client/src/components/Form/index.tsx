import React, { FC, useEffect, useState } from "react";
import { sendMessage, subscribe } from "../../listener";

import "./index.css";

const Form: FC = () => {
  const [userName, setUserName] = useState("");
  const [mainCode, setMainCode] = useState("");
  const [show, setShow] = useState(true);
  const [title, setTitle] = useState("Help");

  useEffect(() => {
    subscribe("message", (data) => {
      setTitle(data.data);
    });

    subscribe("ready", () => {
      setShow(false);
    });
  }, [title]);

  if (show) {
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
          sendMessage(JSON.stringify({ type: "CONNECT", message: { mainCode, userName } }));
        }} />
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }

};

export default Form;