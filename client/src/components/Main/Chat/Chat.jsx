import { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { Comment } from 'react-loader-spinner';
import { HeaderContext } from '../../../context/HeaderContext';

const Chat = () => {

  const API_KEY = import.meta.env.VITE_OPENAI;

  // ESTADOS
  const [question, setQuestion] = useState(''); // to confirm first prompt reception
  const [conversation, setConversation] = useState([]); // to continously save the conversation
  const [isLoading, setIsLoading] = useState(false); // to control the loader
  const [favorite, setFavorite] = useState(false); // to confirm that the chat is already saved as favorite
  const [savedChatId, setSavedChatId] = useState(null); // to save the chat object_id just created in mongodb

  const { header, updateHeader } = useContext(HeaderContext);

  const location = useLocation();
  const dataItem = location.state;

  // FUNCTIONS

  useEffect(() => {
    if (dataItem) {
      if (dataItem.source === 'SavedChats') {
        setFavorite(true);
        setConversation(dataItem.chat);
        setSavedChatId(dataItem.id);
      } else if (dataItem.question) {
        setQuestion(dataItem.question);
      }
    }
  }, [dataItem]);

  // 1er Fetch OPEN AI API
  useEffect(() => {
    if (!question || favorite) return;

    const getAiResponse = async () => {
      setIsLoading(true);
      let retryCount = 0;
      const maxRetries = 3;
      const retryDelay = 2000; // 2 seconds

      while (retryCount < maxRetries) {
        try {
          const resp = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-3.5-turbo',
              messages: [{ role: 'user', content: question }],
              max_tokens: 150,
              temperature: 0.7,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
              },
            }
          );
          const aiMessage = resp.data.choices[0].message.content.trim();
          console.log(`Open AI response: ${aiMessage}`);

          const interaction = {
            user: question,
            assistant: aiMessage
          }

          setConversation((prevConversation) => {
            if (prevConversation.length === 0) {
              return [interaction];
            }
            return [...prevConversation, interaction];
          });

          setIsLoading(false);
          return; // Exit the retry loop if successful
        } catch (error) {
          console.log('Error:', error);
          retryCount++;
          if (retryCount < maxRetries) {
            console.log(`Retrying (${retryCount + 1}/${maxRetries})...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
          } else {
            console.log('Max retries reached. Request failed.');
          }
        }
      }
    }

    getAiResponse()
  }, [question]);


  // Next Fetch OPEN AI API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = e.target.name.value.trim();

    if (!newQuestion) return;

    // Construimos la cadena de mensajes combinando todas las interacciones anteriores
    let combinedMessages = conversation.flatMap(message => [
      { role: 'user', content: message.user },
      { role: 'assistant', content: message.assistant }
    ]);
    combinedMessages.push({ role: 'user', content: newQuestion });
    console.log(`Context sent to OpenAI ${combinedMessages}`)

    try {
      setIsLoading(true);
      const resp = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: combinedMessages,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
        }
      );

      const aiMessage = resp.data.choices[0].message.content.trim();
      console.log(`Open AI response: ${aiMessage}`);

      const interaction = {
        user: newQuestion,
        assistant: aiMessage
      }

      // Actualizamos la conversación agregando la nueva interacción
      setConversation([...conversation, interaction]);
      setIsLoading(false);

    } catch (error) {
      console.log('Error:', error);
      setIsLoading(false);
    }

    e.target.reset();
  };

  const incrementHeader = () => {
    updateHeader(header + 1);
  };

  // Save as Fav Chat in SQL
  const handleClick = e => {
    postFavoriteChat();
  };

  const postFavoriteChat = async () => {
    try {
      const title = dataItem.title;
      const chat = conversation;
      if (!favorite) {
        const newChat = {
          title: title,
          chat: chat
        }
        const savedChat = await axios.post(`https://prompty-4y5d.onrender.com/api/chats`, newChat);
        console.log(`Saved Chat in MongoDB ${savedChat}`)
        const savedChatId = savedChat.data.items_created._id.toString();

        const newFav = {
          email: 'emilio@gmail.com',
          chat_id: savedChatId

        }
        const savedFavorite = await axios.post(`https://prompty-4y5d.onrender.com/api/favorites`, newFav);
        console.log(`Saved Chat in PostgreSQL ${savedFavorite}`)

        // Update de favorites state
        setFavorite(true);
        setSavedChatId(savedChatId);
        incrementHeader()
        alert('your Chat have been saved!')
      } else {
        const updatedChat = { title, chat };
        console.log(`Updating Chat with ID: ${savedChatId}`);
        const savedChat = await axios.put(`https://prompty-4y5d.onrender.com/api/chats?id=${savedChatId}`, updatedChat);
        console.log(`Updated Chat in MongoDB ${savedChat}`)
        alert('your saved Chat have been updated!')
      }
    }
    catch (error) {
      console.error('Fetch error in Filter by Category', error);
      alert('start your chat to save!')
    }

  }


  // RETURN

return <section className="container-chat">
  <div className="divBtnLike">
    <button className="btnLike" onClick={handleClick}><img className="iconLike" src="/like.png" alt="like" /> Save Chat</button>
  </div>

  {conversation.length === 0 && !isLoading && (
    <div style={{ marginLeft: '66px', marginTop: '10px', marginBottom: '0px' }}>
      <Comment
        visible={true}
        height={50}
        width={50}
        ariaLabel="comment-loading"
        color="#fff"
        backgroundColor="#5e6177"
      />
    </div>
  )}

  {/* Renderizar conversación */}
  <div className="container-conversations">
    {conversation.map((message, index) => (
      <div className="container-conversations" key={index}>
        <p className="chatUser">
          <img className="iconUser" src="/user.png" alt="user" /> {message.user}
        </p>
        <p className="chatAssistant">
          <img className="iconPrompty" src="/prompty.png" alt="prompty" /> {message.assistant}
        </p>
      </div>
    ))}
    {isLoading && (
      <div style={{ marginLeft: '66px', marginTop: '10px', marginBottom: '0px' }}>
        <Comment
          visible={true}
          height={50}
          width={50}
          ariaLabel="comment-loading"
          color="#fff"
          backgroundColor="#5e6177"
        />
      </div>
    )}
  </div>

  <form onSubmit={handleSubmit} className="formCustomPrompt formChat">
    <input type="text" name="name" placeholder="Send a meesage to Prompty" />
    <button type="submit"><img className="sendIcon" src="/send.png" alt="search" /></button>
  </form>

</section>
};

export default Chat;

{/* <button onClick={aiResponse}>Fetch</button> */ }