import React, { } from 'react'
import { Button, Modal } from 'antd';
import TableOrderSummary from '../../components/Table/TableOrderSummary';
import { formatVNDCurrency } from '../../components/FuctionGlobal';

interface IConfirmBook {
    open: boolean,
    setOpen: (open: boolean) => void
    dataTable: any
    sumPrice: number
    url: string
}

const ConfirmBook: React.FC<IConfirmBook> = ({
    open,
    setOpen,
    dataTable,
    sumPrice,
    url
}) => {

    const handleOk = () => {
        window.open(url, "_self")
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal
            width={700}
            open={open}
            title="Đặt vé xem phim"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Trở lại
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Thanh toán
                </Button>,
            ]}
        >
            <div className=''>
                <div>
                    <TableOrderSummary dataSource={dataTable} />

                    <div className='payment-methods'>
                        <p>Phương thức thanh toán</p>
                        <div className='icon-VNP'>
                            <img src="https://res.cloudinary.com/dbduzdrla/image/upload/v1703177176/phuc/202166185_2021396718013233_8499389898242103910_n_akg0gf.png" alt="" />
                            <p>Ví VNP</p>
                        </div>
                    </div>
                </div>
                <div className='payment-methods price-payment-methods'>Tổng tiền: {formatVNDCurrency(sumPrice)}</div>
            </div>
        </Modal>
    )
}

export default ConfirmBook