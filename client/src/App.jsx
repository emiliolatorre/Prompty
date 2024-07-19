import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
// Importamos el contexto
import { PromptsContext } from './context/PromptsContext'
import { SeederContext } from './context/SeederContext'
import { HeaderContext } from './context/HeaderContext'

function App() {

  const [prompts, setPrompts] = useState('');
  const [seeder, setSeeder] = useState(false);
  const [header, setHeader] = useState(0);

  const updatePrompts = (newPrompts) => {
    setPrompts(newPrompts);
  };

  const promptsData = { prompts, updatePrompts }

  const updateSeeder = (firstSeeder) => {
    setSeeder(firstSeeder);
  };

  const seederData = { seeder, updateSeeder }

  const updateHeader = (refreshHeader) => {
    setHeader(refreshHeader);
  };

  const headerData = { header, updateHeader }

  return (
    <>
      <PromptsContext.Provider value={promptsData}>
        <SeederContext.Provider value={seederData}>
          <HeaderContext.Provider value={headerData}>
            <BrowserRouter >
              <Header />
              <Main />
            </BrowserRouter>
          </HeaderContext.Provider>
        </SeederContext.Provider>
      </PromptsContext.Provider>
    </>
  )
}

export default App
