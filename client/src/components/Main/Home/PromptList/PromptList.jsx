import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import PromptCategory from "./PromptCategory";
import { Comment } from 'react-loader-spinner';
import { PromptsContext } from '../../../../context/PromptsContext';


const PromptList = ({ message = 0 }) => {
  console.log(message)

  const { prompts = [] } = useContext(PromptsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí puedes actualizar el estado de carga cuando se reciben los datos
    if (message.length !== 0 || prompts.length !== 0) {
      setLoading(false);
    }
  }, [message, prompts]);

  //FUNCIONES

const renderPromptCategories = () => {
      if (prompts.length === 0 ) {
        return message.map((item, i) =>
      <PromptCategory key={uuidv4()} dataItem={item} />
    );
  } else {
    return prompts.map((item, i) =>
      <PromptCategory key={uuidv4()} dataItem={item}/>
    );
  }
    }

  return <section className="promptList">
    {!loading ? renderPromptCategories() : <Comment
  visible={true}
  height="80"
  width="80"
  ariaLabel="comment-loading"
  wrapperStyle={{}}
  wrapperClass="comment-wrapper"
  color="#fff"
  backgroundColor="#F4442E"
  />}
    </section>;
};

export default PromptList;
