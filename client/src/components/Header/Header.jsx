import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import SavedChats from "./SavedChats";
import Nav from "./Nav";
import { HeaderContext } from '../../context/HeaderContext';

const Header = () => {
  // ESTADOS
  const [userChats, setUserChats] = useState('');
  const { header, updateHeader } = useContext(HeaderContext);


  // FUNCIONES
  useEffect(() => {
    const getSavedChats = async () => {
      try {
        const email = 'emilio@gmail.com'
        const resp = await axios.get(`https://prompty-4y5d.onrender.com/api/favorites?email=${email}`);
        const chatsIds = resp.data;

        const chatPromises = chatsIds.map(async (chat) => {
          const chatId = chat.chat_id;
          const savedChat = await axios.get(`https://prompty-4y5d.onrender.com/api/chats?id=${chatId}`);
          return savedChat.data[0];
        });
  
        // Esperar a que todas las promesas se resuelvan
        const savedChats = await Promise.all(chatPromises);
  
        setUserChats(savedChats)

        

      } catch (error) {
        console.error(error)
      }
    }
    getSavedChats();
  }, [header]);

  useEffect(() => {
    const checkbox = document.getElementById('menu');
    const header = document.querySelector('.header');

    const toggleHeaderBackground = () => {
        if (checkbox.checked) {
            header.classList.add('open');
        } else {
            header.classList.remove('open');
        }
    };

    checkbox.addEventListener('change', toggleHeaderBackground);
    return () => checkbox.removeEventListener('change', toggleHeaderBackground);
}, []);


  // RETURN
  return <header className="header">
    <input type="checkbox" id="menu" />
    <label htmlFor="menu"><img className="iconBurguer" src="/burguer.png" alt="burger" width="25px" /></label>
    <section className="promptsHeader-container">
      <Link to="/chat" className='link-no-underline'>
      <button className="btnNewChat">+ New chat</button>
      </Link>
      {userChats? userChats.slice(0, 7).map((item, i) =>
      <SavedChats key={uuidv4()} dataItem={item} />
    ) : null}
    </section>
  <Nav />
</header>;
};

export default Header;
