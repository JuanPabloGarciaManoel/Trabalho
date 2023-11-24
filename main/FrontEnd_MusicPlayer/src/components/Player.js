import React from 'react';
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { IconContext } from "react-icons";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"


import musica from "../musicas/musica.mp3";
import capa from "../img/capa_legiao.jpg";

import "../components/Player.css"

const Player = () => {

    /*  Botão play  */

    const [isPlaying, setIsPlaying] = useState(false);

    const [play, { pause, duration, sound }] = useSound(musica);

    const botaoTocando = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
        console.log(duration);
    };


    /*  Barra de tempo  */

    const [tempoAtual, setTempoAtual] = useState({
        min: 0,
        seg: 0,
    });

    const [segundos, setSegundos] = useState(0);

    const seg = duration / 1000;
    const min = Math.floor(seg / 60);
    const segundosRestantes = Math.floor(seg % 60);
    const tempo = {
        min: min,
        seg: segundosRestantes
    };

    useEffect(() => {
        const intervalo = setInterval(() => {
            if (sound) {
                setSegundos(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const seg = Math.floor(sound.seek([]) % 60);
                setTempoAtual({
                    min,
                    seg,
                });
            }
        }, 1000);
        return () => clearInterval(intervalo);
    }, [sound]);


    return (
        <>
        <div id="componente">
            <div id="cabecalho">
                <h2 className="titulo">Teatro dos Vampiros</h2>
            </div>
            <div id="imagem-central">
                <img className="capaMusica" alt="capaMusica" src={capa} />
            </div>
            <div id="descricao">

                <h4 className="artista">Legião Urbana</h4>
            </div>


            <div>
                <div className="tempo">
                    <p>0{tempoAtual.min}:{tempoAtual.seg}</p>
                    <p>0{tempo.min}:{tempo.seg}</p>
                </div>
                <input
                    type="range"
                    min={0}
                    max={(duration + 0) / 1000}
                    value={segundos}
                    className="timeline"
                    onChange={(e) => { sound.seek(e.target.value); }}
                />
            </div>


            <div id="botoes">

                <button className="botao">
                    <IconContext.Provider value={{ size: "3em", color: "black" }}>
                        <BiSkipPrevious />
                    </IconContext.Provider>
                </button>

                {!isPlaying ? (

                    <button className="botao" onClick={botaoTocando}>
                        <IconContext.Provider value={{ size: "3em", color: "black" }}>
                            <AiFillPlayCircle />
                        </IconContext.Provider>
                    </button>

                ) : (

                    <button className="botao" onClick={botaoTocando}>
                        <IconContext.Provider value={{ size: "3em", color: "black" }}>
                            <AiFillPauseCircle />
                        </IconContext.Provider>
                    </button>
                )}

                <button className="botao">
                    <IconContext.Provider value={{ size: "3em", color: "black" }}>
                        <BiSkipNext />
                    </IconContext.Provider>
                </button>

            </div>
        </div>
        </>
    );
};

export default Player;
