import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Musica from "./components/Musica";
import Playlist from "./components/Playlist";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from './components/Login';
import Registrar from "./components/Registrar";
import Player from "./components/Player";

const Rotas = () => {
<<<<<<< Updated upstream
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
=======
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />}></Route>
          <Route path='registrar' element={<Registrar />}>
            <Route path=':acao' element={<Registrar />} />
          </Route>
          <Route path='musica' element={<Musica />}>
            <Route path=':acao' element={<Musica />} />
            <Route path=':acao/:id' element={<Musica />} />
          </Route>
          <Route path='playlist' element={<Playlist />}>
            <Route path=':acao' element={<Playlist />} />
            <Route path=':acao/:id' element={<Playlist />} />
          </Route>
          <Route path="player" element={<Player />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
>>>>>>> Stashed changes
};

export default Rotas;
