import React from 'react'
import { Button, Modal } from 'antd'
import TableDetailBooking from '../../components/Table/TableDetailBooking';
import { formatVNDCurrency } from '../../components/FuctionGlobal';

interface IModalRating {
    open: boolean,
    setOpen: (open: boolean) => void
    movie: any
}

const DetailBooking: React.FC<IModalRating> = ({ open, setOpen, movie }) => {

    const dataSource = movie.tickets.map((value: any, index: number) => {
        return ({
            key: index + 1,
            chair: `${value.seatNumberVertical}-${value.seatNumberHorizontal}`,
            type: value.ticketClass ? "VIP" : "Thường",
            price: formatVNDCurrency(value.price)
        })
    })
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <Modal
            width={700}
            style={{}}
            open={open}
            title={`Chi tiết`}
            // onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Trở lại
                </Button>,
                // <Button key="submit" type="primary" onClick={handleOk}>
                //     Đánh giá
                // </Button>,
            ]}
        >
            <TableDetailBooking dataSource={dataSource} />
            <div className='payment-methods'>
                <p>Phương thức thanh toán</p>
                <div className='icon-VNP'>
                    <img src="https://res.cloudinary.com/dbduzdrla/image/upload/v1703177176/phuc/202166185_2021396718013233_8499389898242103910_n_akg0gf.png" alt="" />
                    <p>Ví VNP</p>
                </div>
            </div>
            <div className='payment-methods price-payment-methods'>Tổng tiền: {formatVNDCurrency(movie.totalPrice)}</div>

        </Modal>
    )
}

export default DetailBooking