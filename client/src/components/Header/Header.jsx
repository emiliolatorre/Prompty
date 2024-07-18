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
        const resp = await axios.get(`http://localhost:3000/api/favorites?email=${email}`);
        const chatsIds = resp.data;
        console.log(resp)
        console.log(chatsIds)

        const chatPromises = chatsIds.map(async (chat) => {
          const chatId = chat.chat_id;
          const savedChat = await axios.get(`http://localhost:3000/api/chats?id=${chatId}`);
          return savedChat.data[0];
        });
  
        // Esperar a que todas las promesas se resuelvan
        const savedChats = await Promise.all(chatPromises);
  
        console.log(savedChats);
        setUserChats(savedChats)

        

      } catch (error) {
        console.error(error)
      }
    }
    getSavedChats();
  }, [header]);

  console.log(userChats)




  // RETURN
  return <header className="header">
    <section className="promptsHeader-container">
      <Link to="/chat" className='link-no-underline'>
      <button className="btnNewChat">+ New chat</button>
      </Link>
      {userChats? userChats.slice(0, 8).map((item, i) =>
      <SavedChats key={uuidv4()} dataItem={item} />
    ) : null}
    </section>
  <Nav />
</header>;
};

export default Header;
