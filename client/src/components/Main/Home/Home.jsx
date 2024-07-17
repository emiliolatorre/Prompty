import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Filter from "./Filter";
import PromptList from "./PromptList";
import { PromptsContext } from '../../../context/PromptsContext';
import { SeederContext } from '../../../context/SeederContext';
import axios from 'axios';


const Home = () => {
  const navigate = useNavigate();

  //ESTADO
  const [message, setMessage] = useState([]);
  console.log(message)

  //CONTEXTOS
  const { prompts, updatePrompts } = useContext(PromptsContext);
  const { seeder, updateSeeder } = useContext(SeederContext);
  console.log(prompts)
  console.log(seeder)

  //FUNCIONES
  const resetPrompts = () => {
    updatePrompts('')
  }


  useEffect(() => {
    const getSeeder = async () => {
      try {
        const resp = await axios.get('http://localhost:3000/api/prompts');
        const jsonSeeder = resp.data;

        // LE PASAMOS pokemons AL PADRE Home
        setMessage(jsonSeeder);
        updateSeeder(true);
      } catch (error) {
        setMessage([])
      }
    }
    getSeeder();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const customSearch = e.target.name.value.trim();

    let shortenedTitle = customSearch.split(" ").slice(0, 3).join(" ");
    if (customSearch.split(" ").length > 3) {
      shortenedTitle += "...";
    }
    
    // const dataItem = 

    navigate('/chat', { state: {
      title: shortenedTitle,
      question: customSearch
    } });
    e.target.reset();
  };


  //RETURN

  return <section className="home">
    <div className="divBtnReset">
      <button onClick={resetPrompts} className="btnReset"><img className="iconReset" src="/icons8-cita-recurrente-64.png" alt="reset" /></button>
    </div>
    <Filter message={message}/>
    {prompts.length === 0 ? <PromptList message={message} /> : <PromptList />}

    <form onSubmit={handleSubmit} className="formCustomPrompt">
      <p>Custom Search</p>
      <input type="text" name="name"/>
      <button type="submit"><img className="searchIcon" src="/icons8-búsqueda-64.png" alt="search" /></button>
    </form>

  </section>;
};

export default Home;