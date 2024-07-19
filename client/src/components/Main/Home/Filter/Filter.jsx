import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { PromptsContext } from '../../../../context/PromptsContext';

const Filter = ({ message }) => {
  // ESTADOS
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [keyword, setKeyword] = useState('');

  // CONTEXTOS
  const { prompts, updatePrompts } = useContext(PromptsContext);

  // FUNCIONES

  // USEFECT formCategory
  useEffect(() => {
    const getPromptsByCategory = async () => {
      if (selectedCategories.length > 0) {
        try {
          const newPrompts = [];
  
          // Iterar sobre cada categoría seleccionada
          for (const eachCategory of selectedCategories) {
            const response = await axios.get(`http://localhost:3000/api/prompts?category=${eachCategory}`);
            newPrompts.push(...response.data);
          }
  
          // Actualizar el estado de prompts con todos los nuevos prompts obtenidos
          updatePrompts(newPrompts);
        } catch (error) {
          console.error('Fetch error in Filter by Category', error);
        }
      } else {
        updatePrompts([]);
      }
    };
  
    getPromptsByCategory();
  }, [selectedCategories]);

  const handleChange = (e) => {
    const options = e.target.options;
    const values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setSelectedCategories(values);
  };


    // USEFECT formKeyword
    useEffect(() => {
      const getPromptsByKeyword = async () => {
        if (keyword.trim() !== '') {
          try {
            const newKeyword = await axios.get(`http://localhost:3000/api/prompts/keyword?keyword=${keyword}`);
            const newKeywordData = newKeyword.data
    
            // Actualizar el estado de prompts con todos los nuevos prompts obtenidos
            updatePrompts(newKeywordData);
          } catch (error) {
            console.error('Fetch error in Filter by Category', error);
          }
        } else {
          updatePrompts([]);
        }
      };
    
      getPromptsByKeyword();
    }, [keyword]);

  // aqui guardamos
  const handleSubmit = e => {
    e.preventDefault();
    const searchKeyword = e.target.name.value;
    setKeyword(searchKeyword);
    e.target.reset();
  };


  // RETURN
  return <section className="section-filter">

    <form className="formCategory">
      <select multiple={true} name="multiplecategory" onChange={handleChange}>
      <option disabled value="">Select a category</option>
        {message.map(prompt => (
          <option key={prompt.category} value={prompt.category}>{prompt.category}</option>
        ))}
      </select>
    </form>

    <form onSubmit={handleSubmit} className="formKeyword">
      <input type="text" name="name" placeholder="Search by keyword..." />
      <button type="submit"><img className="sendIcon" src="/send.png" alt="search" /></button>
    </form>

  </section>
};

export default Filter;
