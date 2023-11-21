import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Comum from "./components/Comum";
import Administrador from "./components/Administrador";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from './components/Login';
import Registrar from "./components/Registrar";
import Player from "./components/Player";

const Rotas = () => {
    return (<BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />}/>
      
      <Route path='registrar' element={<Registrar />}>
        <Route path=':acao' element={<Registrar />} />
      </Route>
      
      <Route path='comum' element={<Comum />}>
        <Route path=':acao' element={<Comum />} />
        <Route path=':acao/:id' element={<Comum />} />
        <Route path='player' element={<Player/>} />
      </Route>

      <Route path='administrador' element={<Administrador />}>
        <Route path=':acao' element={<Administrador />} />
        <Route path=':acao/:id' element={<Administrador />} />
      </Route>

      </Route>
    </Routes>
  </BrowserRouter>);
};

export default Rotas;
