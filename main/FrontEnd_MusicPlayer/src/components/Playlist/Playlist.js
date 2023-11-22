import React from "react";
import { useParams } from "react-router-dom";
import Crud from "../Crud";
import "../form.css"

const Playlist = () => {

    const { id, acao } = useParams();

    const configCampos = {
        titulos: ['Nome', 'Descrição', 'Capa'],
        propriedades: ['nome', 'descricao', 'CaminhoImagem']
    }

    const novoObjeto = () => {
        return { id: '', usuarioId: '', nome: '', descricao: '', caminhoImagem: '' }
    }

    const campos = (somenteLeitura, obj, alterarCampo) => {

        return (

            <div id="form-container">
                <h1>Adicione novas Playlists!</h1>
                <form id='formID'>
                    <div className="campo-form">
                        <label htmlFor="nome">Nome: </label>
                        <input type="text" readOnly={somenteLeitura} value={obj.nome} onChange={(e) => alterarCampo(e.target.name, e.target.value)} name="nome" />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="descricao">Descrição</label>
                        <input type="text" readOnly={somenteLeitura} value={obj.descricao} onChange={(e) => alterarCampo(e.target.name, e.target.value)} name="descricao" />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="imagem">Imagem: </label>
                        <input type="file" name="imagem" />
                    </div>
                </form>
            </div>

        );

    }

    return (

        <Crud
            entidade="playlist"
            entidadeNomeAmigavel="Playlist"
            entidadeNomeAmigavelPlural="Playlists"
            id={id}
            acao={acao}
            configCampos={configCampos}
            campos={campos}
            novoObjeto={novoObjeto}
        />

    );

}

export default Playlist;