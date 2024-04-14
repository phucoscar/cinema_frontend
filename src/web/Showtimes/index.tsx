import React, { useEffect, useState } from 'react';
import './index.css';
import HeaderWeb from '../../components/Header/HeaderWeb';
import SideBar from './SideBar';
import Content from './Content';
import { GetAllCinema } from '../../apis/theater';
import { useNavigate, useParams } from 'react-router-dom';

const Showtimes = () => {

  const {id } = useParams()

  const [listTheater, setListTheater] = useState<any>()

  const [theater, setTheater] = useState<any>()

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const res = await GetAllCinema()
      if (res?.code === 200) {
        setListTheater(res.data)
      }
    })()
  }, [])

  useEffect(() => {
    if (listTheater && !id) {
      navigate(`/showtimes/${listTheater[0].id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listTheater])

  return (
    <div>
      <HeaderWeb />
      <div className='Showtimes'>
        <div className='side_bar-Showtimes'>
          <SideBar
            listTheater={listTheater}
            setTheater={setTheater}
          />
        </div>

        <div className='content-Showtimes'>
          <Content 
          theater={theater}
          />
        </div>
      </div>
    </div>
  )
}

export default Showtimes