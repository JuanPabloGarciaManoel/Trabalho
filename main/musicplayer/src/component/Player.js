import { useEffect, useState } from "react";

import useSound from "use-sound";

import { IconContext } from "react-icons";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"

import musica from "../musicas/musica.mp3";
import imagem from "../img/image.jpg";

import "../component/Player.css"

const Player = () => {

    const [iniciar, { pausar, duracao, som }] = useSound(musica);

    const [tocando, setTocando] = useState(false);

    const [tempoAtual, setTempoAtual] = useState({
        min: 0,
        seg: 0,
    });

    const [segundos, setSegundos] = useState(0);

    useEffect(() => {
        const seg = duracao / 1000;
        const min = Math.floor(seg / 60);
        const segundosRestantes = Math.floor(seg % 60);
        const tempo = {
            min: min,
            sec: segundosRestantes
        };
        setTempoAtual(tempo);
    },[duracao]);
    
    useEffect(() => {
        const intervalo = setInterval(() => {
            if (som) {
                const seg = som.seek();
                const min = Math.floor(seg / 60);
                const segRestantes = Math.floor(seg % 60);
                setSegundos(seg);
                setTempoAtual({
                    min,
                    seg:segRestantes,
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
                        
                        {tempoAtual.min}:{tempoAtual.sec}
                        
                        <input
                            type="range"
                            min= {0}
                            max={duracao / 1000}
                            defaultValue={0}
                            value={segundos}
                            className="timeline"
                            onChange={(e) => som.seek(parseFloat(e.target.value))}
                        />

                    </div>
                </div>


                <div id="botoes">

                    <button className="botaoIniciar">
                        <IconContext.Provider value={{ size: "3em", color: "black" }}>
                            <BiSkipPrevious />
                        </IconContext.Provider>
                    </button>

                    {!tocando ?(
                        
                        <button className="botaoIniciar" onClick={botaoTocando}>
                            <IconContext.Provider value={{ size: "3em", color: "black" }}>
                                <AiFillPlayCircle />
                            </IconContext.Provider>
                        </button>

                    ) : (

                        <button className="botaoIniciar" onClick={botaoTocando}>
                            <IconContext.Provider value={{ size: "3em", color: "black" }}>
                                <AiFillPauseCircle />
                            </IconContext.Provider>
                        </button>
                    )}

                    <button className="botaoIniciar">
                        <IconContext.Provider value={{ size: "3em", color: "black" }}>
                            <BiSkipNext />
                        </IconContext.Provider>
                    </button>

                </div>                
            </div>
        </body>
    );
};

export default Player;