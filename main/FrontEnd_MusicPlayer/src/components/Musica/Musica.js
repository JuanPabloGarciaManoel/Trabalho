import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Crud from "../Crud";
import "../form.css";
import axios from "axios";

const Musica = () => {
  const { id, acao } = useParams();
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImagemChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('_IFormFile', file);

    try {
      const response = await axios.post('http://localhost:5271/api/FileManager/Upload', formData);
      setUploadedFile(response.data);
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
    }
  };

  const configCampos = {
    titulos: ["Nome", "Capa"],
    propriedades: ["nome", "CaminhoDB", "CaminhoImagem"],
  };

  const novoObjeto = () => {
    return { id: "", usuarioId: "", nome: "", caminhoDB: "", caminhoImagem: "" };
  };

  const campos = (somenteLeitura, obj, alterarCampo) => {



    return (
      <div id="form-container">
        <h1>Adicione novas músicas!</h1>
        <form id="formID">
          <div className="campo-form">
            <label htmlFor="nome">Nome: </label>
            <input type="text" readOnly={somenteLeitura} value={obj.nome} onChange={(e) => alterarCampo(e.target.name, e.target.value)} name="nome" />
          </div>
          <div className="campo-form">
            <label htmlFor="musica">Musica: </label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className="campo-form">
            <label htmlFor="imagem">Imagem: </label>
            <input type="file" onChange={handleImagemChange} />
          </div>
          <button onClick={handleUpload}>Upload</button>
          {uploadedFile && <p>File uploaded: {uploadedFile}</p>}
        </form>
      </div>
    );
  };

  return (
    <Crud
      entidade="musica"
      entidadeNomeAmigavel="Música"
      entidadeNomeAmigavelPlural="Músicas"
      id={id}
      acao={acao}
      configCampos={configCampos}
      campos={campos}
      novoObjeto={novoObjeto}
    />
  );
};

export default Musica;