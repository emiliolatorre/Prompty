import React from "react";
import { Link } from "react-router-dom";

const SavedChats = ({ dataItem }) => {
  const title = dataItem.title
  const chat = dataItem.chat
  const id = dataItem._id

  // FUNCIONES

  const data = {
    title: title,
    chat: chat,
    id: id,
    source: 'SavedChats'
  }

  // RETURN
  return <Link className="link-no-underline" to={'/chat'} state={data}>
    <button className="btnUserChat">{title} </button>
  </Link>
};

export default SavedChats;