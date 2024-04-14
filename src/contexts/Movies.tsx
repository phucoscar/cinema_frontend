import React, { ReactNode, createContext, useState } from 'react';
import { findCinemaByAdmin } from '../apis/theater';

interface IMoviesContext {
    children: ReactNode;
}

interface IMoviesContextProvider {
    movies: Imovies
    setMovies : (movies: Imovies) => void
    findCinema: any
}

interface Imovies {
    cinema: any,
    movies: any[]
}

export const MoviesContextProvider = createContext<IMoviesContextProvider | undefined>(undefined);

const MoviesContext: React.FC<IMoviesContext> = ({ children }) => {

    const defaultMovies: Imovies = {
        cinema: {},
        movies: []
    }

    const [movies, setMovies] = useState<Imovies>(defaultMovies)

    const findCinema = async (userId: number) => {
        const res = await findCinemaByAdmin({ adminId: userId })
        if (res?.code === 200) {
            setMovies({
               cinema: {
                ...res.data,
               },
               movies : []
            })
        } else {
            
        }
    }

    const data = {
        movies,
        setMovies,
        findCinema
    }
    return (
        <MoviesContextProvider.Provider value={data}>{children}</MoviesContextProvider.Provider>
    )
}

export default MoviesContext