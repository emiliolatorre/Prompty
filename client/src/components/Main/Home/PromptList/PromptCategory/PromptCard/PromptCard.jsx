import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const PromptCard = ({dataItem}) => {
  console.log(dataItem)
  return <div className="promptCard">
    <Link className="link-no-underline" to={'/chat'} state={ dataItem }>
    <p className="cardP">{dataItem.question}</p>
    </Link>
  </div>
};

export default PromptCard;
