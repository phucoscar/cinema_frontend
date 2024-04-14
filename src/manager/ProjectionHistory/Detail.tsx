import React from 'react';
import { Button, Image } from 'antd';
import { converDate, converTime} from '../../components/FuctionGlobal';
import { useNavigate } from 'react-router-dom';

interface IDetail {
    data: any
}

const Detail: React.FC<IDetail> = ({data}) => {
    const navigate = useNavigate()

    if(data.length === 0) return <></>
    
    const urlImg = data.schedule.film.thumnails[0].url
    return (
        <div className='Detail'>
            <div className='left_Detail'>
                <Image
                    width={250}
                    src={urlImg}
                />
                <div>
                    <span style={{fontWeight: "bold", fontSize: "1.1rem"}}>Tên phim: {data.schedule.film.name}</span>
                    <span>Ngày chiếu: {converDate(data.schedule.startTime)}</span>
                    <span>Giờ bắt đầ: {converTime(data.schedule.startTime)}</span>
                    <span>Dự kiến kết thúc: {converTime(data.schedule.endTime)}</span>
                    <span>Phòng chiếu:{data.schedule.room.name}</span>
                </div>
            </div>

            <div className='right_Detail'>
                <div>Còn lại: {`${data.availables}/${data.totalSeats}`}</div>
                <div><Button
                     onClick={() => {
                        navigate(`/admin/projection-history/view-all-booking/${data.schedule.id}`)
                    }}
                >Xem vé đã đặt</Button></div>
            </div>
        </div>
    )
}

export default Detail