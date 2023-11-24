import { checarAutenticacao } from "../apis";
import { apiAuthFileUpload } from "../apis";

export const salvarArquivoMP3 = (arquivoMP3, sucesso, erro) => {
    checarAutenticacao();

    const formData = new FormData();
    formData.append('arquivoMP3', arquivoMP3);

    apiAuthFileUpload('FileManager/Upload', formData, (result) => {
        
        localStorage.setItem('arquivoMP3_nome', result.nome);
        localStorage.setItem('arquivoMP3_url', result.url);
        sucesso(result);
    }, erro);
};

export const salvarArquivoImagem = (arquivoImagem, sucesso, erro) => {
    checarAutenticacao();
  
    const formData = new FormData();
    formData.append('arquivoImagem', arquivoImagem);
  
    apiAuthFileUpload('FileManager/Upload', formData, (result) => {
      localStorage.setItem('arquivoImagem_nome', result.nome);
      localStorage.setItem('arquivoImagem_url', result.url);
      sucesso(result);
    }, erro);
  };