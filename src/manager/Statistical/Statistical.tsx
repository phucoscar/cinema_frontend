import React, { useContext, useEffect, useState } from 'react';
import './index.css';
import { Button, DatePicker } from 'antd';
import TableStatistical from '../../components/Table/TableStatistical';
import type { DatePickerProps } from 'antd';
import { MoviesContextProvider } from '../../contexts/Movies';
import { getStatistic } from '../../apis/theater';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { MessageContextProvider } from '../../contexts/MessageContext';
import { formatVNDCurrency } from '../../components/FuctionGlobal';

const Statistical = () => {

    const auth = useContext(AuthContextProvider)
    const user = auth?.userState.user

    const movieContext = useContext(MoviesContextProvider)
    const cinema = movieContext?.movies.cinema
    const findCinema = movieContext?.findCinema

    const mess = useContext(MessageContextProvider)
    const warning = mess?.warning

    const [totalRevenue, setTotalRevenue]= useState<number>(0)
    const [data, setData] = useState<any>()
    const [req, setReq] = useState<any>()

    const onChangeStart: DatePickerProps['onChange'] = (date, dateString) => {
        setReq({
            ...req,
            startDate: dateString
        })
    };

    const onChangeEnd: DatePickerProps['onChange'] = (date, dateString) => {
        setReq({
            ...req,
            endDate: dateString
        })
    };

    const onclick = async () => {
        const res = await getStatistic({...req, cinemaId: cinema.id})
        if (res?.code === 200) {
            setTotalRevenue(res.data.totalRevenue)
            const newData = res.data.scheduleRevenueStatistic.map((value: any, index: number) =>{
                return({
                    key: index+1,
                    showDate: value.showDate,
                    nameFilm: value.film.name,
                    nameRoom: value.room.name,
                    ticketsSold: value.ticketsSold,
                    revenue: value.revenue
                })
            })
            setData(newData)
        } else {
            warning(res?.msg)
        }
    }
    useEffect(() => {
        if (user) {
            findCinema(user.id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    return (
        <div className='MovieSchedule'>
            <header>Thống kê doanh thu</header>

            <div className='MovieSchedule_option'>
                <div>
                    <div><span>Từ ngày: </span> <DatePicker style={{ width: 250 }} onChange={onChangeStart} /></div>
                    <div><span>Đến ngày: </span> <DatePicker style={{ width: 250 }} onChange={onChangeEnd} /></div>
                </div>
                <Button onClick={onclick} type='primary' ghost>Thống kê</Button>
            </div>
            <div className='Statistical_sum'>
                <span>Tổng thu:</span> <span>{formatVNDCurrency(totalRevenue)}</span>
            </div>


            <TableStatistical dataSource={data} />
        </div>
    )
}

export default Statistical