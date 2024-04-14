import React from 'react';
import { Table } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { converDate, converTime, formatVNDCurrency } from '../FuctionGlobal';

interface ITableRoom {
    dataSource: any
}
const TableStatistical: React.FC<ITableRoom> = ({ dataSource }) => {

    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            className: ''
        },
        {
            title: 'Ngày chiếu',
            dataIndex: 'showDate',
            key: 'showDate',
            render: (_, record)=> {
                return(<>{converDate(record.showDate)} {converTime(record.showDate)}</>)
            },
            align: 'center',
            className: ''
        },
        {
            title: 'Phim chiếu',
            key: 'nameFilm',
            dataIndex: 'nameFilm',
            align: 'center',
            className: ''
        },
        {
            title: 'Phòng chiếu',
            key: 'nameRoom',
            dataIndex: 'nameRoom',
            align: 'center',
            className: ''
        },
        {
            title: 'Số vé bán được',
            key: 'ticketsSold',
            dataIndex: 'ticketsSold',
            align: 'center',
            className: ''
        },
        {
            title: 'Doanh thu',
            key: 'revenue',
            dataIndex: 'revenue',
            render: (_, record)=> {
                return(<>{formatVNDCurrency(Number(record.revenue))}</>)
            },
            align: 'center',
            className: ''
        },
    ];

    return (
        <Table
            bordered={true}
            columns={columns} dataSource={dataSource}
            pagination={false}
        />
    )
}

export default TableStatistical