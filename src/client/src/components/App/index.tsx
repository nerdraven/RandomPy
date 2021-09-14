import React, { FC } from "react";

import "./index.css";

import Logo from "../Logo";
import Form from "../Form";
// import Game from "../Game";


const Hello: FC = () => {

  return (
    <div className="container">
      <div className="main">
        <Logo />
        <Form />
      </div>
    </div>
  );
};

export default Hello;
