import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CrudAcao from './CrudAcao';
import { apiAuthGet } from '../../apis';
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css"
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const CrudLista = (props) => {
    const [objetos, setObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        apiAuthGet(props.entidade, (dados) => {
            setObjetos(dados);
            setCarregando(false);
        }, (erro) => console.log(erro),
            navigate, location.pathname);
    }, [carregando, props, navigate, location]);


    if (carregando) {
        return <div>Carregando...</div>;
    }

    const titulos = props.configCampos.titulos;
    const propriedades = props.configCampos.propriedades;
    return (
        <div className="containter-tabela">
            <table className="table">
                <thead>
                    <tr>
                        {
                            titulos.map(x => <th scope="col">{x}</th>)
                        }
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {objetos.map(obj => (
                        <tr key={obj.id}>
                            {propriedades.map(prop => (
                                <td key={prop}>{obj[prop]}</td>
                            ))}
                            <Menu className="options" menuButton={<MenuButton>Opções</MenuButton>} transition>
                                <MenuItem>
                                    <Link to={`/player`}>
                                        Reproduzir
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to={`/${props.entidade}/${CrudAcao.consultar}/${obj.id}`}>
                                        Consultar
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to={`/${props.entidade}/${CrudAcao.alterar}/${obj.id}`}>
                                        Alterar
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to={`/${props.entidade}/${CrudAcao.excluir}/${obj.id}`}>
                                        Excluir
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CrudLista;