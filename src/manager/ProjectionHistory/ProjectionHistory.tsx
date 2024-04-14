import React, { useContext, useEffect, useState } from 'react';
import Detail from './Detail';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { MoviesContextProvider } from '../../contexts/Movies';
import { getHistoryScheduleInCinemaByPage } from '../../apis/theater';
import PaginationCustom from '../../components/Pagination/PaginationCustom';

const ProjectionHistory = () => {

  const auth = useContext(AuthContextProvider);
  const user = auth?.userState.user

  const movieContext = useContext(MoviesContextProvider)
  const movies = movieContext?.movies
  const findCinema = movieContext?.findCinema

  const [schedule, setSchedule] = useState<any>([])
  const [page, setPage] = useState<any>()


  const getFilms = async (pageCurrent: number = 1, perPage: number = 6) => {
    // const res = await getHistoryScheduleInCinema({ cinemaId: movies?.cinema.id })
    const res = await getHistoryScheduleInCinemaByPage({
      cinemaId: movies?.cinema.id,
      page: pageCurrent,
      perPage: perPage
    })
    console.log(res)
    if (res?.code === 200) {
      const page = res.data.pageInfo
      setPage({
        pageSize: 6,
        total: page.totalItems,
      })

      const newData = res.data.scheduleResponseList.map((film: any, index: number) => {
        return {
          key: index,
          ...film
        }
      })
      setSchedule(newData)
    }
  }

  useEffect(() => {
    if (user) {
      findCinema(user.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (movies?.cinema.id) {
      getFilms()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies])

  return (
    <div className='MovieSchedule'>
      <header>Lịch sử chiếu</header>
      {!schedule.length ?
        <div className='not-data'>
          {/* <img src="https://res.cloudinary.com/dbduzdrla/image/upload/v1703320851/phuc/file-and-folder_vbd8uh.png" alt="" /> */}
          <img src="https://res.cloudinary.com/dbduzdrla/image/upload/v1703320851/phuc/empty-box_n5egmb.png" alt="" />
          Hiện đang không có lịch sử chiếu
        </div>
        :
        schedule.map((value: any, index: number) => {
          return (
            <Detail
              key={index}
              data={value}
            />
          )
        })
      }
      {
        schedule.length > 0 && <PaginationCustom
          pageSize={page.pageSize}
          total={page.total}
          pageCurrent={page.pageCurrent}
          getFilms={getFilms}
        />
      }
    </div>
  )
}

export default ProjectionHistory