import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
  const location = useLocation();
  const dataItem = location.state;
  console.log(dataItem)
  return <section className="container-chat">
    <p>{dataItem.question}</p>
    <p>respuesta chatgpt</p>
  </section>
};

export default Chat;