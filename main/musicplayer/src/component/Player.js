import { useEffect, useState } from "react";

import useSound from "use-sound";

import { IconContext } from "react-icons";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"

import musica from "../musicas/musica.mp3";
import imagem from "../img/image.jpg";

import "../component/Player.css"

const Player = () => {

    const [tocando, setTocando] = useState(false);

    const [iniciar, { pausar, duracao, som }] = useSound(musica);

    const [tempoAtual, setTempoAtual] = useState({
        min: "",
        seg: "",
    });

    const [segundos, setSegundos] = useState();

    useEffect(() => {
        const seg = duracao / 1000;
        const min = Math.floor(seg / 60);
        const segundosRestantes = Math.floor(seg % 60);
        const tempo = {
            min: min,
            sec: segundosRestantes
        };
    });
    

    useEffect(() => {
        const intervalo = setInterval(() => {
            if (som) {
                setSegundos(som.seek([]));
                const min = Math.floor(som.seek([]) / 60);
                const seg = Math.floor(som.seek([]) % 60);
                setTempoAtual({
                    min,
                    seg,
                });
            }
        }, 1000);
        return () => clearInterval(intervalo);
    }, [som]);

    const botaoTocando = () => {
        if (tocando) {
            pausar();
            setTocando(false);
        } else {
            iniciar();
            setTocando(true);
        }
    };

    return (
        <body>
            <div id="componente">
                <div id="cabecalho">
                    <h2 className="titulo">Teatro dos Vampiros</h2>
                </div>
                <div id="imagem-central">
                    <img className="capaMusica" src={imagem} />
                </div>
                <div id="descricao">

                    <h4 className="artista">Legião Urbana</h4>
                </div>

                
                <div>
                    <div className="tempo">
                        <p>
                            {tempoAtual.min}:{tempoAtual.sec}
                        </p>
                        <p>
                            
                        </p>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={duracao / 1000}
                        default="0"
                        value={segundos}
                        className="timeline"
                        onChange={(e) => {som.seek([e.target.value]);}}
                    />
                </div>


                <div id="botoes">
                    <button className="botaoIniciar">
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            <BiSkipPrevious />
                        </IconContext.Provider>
                    </button>
                    {!tocando ? (
                        <button className="botaoIniciar" onClick={botaoTocando}>
                            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                                <AiFillPlayCircle />
                            </IconContext.Provider>
                        </button>
                    ) : (
                        <button className="botaoIniciar" onClick={botaoTocando}>
                            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                                <AiFillPauseCircle />
                            </IconContext.Provider>
                        </button>
                    )}
                    <button className="botaoIniciar">
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            <BiSkipNext />
                        </IconContext.Provider>
                    </button>
                </div>                
            </div>
        </body>
    );
};

export default Player;