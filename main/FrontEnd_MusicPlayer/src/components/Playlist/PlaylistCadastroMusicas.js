import { useParams } from "react-router-dom";
import CrudLista from "../Crud/CrudLista";


const PlaylistCadastroMusicas = (props) => {

    const { id, acao } = useParams();

    return (

        <CrudLista
            entidade={props.entidade}
            configCampos={props.configCampos}
            objetos={props.objetos}
        />

    );

}

export default PlaylistCadastroMusicas;