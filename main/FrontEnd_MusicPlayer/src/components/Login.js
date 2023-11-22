import React, { useState } from 'react';
import { useQuery } from '../useQuery';
import { useNavigate} from 'react-router-dom';
import { login } from '../auth';
import "../components/form.css"

const Login = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const [objeto, setObjeto] = useState({ email: '', senha: '' });

    let redirecionarPara = query.get('redirect');

    if (!redirecionarPara) {
        redirecionarPara = '/';
    }

    const sucesso = (result) => {
        navegar();
    }

    const erro = (e) => {
        console.log(e);
    }

    const logar = (e) => {
        e.preventDefault();
        login(objeto.email, objeto.senha, sucesso, erro)
    };

    const navegar = () => {
        let url = query.get('redirect');

        console.log("'" + url + "'");

        if (!url) {
            url = '/';
        }

        navigate(url);
    };

    const alterarCampo = (nome, valor) => {
        let obj = { ...objeto };
        obj[nome] = valor;
        setObjeto(obj);
    };

    return (
        <div id="form-container">
            <h1>Login</h1>
            <form id='formID'>
                <div className="campo-form">
                    <label htmlFor="email">E-mail: </label>
                    <input type="email" className="form-control" value={objeto.nome} onChange={(e) => alterarCampo(e.target.name, e.target.value)} id="email" name="email" aria-describedby="emailHelp"/>
                </div>
                <div className="campo-form">
                    <label htmlFor="senha">Senha: </label>
                    <input type="password" className="form-control" value={objeto.senha} onChange={(e) => alterarCampo(e.target.name, e.target.value)} id="senha" name="senha"/>
                </div>
                <button type="submit" id="btn-form" onClick={logar}>Entrar</button>
            </form>
        </div>);
};

export default Login;
