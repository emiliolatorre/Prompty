import React from "react";

const SavedChats = ({dataItem} ) => {
  const title = dataItem.title
  console.log(title)
  return <button className="btnUserChat">{title} </button>;
};

export default SavedChats;
