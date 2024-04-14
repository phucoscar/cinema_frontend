import React from 'react';
import { Table } from "antd";
import type { ColumnsType } from 'antd/es/table';

interface ITableRoomList {
    dataSource: any
}

// STT, Tên phòng, Số hàng ghế, Số ghế mỗi hàng
const TableRoomList:React.FC<ITableRoomList> = ({dataSource}) => {

    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            className: ''
        },
        {
            title: 'Tên phòng',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            className: ''
        },
        {
            title: 'Số hàng ghế',
            key: 'verticalSeats',
            dataIndex: 'verticalSeats',
            align: 'center',
            className: ''
        },
        {
            title: 'Số ghế mỗi hàng',
            key: 'horizontalSeats',
            dataIndex: 'horizontalSeats',
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

export default TableRoomList