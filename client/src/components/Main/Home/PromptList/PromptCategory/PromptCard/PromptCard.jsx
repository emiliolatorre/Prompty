import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const PromptCard = ({dataItem}) => {
  console.log(dataItem)
  return <div className="promptCard">
    <Link to={'/chat'} state={ dataItem }>
    <p>{dataItem.question}</p>
    </Link>
  </div>
};

export default PromptCard;
