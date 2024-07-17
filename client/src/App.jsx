import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
// Importamos el contexto
import { PromptsContext } from './context/PromptsContext'
import { SeederContext } from './context/SeederContext'

function App() {

  const [prompts, setPrompts] = useState('');
  const [seeder, setSeeder] = useState(false);

  const updatePrompts = (newPrompts) => {
    setPrompts(newPrompts);
  };

  const promptsData = { prompts, updatePrompts }

  const updateSeeder = (firstSeeder) => {
    setSeeder(firstSeeder);
  };

  const seederData = { seeder, updateSeeder }

  return (
    <>
    <PromptsContext.Provider value={promptsData}>
    <SeederContext.Provider value={seederData}>
    <BrowserRouter >
        <Header />
        <Main />
      </BrowserRouter>
      </SeederContext.Provider>
      </PromptsContext.Provider>
    </>
  )
}

export default App
