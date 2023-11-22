import React from 'react';
import { IconContext } from "react-icons";
import { IoPersonCircle } from "react-icons/io5";
import { Outlet } from 'react-router-dom';

const CabecalhoDeslogado = () => {

    return (
        <React.Fragment>
        <nav id="navegacao">
                <div id="primeira-seccao">
                    <div id="usuario-flexbox">
                        <IconContext.Provider value={{ size: "3em", color: "black" }}>
                            <IoPersonCircle />
                        </IconContext.Provider>
                    </div>
                    <a className="item-menu" href='/'>Home</a>
                    <a className="item-menu" href='/registrar'>Criar Conta</a>
                    <a className="item-menu" href='/login'>Acessar Conta</a>
                </div>
            </nav>
            <Outlet/>
        </React.Fragment>
    );
}

export default CabecalhoDeslogado;