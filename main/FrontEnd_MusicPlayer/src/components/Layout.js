import React, {useState, createContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { estaAutenticado, logout, nomeUsuarioLogado, usuarioPossuiPermissao } from "../auth";

const Layout = () => {
    const navigate = useNavigate();

    const sair = () => {
        logout();
        
        navigate('/');
    };

    let loginLogout = estaAutenticado() ? (
        <li className="nav-item">
            <button className="nav-link btn" onClick={sair}>Logout</button>
        </li>
    ) : (
        <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
        </li>
    );

    const nomeUsuario = nomeUsuarioLogado();
    
    const usuarioIdentificacao = nomeUsuario ? <p className="mt-2">{nomeUsuario}</p> : null;

    const cadastrarAdmin = usuarioPossuiPermissao('Admin') ? (
        <a className="dropdown-item" href="/registrar/admin">Criar Usuário Admin</a>
    ) : null;

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto d-flex align-items-center">
      <li className="nav-item active">
        <a className="nav-link" href="/">Home</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Cadastros
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/comum">Comum</a><p></p>
          <a className="dropdown-item" href="/administrador">Administrador</a>
          {cadastrarAdmin}
        </div>
      </li>
      {usuarioIdentificacao}
      {loginLogout}
    </ul>
  </div>
</nav>
  
            <Outlet />
        </React.Fragment>
    );
};
export default Layout;
