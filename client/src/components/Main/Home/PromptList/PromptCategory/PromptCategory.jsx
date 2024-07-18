import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import PromptCard from "./PromptCard";

const PromptCategory = ({dataItem}) => {

  // ESTADO
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  //FUNCTION

  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  const hideInfo = (e) => {
    if (e.target.matches('.info-btn')) {
      return;
    }
    setIsInfoVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', hideInfo);
    return () => {
      document.removeEventListener('click', hideInfo);
    };
  }, []);



  const category = dataItem.category;
  const desc = dataItem.desc;
  const prompts = dataItem.prompts;
  const questions = [];
  prompts.forEach(prompt => questions.push({title: prompt.title, question: prompt.question}))
  console.log(prompts)
  console.log(questions)

  return <article className="category-container">
    <div className="categoryData-container">
    <h2 className="categoryTitle">{category}</h2>
    <button className="info-btn" onClick={toggleInfo}><img className="questionIcon" src="/question.png" alt="more information" /></button>
    {isInfoVisible && (
      <div className="categoryP-container">
    <p className="categoryP">{desc}</p></div>)}
    </div>
    <div className="prompt-div">
    {questions.map((item, i) =>
      <PromptCard key={uuidv4()} dataItem={item} />
    )}
    </div>
    {/* <p className="titleCard"><Link to={`/pokemon/${dataItem.id}`} state={ dataItem }>{name} ➜</Link></p> */}
</article>
};

export default PromptCategory;
