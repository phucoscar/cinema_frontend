import React, { useContext, useEffect, useState } from 'react';
import TableRoomList from '../../components/Table/TableRoomList';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { MoviesContextProvider } from '../../contexts/Movies';
import { roomInCinema } from '../../apis/theater';

const RoomList = () => {
  const auth = useContext(AuthContextProvider)
  const user = auth?.userState.user

  const moviesContext = useContext(MoviesContextProvider)
  const findCinema = moviesContext?.findCinema
  const cinema = moviesContext?.movies.cinema

  const [data, setData] = useState<any>([])

  useEffect(() => {
    if (cinema.id) {
      (async () => {
        const res = await roomInCinema({cinemaId : cinema.id})
        if(res?.code === 200) {

          const newData = res.data.map((value: any, index: number) => {
              return(
                {
                  key: index + 1,
                  ...value
                }
              )
          })
          setData(newData)
        }
      })()
    }
  }, [cinema])

  useEffect(() => {
    if (user) {
      findCinema(user.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  return (
    <div className='MovieSchedule'>
      <header>Danh sách phòng</header>

      <TableRoomList dataSource={data} />
    </div>
  )
}

export default RoomList