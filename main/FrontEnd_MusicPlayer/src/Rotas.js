import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Musica from "./components/Musica/Musica";
import Playlist from "./components/Playlist/Playlist";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from './components/Login';
import Registrar from "./components/Registrar";
import Player from "./components/Player";
import PlaylistCadastroMusicas from "./components/Playlist/PlaylistCadastroMusicas";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
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
            <Route path=":playlistaddmusica/:id" element={<PlaylistCadastroMusicas />} />
          </Route>
          <Route path="player" element={<Player />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
