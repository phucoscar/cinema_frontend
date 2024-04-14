import React, { useContext, useEffect, useState } from 'react';
import "./index.css";
import Detail from './Detail';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { MoviesContextProvider } from '../../contexts/Movies';
// import { getAllFilms } from '../../apis/movie';
import { getAllFilmsPage } from '../../apis/movie';
import PaginationCustom from '../../components/Pagination/PaginationCustom';

const MovieList = () => {

    const auth = useContext(AuthContextProvider);
    const user = auth?.userState.user

    const movieContext = useContext(MoviesContextProvider)
    const findCinema = movieContext?.findCinema
    const [page, setPage] = useState<any>()

    const [optionsMovies, setOptionsMovies] = useState<any[]>()
    const getFilms = async (pageCurrent: number = 1, perPage: number = 6) => {
        // const res = await getAllFilms()
        const res = await getAllFilmsPage({
            page: pageCurrent,
            perPage: perPage
        })
        if (res?.code === 200) {
            const page = res.data.pageInfo
            setPage({
                pageSize: 6,
                total: page.totalItems,
            })

            const newData = res.data.films.map((film: any, index: number) => {
                return {
                    key: index,
                    ...film
                }
            })
            setOptionsMovies(newData)
        }
    }

    useEffect(() => {
        if (user) {
            findCinema(user.id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useEffect(() => {
        getFilms()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='MovieList MovieSchedule'>
            <header>Danh sách phim</header>
            {
                optionsMovies ? optionsMovies.map((value: any, index: number) => {
                    return (
                        <Detail
                            key={index}
                            data={value}
                            getFilms={getFilms}
                        />
                    )
                })
                    :
                    <div className='not-data'>
                        {/* <img src="https://res.cloudinary.com/dbduzdrla/image/upload/v1703320851/phuc/file-and-folder_vbd8uh.png" alt="" /> */}
                        <img src="https://res.cloudinary.com/dbduzdrla/image/upload/v1703320851/phuc/empty-box_n5egmb.png" alt="" />
                        Hiện đang không có phim
                    </div>
            }
            {
                optionsMovies && <PaginationCustom
                    pageSize={page.pageSize}
                    total={page.total}
                    pageCurrent={page.pageCurrent}
                    getFilms={getFilms}
                />
            }
        </div>
    )
}

export default MovieList