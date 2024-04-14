import React, { useContext, useEffect, useState } from 'react';
import { Button, DatePicker, Form, Select, TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import type { DatePickerProps } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { getAllFilms } from '../../apis/movie';
import { MoviesContextProvider } from '../../contexts/Movies';
import { getRoomInCinema } from '../../apis/theater';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { scheduleEdit } from '../../apis/theater';
import { MessageContextProvider } from '../../contexts/MessageContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getScheduleById } from '../../apis/theater';
import { SearchOutlined } from '@ant-design/icons';
dayjs.extend(customParseFormat);

type FieldType = {};

// Danh sách các phim, Danh sách phòng
const UpdateSchedule = () => {

  const { id } = useParams();
  const dateFormat = 'YYYY-MM-DD';

  const [optionsMovies, setOptionsMovies] = useState<any[]>([])
  const [optionsRooms, setOptionsRooms] = useState<any[]>([])
  const [req, setReq] = useState<any>({})
  const [rooms, setRooms] = useState<any>()
  const [film, setFilm] = useState<any>()

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

  const onFinish = async () => {
    const data = {
      id: req.id,
      startTime: `${req.date}T${req.time}`,
      filmId: req.movies,
      roomId: req.rooms
    }
    const res = await scheduleEdit(data)
    if (res?.code === 200) {
      success("Thành công!!!!!!!!!!!!!!!!!!!!!")
      navigate("/admin/movie-schedule")
    } else {
      error(res?.msg)
    }
  }

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
        if (res?.code === 200) {
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

  useEffect(() => {
    if (id) {
      (async () => {
        const res = await getScheduleById({ scheduleId: Number(id) })
        if (res?.code === 200) {
          setRooms({
            room: res.data.room,
            label: res.data.room.name,
            value: res.data.room.id
          })

          setFilm({
            film: res.data.film,
            label: res.data.film.name,
            value: res.data.film.id
          })

          const originalDateTime = res.data.startTime;
          const dateString = originalDateTime.slice(0, 10);
          const timeString = originalDateTime.slice(11, 19);
          setReq({
            id: res.data.id,
            date: dateString,
            time: timeString,
            movies: res.data.film.id,
            rooms: res.data.room.id
          })
        }
      })()
    }
  }, [id])


  if (!film || !rooms) return <></>

  return (
    <div className='UpdateSchedule'>
      <header>Sửa lịch chiếu phim</header>

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
        >
          <Select
            suffixIcon={<SearchOutlined />}
            defaultValue={film}
            showSearch
            style={{ width: '100%' }}
            options={optionsMovies}
            onChange={handleChangeMovies}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Chọn phòng chiếu"
        >
          <Select
            defaultValue={rooms}
            allowClear
            style={{ width: '100%' }}
            onChange={handleChangeRooms}
            options={optionsRooms}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giờ chiếu"
          name="description"
        >
          <DatePicker
            value={dayjs(req.date, dateFormat)} format={dateFormat}
            onChange={onChangeDate}
          />
          <TimePicker
            value={dayjs(req.time, "HH:mm:ss", 'HH:mm:ss')}
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

export default UpdateSchedule