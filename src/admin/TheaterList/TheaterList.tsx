import React, { useEffect, useState } from 'react';
import TableTheaterList from '../../components/Table/TableTheaterList';
import { GetAllCinema } from '../../apis/theater';


const TheaterList = () => {

  const [listTheater, setListTheater] = useState<any>()
  useEffect(() => {
    (async() => {
      const res = await GetAllCinema()
      if(res?.code === 200) {
        const newData = res.data.map((value: any, index: number) => {
          return({
            key: index,
            ...value,
            fullname: value.admin.fullname
          })
        })
        setListTheater(newData)
      }
    })()
  }, [])

  return (
    <div className='MovieSchedule'>
      <header>Danh sách rạp</header>
        <TableTheaterList dataSource={listTheater} />
    </div>
  )
}

export default TheaterList