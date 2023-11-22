import React from "react";
import { estaAutenticado, usuarioPossuiPermissao } from "../auth";
import CabecalhoLogado from "./CabecalhoLogado";
import CabecalhoDeslogado from "./CabecalhoDeslogado";

const Layout = () => {

    let loginLogout = estaAutenticado() ? (
        <React.Fragment>
            <CabecalhoLogado/>
        </React.Fragment>
    ) : (
        <React.Fragment>
            <CabecalhoDeslogado/>
        </React.Fragment>
    );

    const cadastrarAdmin = usuarioPossuiPermissao('Admin') ? (
        <a className="dropdown-item" href="/registrar/admin">Criar Usuário Admin</a>
    ) : null;

    return (
        <React.Fragment>
            {loginLogout}
            {cadastrarAdmin}
        </React.Fragment>
    );
};
export default Layout;
