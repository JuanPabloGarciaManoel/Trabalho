import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Crud from "../Crud";
import "../form.css";
import { salvarArquivoImagem, salvarArquivoMP3 } from "../../upload";

const Musica = () => {
  const { id, acao } = useParams();
  const [arquivoMusica, setArquivoMusica] = useState(null);
  const [arquivoImagem, setArquivoImagem] = useState(null);

  const configCampos = {
    titulos: ["Nome", "Capa"],
    propriedades: ["nome", "CaminhoDB", "CaminhoImagem"],
  };

  const novoObjeto = () => {
    return { id: "", usuarioId: "", nome: "", caminhoDB: "", caminhoImagem: "" };
  };

  const campos = (somenteLeitura, obj, alterarCampo) => {
    const handleFileChange = (event, tipoArquivo) => {
      const arquivo = event.target.files[0];
      tipoArquivo === "musica" ? setArquivoMusica(arquivo) : setArquivoImagem(arquivo);
    };

    const handleUpload = async () => {
      try {
        if (arquivoMusica) {
          // Faça o upload do arquivo MP3
          const resultMusica = await salvarArquivoMP3(arquivoMusica);
          // Atualize o caminho no objeto da música
          alterarCampo("caminhoDB", resultMusica.url);
        }

        if (arquivoImagem) {
          // Faça o upload do arquivo de imagem
          const resultImagem = await salvarArquivoImagem(arquivoImagem);
          // Atualize o caminho no objeto da música
          alterarCampo("caminhoImagem", resultImagem.url);
        }
      } catch (error) {
        console.error("Erro ao enviar arquivo:", error);
      }
    };

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
            <input type="file" name="musica" onChange={(e) => handleFileChange(e, "musica")} />
          </div>
          <div className="campo-form">
            <label htmlFor="imagem">Imagem: </label>
            <input type="file" name="imagem" onChange={(e) => handleFileChange(e, "imagem")} />
          </div>
          <button type="button" onClick={handleUpload}>Enviar Arquivos</button>
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