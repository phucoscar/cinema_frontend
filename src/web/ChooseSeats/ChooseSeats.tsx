import React, { useContext, useEffect, useState } from 'react';
import './index.css';
import BookTickets from './BookTickets'
import HeaderWeb from '../../components/Header/HeaderWeb'
import { Button } from 'antd'
import { useParams } from 'react-router-dom';
import { getSeatsStatus } from '../../apis/theater';
import { converDate, converTime, formatVNDCurrency } from '../../components/FuctionGlobal';
import ConfirmBook from './ConfirmBook';
import { createPayment } from '../../apis/payment';
import { AuthContextProvider } from '../../contexts/AuthContext';

const ChooseSeats = () => {

  const { scheduleId } = useParams()

  const [tickets, setTickets] = useState<any>()
  const [checkActive, setCheckActive] = useState<string[]>([])

  const [open, setOpen] = useState(false);

  const [dataTable, setDataTable] = useState<any>([])
  const [url, setUrl] = useState<string>("");

  const auth = useContext(AuthContextProvider)
  const user = auth?.userState.user

  let sumPrice = 0

  const confirmBook = async () => {
    const res = await createPayment({ amount: sumPrice })
    if (res?.code === 200) {
      setUrl(res.data.redirect_url)
      localStorage.setItem('checkActive', `${checkActive}`)
      localStorage.setItem('scheduleId', `${scheduleId}`)
      localStorage.setItem('userId', `${user?.id}`)
    }
    setOpen(true)
  }

  for (const element of checkActive) {
    if (Number(element.split("-")[0]) < 5) {
      sumPrice += 50000
    } else {
      sumPrice += 80000
    }
  }

  useEffect(() => {
    let key = 0
    let newData = []
    for (const element of checkActive) {
      if (Number(element.split("-")[0]) < 5) {
        newData.push(
          {
            key: key,
            chair: element,
            type: "ghế thường",
            price: "50.000VND"
          }
        )
      } else {
        newData.push(
          {
            chair: element,
            type: "ghế VIP",
            price: "80.000VND"
          }
        )
      }
      key++
    }
    setDataTable(newData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkActive])

  useEffect(() => {
    if (scheduleId) {
      (async () => {
        const res = await getSeatsStatus({ scheduleId: Number(scheduleId) })
        if (res?.code === 200) {
          setTickets(res.data)
        }
        else {
          console.log(res)
        }
      })()
    }
  }, [scheduleId])

  return (
    <div className='ChooseSeats'>
      <HeaderWeb />
      <header className='title-ChooseSeats'>Đặt vé xem phim</header>
      {tickets &&
        <div className='content-ChooseSeats'>
          <div className='BookTickets-ChooseSeats'>
            <BookTickets
              row={tickets.row} column={tickets.column}
              bookedSeats={tickets.bookedSeats}
              checkActive={checkActive}
              setCheckActive={setCheckActive}
            />
          </div>
          <div className='infor_BookTickets-ChooseSeats'>
            <div>
              <p>Phim: {tickets.schedule.film.name}</p>
              <p>Phòng chiếu: {tickets.schedule.room.name}</p>
              <p>Thời gian:
                &nbsp;{converTime(tickets.schedule.startTime)}
                &nbsp;{`-`}&nbsp;{converDate(tickets.schedule.startTime)}
              </p>
              <p>Ghế:
                {checkActive.map((value: string, index: number) => <span key={index}>{`${index !== 0 ? ", " : " "}${value}`}</span>)}
              </p>
            </div>
            <div>Tổng tiền: {formatVNDCurrency(sumPrice)}</div>
            <Button type='primary' ghost onClick={confirmBook}>Tiếp tục</Button>
          </div>
        </div>
      }

      {open &&
        <ConfirmBook
          open={open}
          setOpen={setOpen}
          dataTable={dataTable}
          sumPrice={sumPrice}
          url={url}
        />}
    </div>
  )
}

export default ChooseSeats