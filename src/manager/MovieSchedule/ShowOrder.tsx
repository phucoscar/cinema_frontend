import React, { useEffect, useState } from 'react';
import TableBooked from '../../components/Table/TableBooked';
import { useParams } from 'react-router-dom';
import { getAllOrders } from '../../apis/theater';

const ShowOrder = () => {

    const { id } = useParams()

    const [data, setData] = useState<any>()

    useEffect(() => {
        if (id) {
            (async () => {
                const res = await getAllOrders({scheduleId: Number(id)})
                console.log(res)
                if(res?.code === 200) {
                    const newData = res.data.map((value: any, index: number) => {
                        return({
                            key: index + 1,
                            ...value
                        })
                    })
                    setData(newData)
                }
            })()
        }
    }, [id])

    return (
        <div className='MovieSchedule'>
            <header>Xem vé đã đặt</header>
            <TableBooked dataSource={data} />
        </div>
    )
}

export default ShowOrder