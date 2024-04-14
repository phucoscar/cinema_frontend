import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cinemaByDay } from '../../apis/theater';
import { converTime } from '../../components/FuctionGlobal';

interface IContent {
  theater: any
}

const current_day: { [key: number]: string } = {
  0: "chủ nhật",
  1: "thứ 2",
  2: "thứ 3",
  3: "thứ 4",
  4: "thứ 5",
  5: "thứ 6",
  6: "thứ 7"
}

const Content: React.FC<IContent> = ({ theater }) => {

  const [schedules, setSchedules] = useState<any>()
  const { id } = useParams()
  const navigate = useNavigate()


  const currentDate = new Date() //'Dec 2, 2023'

  const [date, setDate] = useState<string>(
    `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`
  )

  currentDate.setDate(currentDate.getDate() - 1)

  const dateOption = []

  for (let i = 0; i < 7; i++) {

    currentDate.setDate(currentDate.getDate() + 1)
    const currentDayOfWeek = current_day[currentDate.getDay()];
    const day = currentDate.getDate().toString().padStart(2, '0')
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const year = currentDate.getFullYear()

    dateOption.push(
      <div
        key={i} className={`${date.split("-")[2] !== day ? "date_Content-Showtimes" : "reverse-date_Content-Showtimes"}`}
        onClick={() => { setDate(`${year}-${month}-${day}`) }}
      >
        <p>{day}</p>
        <p>{i === 0 ? "hôm nay" : currentDayOfWeek}</p>
      </div>
    )
  }

  const getAllScheduleByCinema = async (cinemaId: number, date: string) => {
    console.log(date)
    const data = {
      cinemaId: cinemaId,
      date: date
    }
    const res = await cinemaByDay(data)
    if (res?.code === 200) {
      setSchedules(res.data)
    }
  }


  useEffect(() => {
    if (id) {
      getAllScheduleByCinema(Number(id), date)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, id])

  return (
    <div className='Content-Showtimes'>
      <header>
        <h3>Lịch chiếu phim {theater && theater.name}</h3>
        <p className='address_Content-Showtimes'>{theater && theater.address}</p>

        <div className='main-date_Content-Showtimes'>
          {dateOption}
        </div>
      </header>
      <div>
        {
          schedules && schedules.length ?
            schedules.map((schedule: any, index: number) => {
              const type = schedule.film.types.map((type: any, index: number) => (<span key={index}>{`${type.name}${schedule.film.types.length - 1 === index ? "" : ", "}`}</span>))
              return (
                <div key={index} className='list_film-Content-Showtimes'>
                  <div className='img-list_film-Content-Showtimes'>
                    <img src={schedule.film.thumnails[0].url} alt="" />
                  </div>
                  <div>
                    <p className='name-film'>{schedule.film.name}</p>
                    <p className='type-film'>{type}</p>

                    <div className='list_time-schedule_Content-Showtimes'>
                      {schedule.schedules.map((value: any, index: number) => {
                        return (
                          <div
                            className='time-schedule_Content-Showtimes'
                            onClick={() => {
                              navigate(`/showtimes/${id}/choose-seats/${value.id}`)
                            }}
                          >
                            {converTime(value.startTime)} ~ {converTime(value.endTime)}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })
            :
            <div className='notfount-Content-Showtimes'>
              Không có phim nào được chiếu trong hôm nay {`:(((`}
            </div>
        }
      </div>
    </div>
  )
}

export default Content