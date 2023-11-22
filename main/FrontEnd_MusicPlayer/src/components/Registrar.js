import React, { useState } from 'react';
import { useQuery } from '../useQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { registrarUsuario } from '../auth';
import "../components/form.css"

const Registrar = () => {
    const { acao } = useParams();
    const query = useQuery();
    const navigate = useNavigate();
    const [objeto, setObjeto] = useState({ email: '', senha: '' });

    const sucesso = (result) => {
        navegar();
    }

    const erro = (e) => {
        console.log(e);
    }

    const criarUsuario = (e) => {
        e.preventDefault();

        if (acao === 'admin') {
            registrarUsuario(objeto.email, objeto.senha, true, sucesso, erro)
        } else {
            registrarUsuario(objeto.email, objeto.senha, false, sucesso, erro)
        }
    };

    const navegar = () => {
        let url = query.get('redirect');

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
            <h1>Criar nova conta</h1>
            <form id="formID">
                <div class="campo-form">
                    <label for="email">E-mail: </label>
                    <input type="email" value={objeto.nome} onChange={(e) => alterarCampo(e.target.name, e.target.value)} name="email" id="email" aria-describedby="emailHelp" />
                </div>
                <div class="campo-form">
                    <label for="senha">Senha: </label>
                    <input type="password" value={objeto.senha} onChange={(e) => alterarCampo(e.target.name, e.target.value)} name="senha" id="senha" />
                </div>
                <button type="submit" id="btn-form" onClick={criarUsuario}>Criar</button>
            </form>
        </div>

    );
};

export default Registrar;
