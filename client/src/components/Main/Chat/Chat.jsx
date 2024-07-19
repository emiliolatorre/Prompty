import { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { Comment } from 'react-loader-spinner';

const Chat = () => {

  const API_KEY = import.meta.env.VITE_OPENAI;
  console.log(API_KEY);

  // ESTADOS
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(question)

  const location = useLocation();
  const dataItem = location.state;
  console.log(dataItem)

  // FUNCTIONS

  useEffect(() => {
    if (dataItem && dataItem.question) {
      setQuestion(dataItem.question);
    }
  }, [dataItem]);

  // Fetch OPEN AI API
  useEffect(() => {
    if (!question) return;

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
          console.log(aiMessage);

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

  console.log(conversation)

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
    console.log(combinedMessages)

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
      console.log(aiMessage);

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



  return <section className="container-chat">

{conversation.length === 0 && !isLoading && (
  <div style={{ marginLeft: '105px', marginTop: '10px', marginBottom: '0px' }}>
      <Comment
        visible={true}
        height={50}
        width={50}
        ariaLabel="comment-loading"
        color="#fff"
        backgroundColor="#5e6177"
        style={{ marginLeft: '200px' }}
      />
      </div>
    )}

    {/* Renderizar conversación */}
    <div>
      {conversation.map((message, index) => (
        <div key={index}>
          <p className="chatUser">
            <img className="iconUser" src="/user.png" alt="user" /> {message.user}
          </p>
          <p className="chatAssistant">
            <img className="iconPrompty" src="/prompty.png" alt="prompty" /> {message.assistant}
          </p>
        </div>
      ))}
      {isLoading && (
        <div style={{ marginLeft: '105px', marginTop: '10px', marginBottom: '0px' }}>
        <Comment
          visible={true}
          height={50}
          width={50}
          ariaLabel="comment-loading"
          color="#fff"
          backgroundColor="#5e6177"
          style={{ marginRight: '20px' }}
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