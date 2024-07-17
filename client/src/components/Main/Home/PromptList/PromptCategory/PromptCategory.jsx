import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import PromptCard from "./PromptCard";

const PromptCategory = ({dataItem}) => {

  const category = dataItem.category;
  const desc = dataItem.desc;
  const prompts = dataItem.prompts;
  const questions = [];
  prompts.forEach(prompt => questions.push({title: prompt.title, question: prompt.question}))
  console.log(prompts)
  console.log(questions)

  return <article className="category-container">
    <h2>{category}</h2>
    <p>{desc}</p>
    <div className="prompt-div">
    {questions.map((item, i) =>
      <PromptCard key={uuidv4()} dataItem={item} />
    )}
    </div>
    {/* <p className="titleCard"><Link to={`/pokemon/${dataItem.id}`} state={ dataItem }>{name} ➜</Link></p> */}
</article>
};

export default PromptCategory;
