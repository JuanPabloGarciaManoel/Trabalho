import React from 'react';
import { IconContext } from "react-icons";
import { MdExitToApp } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { logout, nomeUsuarioLogado } from '../auth';
import { Outlet, useNavigate } from 'react-router-dom';

const CabecalhoLogado = () => {

    const nomeUsuario = nomeUsuarioLogado();

    const usuarioIdentificacao = nomeUsuario ? <p>{nomeUsuario}</p> : null;

    const navigate = useNavigate();

    const sair = () => {

        logout();

        navigate('/');
    };

    return (
        <React.Fragment>
        <nav id="navegacao">
                <div id="primeira-seccao">
                    <div id="usuario-flexbox">
                        <IconContext.Provider value={{ size: "3em", color: "black" }}>
                            <IoPersonCircle />
                        </IconContext.Provider>{usuarioIdentificacao}
                    </div>
                    <a className="item-menu" href='/'>Home</a>
                    <a className="item-menu" href='/musica'>Músicas</a>
                    <a className="item-menu" href='/playlist'>Playlists</a>
                    <a className="item-menu" href='/player'>Player</a>
                </div>
                <div id="segunda-seccao">
                    <button id="botaoSair" onClick={sair}>
                        <IconContext.Provider value={{ size: "3em", color: "black" }}>
                            <MdExitToApp />
                        </IconContext.Provider>
                    </button>
                    <p id="sair">Sair</p>
                </div>
            </nav>
            <Outlet/>
        </React.Fragment>
    );
}

export default CabecalhoLogado;