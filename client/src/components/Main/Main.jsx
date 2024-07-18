import React from "react";
import { Route, Routes, Navigate, Link } from 'react-router-dom'
import Home from './Home'
import Chat from './Chat'
import Login from './Login'
import Register from './Register'

const Main = () => {
  return <main className="main">
    <Link className="link-no-underline" to={'/'}>
    <h1 className="h1-prompty"><img className="iconPromptyH1" src="/prompty2.png" alt="prompty" /> Prompty</h1>
    </Link>

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