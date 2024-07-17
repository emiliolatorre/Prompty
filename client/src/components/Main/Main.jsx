import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './Home'
import Chat from './Chat'
import Login from './Login'
import Register from './Register'

const Main = () => {
  return <main className="main">
    <h1>Prompty</h1>

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chat/' element={<Chat />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/*' element={<Navigate to={'/'} />} />

    </Routes>

  </main>;
};

export default Main;
