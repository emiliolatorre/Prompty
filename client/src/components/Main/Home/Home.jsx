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

  //CONTEXTOS
  const { prompts, updatePrompts } = useContext(PromptsContext);
  const { seeder, updateSeeder } = useContext(SeederContext);

  //FUNCIONES
  const resetPrompts = () => {
    updatePrompts('')
  }


  useEffect(() => {
    const getSeeder = async () => {
      try {
        const resp = await axios.get('https://prompty-4y5d.onrender.com/api/prompts');
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

    navigate('/chat', { state: {
      title: shortenedTitle,
      question: customSearch
    } });
    e.target.reset();
  };


  //RETURN

  return <section className="home">
    <div className="divBtnReset">
      <button onClick={resetPrompts} className="btnReset"><img className="iconReset" src="/refresh.png" alt="reset" /></button>
    </div>
    <Filter message={message}/>
    {prompts.length === 0 ? <PromptList message={message} /> : <PromptList />}

    <form onSubmit={handleSubmit} className="formCustomPrompt">
      <h2 className="categoryTitle">Custom Search</h2>
      <input type="text" name="name" placeholder="Send a meesage to Prompty..."/>
      <button type="submit"><img className="sendIcon" src="/send.png" alt="search" /></button>
    </form>

  </section>;
};

export default Home;