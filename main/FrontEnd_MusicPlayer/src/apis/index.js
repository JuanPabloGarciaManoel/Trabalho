import axios from "axios";
import Cookies from 'universal-cookie';
import {estaAutenticado, getToken} from '../auth';

const urlBase = 'http://localhost:5271/api'
const cookies = new Cookies();

export const checarAutenticacao = (navigate, locationUrl) => {
    if(!estaAutenticado()) {
        navigate('/login?redirect=' + locationUrl);
    }
};

export const apiAuthGet = (url, sucesso, erro, navigate, locationUrl) => {
    checarAutenticacao(navigate, locationUrl);

    const instance = axios.create({
        baseURL: `${urlBase}`,
        timeout: 1000,
        headers: {'Authorization': 'Bearer ' + getToken()}
    });

    instance.get(`/${url}`).then(result => {
        sucesso(result.data);
    }).catch(error => {
        erro(error);
    });
};

export const apiAuthGetPorId = (url, id, sucesso, erro, navigate, locationUrl) => { 
    checarAutenticacao(navigate, locationUrl);

    const instance = axios.create({
        baseURL: `${urlBase}`,
        timeout: 1000,
        headers: {'Authorization': 'Bearer ' + getToken()}
    });

    instance.get(`/${url}/${id}`).then(result => {
        sucesso(result.data);
    }).catch(error => {
        console.log(erro);
        erro(error);
    });
};

export const apiAuthGetPorIdMestre = (url, id, sucesso, erro, navigate, locationUrl) => { 
    checarAutenticacao(navigate, locationUrl);

    const instance = axios.create({
        baseURL: `${urlBase}`,
        timeout: 1000,
        headers: {'Authorization': 'Bearer ' + getToken()}
    });

    instance.get(`/${url}/mestre/${id}`).then(result => {
        sucesso(result.data);
    }).catch(error => {
        console.log(erro);
        erro(error);
    });
};

export const apiAuthPost = (url, objeto, sucesso, erro) => { 
    checarAutenticacao();
    
    const instance = axios.create({
        baseURL: `${urlBase}`,
        timeout: 1000,
        headers: {'Authorization': 'Bearer ' + getToken()}
    });

    instance.post(`/${url}`, objeto).then(result => {
        sucesso(result.data);
    }).catch(error => {
        erro(error);
    });
};

export const apiAuthPut = (url, id, objeto, sucesso, erro) => { 
    checarAutenticacao();
    
    const instance = axios.create({
        baseURL: `${urlBase}`,
        timeout: 1000,
        headers: {'Authorization': 'Bearer ' + getToken()}
    });

    instance.put(`/${url}/${id}`, objeto).then(() => {
        sucesso();
    }).catch(error => {
        erro(error);
    });
};

export const apiAuthDelete = (url, id, sucesso, erro) => { 
    checarAutenticacao();
    
    const instance = axios.create({
        baseURL: `${urlBase}`,
        timeout: 1000,
        headers: {'Authorization': 'Bearer ' + getToken()}
    });

    instance.delete(`/${url}/${id}`).then(() => {
        sucesso();
    }).catch(error => {
        erro(error);
    });
};

export const apiGet = (url, sucesso, erro) => {
    axios.get(`${urlBase}/${url}`).then(result => {
        sucesso(result.data);
    }).catch(error => {
        erro(error);
    });
};

export const apiGetPorId = (url, id, sucesso, erro) => { 
    axios.get(`${urlBase}/${url}/${id}`).then(result => {
        sucesso(result.data);
    }).catch(error => {
        erro(error);
    });
};

export const apiGetPorIdMestre = (url, id, sucesso, erro) => { 
    axios.get(`${urlBase}/${url}/mestre/${id}`).then(result => {
        sucesso(result.data);
    }).catch(error => {
        erro(error);
    });
};

export const apiPost = (url, objeto, sucesso, erro) => { 
    axios.post(`${urlBase}/${url}`, objeto).then(result => {
        sucesso(result.data);
    }).catch(error => {
        erro(error);
    });
};

export const apiPut = (url, id, objeto, sucesso, erro) => { 
    axios.put(`${urlBase}/${url}/${id}`, objeto).then(() => {
        sucesso();
    }).catch(error => {
        erro(error);
    });
};

export const apiDelete = (url, id, sucesso, erro) => { 
    axios.delete(`${urlBase}/${url}/${id}`).then(() => {
        sucesso();
    }).catch(error => {
        erro(error);
    });
};