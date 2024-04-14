import React, { useContext, useEffect, useState } from 'react';
import './index.css';
import { Button, DatePicker, Form, Select, TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import type { DatePickerProps } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { getAllFilms } from '../../apis/movie';
import { MoviesContextProvider } from '../../contexts/Movies';
import { getRoomInCinema } from '../../apis/theater';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { scheduleCreate } from '../../apis/theater';
import { MessageContextProvider } from '../../contexts/MessageContext';
import { useNavigate } from 'react-router-dom';

dayjs.extend(customParseFormat);

type FieldType = {};

// Danh sách các phim, Danh sách phòng
const ScheduleMovieShowings = () => {

  const [req, setReq] = useState<any>({})

  const moviesContext = useContext(MoviesContextProvider)
  const cinema = moviesContext?.movies.cinema
  const findCinema = moviesContext?.findCinema

  const auth = useContext(AuthContextProvider)
  const user = auth?.userState.user

  const mess = useContext(MessageContextProvider)
  const success = mess?.success
  const error = mess?.error

  const navigate = useNavigate()

  const initialValues = {}

  const onFinish = async() => { 
    const data = {
      startTime: `${req.date}T${req.time}`, 
      filmId: req.movies, 
      roomId: req.rooms
    }
    const res = await scheduleCreate(data)
    if(res?.code === 200) {
      success("Thành công!!!!!!!!!!!!!!!!!!!!!")
      navigate("/admin/movie-schedule")
    } else {
      error(res?.msg)
    }
   }


  const [optionsMovies, setOptionsMovies] = useState<any[]>([])
  const [optionsRooms, setOptionsRooms] = useState<any[]>([])

  const handleChangeMovies = (value: string) => { 
    setReq({
      ...req,
      movies: Number(value)
    })
   }
  const handleChangeRooms = (value: string) => { 
    setReq({
      ...req,
      rooms: Number(value)
    })
   }

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setReq({
      ...req,
      date: dateString
    })
  };

  const onchangeTime = (value: Dayjs | null, timeString: string) => {
    if (value) {
      setReq({
        ...req,
        time: timeString
      })
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getAllFilms()
      if (res?.code === 200) {
        const newData = res.data.map((value: any) => {
          return ({
            label: value.name,
            value: value.id,
            movie: value
          })
        })
        setOptionsMovies(newData)
      }
    })()
  }, [])

  useEffect(() => {
    if (user) {
      findCinema(user.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (cinema.id) {
      const getAll = async () => {
        const res = await getRoomInCinema({ cinemaId: cinema.id })
        if(res?.code === 200) {
          const newData = res.data.map((value: any) => {
            return ({
              label: value.name,
              value: value.id,
              room: value
            })
          })
          setOptionsRooms(newData)
        }
      }

      getAll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cinema])

  return (
    <div className='ScheduleMovieShowings'>
      <header>Lên lịch chiếu phim</header>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={initialValues}
      >
        <Form.Item<FieldType>
          label="Chọn phim"
          name="movies"
          rules={[{ required: true, message: 'Không được để trống!!!' }]}
        >
          <Select
            // mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Danh sách các phim"
            onChange={handleChangeMovies}
            options={optionsMovies}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Chọn phòng chiếu"
          name="rooms"
          rules={[{ required: true, message: 'Không được để trống!!!' }]}
        >
          <Select
            // mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Danh sách phòng"
            onChange={handleChangeRooms}
            options={optionsRooms}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giờ chiếu"
          name="description"
        >
          <DatePicker
           onChange={onChangeDate} />
          <TimePicker
            onChange={onchangeTime}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ScheduleMovieShowings