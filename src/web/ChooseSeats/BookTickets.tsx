import React, { useContext } from 'react';
import { Col, Row } from 'antd';
import { MessageContextProvider } from '../../contexts/MessageContext';

interface IBookTickets {
  row: any
  column: any
  bookedSeats: any
  checkActive: string[]
  setCheckActive: (checkActive: string[]) => void
}

let style: React.CSSProperties = { padding: '8px 0', textAlign: 'center', cursor: "pointer" };

const BookTickets: React.FC<IBookTickets> = ({
  row,
  column,
  bookedSeats,
  checkActive,
  setCheckActive
}
) => {

  const mess = useContext(MessageContextProvider)
  const warning = mess?.warning

  const funcActive = (check: string, background: string) => {
    const removeIndex = checkActive.findIndex((item) => item === check);
    if (removeIndex === -1) {
      if (background === "rgb(133, 133, 133)") {
        warning("Ghế đã được chọn")
      } else {
        setCheckActive([...checkActive, check])
      }
    } else {

      const newCheckActive = checkActive.filter((item: string) => item !== check);
      setCheckActive(newCheckActive);
    }

  }

  let cols = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      let background = i < 4 ? 'rgb(118, 248, 118)' : "rgb(99, 193, 255)" // ghế thường, vip
      if (bookedSeats.includes(`${i + 1}-${j + 1}`)) {
        background = 'rgb(133, 133, 133)' //đã đặt
      }
      if (checkActive.includes(`${i + 1}-${j + 1}`)) {
        background = 'rgb(255, 84, 65)' // lựa chọn
      }
      cols.push(
        <Col
          key={(`${i + 1}-${j + 1}`).toString()} style={{ width: `${100 / column}%` }}
          onClick={() => funcActive(`${i + 1}-${j + 1}`, background)}
        >
          <div style={{ ...style, background: `${background}` }}>{`${i + 1}-${j + 1}`}</div>
        </Col>,
      );
    }
  }

  return (
    <>
      <div className='text_screen-BookTickets'>Màn Hình</div>
      <div className='screen-BookTickets'></div>
      <Row gutter={[10, 10]}>
        {cols}
      </Row>

      <div className='note-BookTickets'>
        <p><span></span><p>ghế Vip <p>(80.000VND)</p></p></p>
        <p><span></span><p>ghế thường <p>(50.000VND)</p></p></p>
        <p><span></span>ghế đã đặt</p>
        <p><span></span>ghế vừa chọn</p>
      </div>
    </>
  )
}

export default BookTickets