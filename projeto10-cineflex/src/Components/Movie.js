import Action from "./Action";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Movie() {

    const [posters, setPosters] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");
        promise.then((res) => {
            setPosters(res.data)
        })
        promise.catch((err) => console.log(err.response.data))
    }, [])

    return (
        <>
            <Action text="Selecione o filme" />
            <ChooseMovie data-test="movie">
                {posters.length === 0 ? ("Carregando...") : (
                    posters.map((poster) =>
                        <Imgposter key={poster.id}>
                            <Link to={`/sessoes/${poster.id}`}>
                                <img src={poster.posterURL} alt={poster.title} />
                            </Link>
                        </Imgposter>
                    ))}

            </ChooseMovie>
        </>
    )
}

const ChooseMovie = styled.div`
    display:flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`

const Imgposter = styled.button`
    margin: 13px 23px 13px 23px;
    img {
        width: 129px;
        height: 193px;
    }

`