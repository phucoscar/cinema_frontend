import React, { useEffect, useState } from 'react';
import './index.css'
import HeaderWeb from '../../components/Header/HeaderWeb';
import Detail from './Detail';
import { historyBooking } from '../../apis/theater';

const BookingHistory = () => {

  const [movies, setMovies] = useState<any>()
  const getHistoryBooking = async() => {
    const res = await historyBooking()
    if (res?.code === 200) {
      setMovies(res.data)
    } else {
      console.log("looix")
    }
  }
  useEffect(() => {
    getHistoryBooking()
  }, [])
  return (
    <div>
      <HeaderWeb />
      <div className='BookingHistory'>
        <header>Lịch sử đặt vé</header>
        {
          movies ?
            <div>
              {movies.map((movie: any, index: number) => <Detail movie={movie} key={index} getHistoryBooking={getHistoryBooking}/>)}
            </div>
            :
            <div>
              Không có danh sách lịch sử đặt vé
            </div>
        }
      </div>
    </div>
  )
}

export default BookingHistory