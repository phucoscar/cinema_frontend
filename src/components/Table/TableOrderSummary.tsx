import React from 'react';
import { Table } from "antd";
import type { ColumnsType } from 'antd/es/table';

interface ITableOrderSummary {
    dataSource: any
}

// STT, Tên phòng, Số hàng ghế, Số ghế mỗi hàng
const TableOrderSummary:React.FC<ITableOrderSummary> = ({dataSource}) => {

    const columns: ColumnsType<any> = [
        {
            title: 'Ghế',
            dataIndex: 'chair',
            key: 'chair',
            align: 'center',
            className: ''
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            className: ''
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            className: ''
        }
    ];

  return (
    <Table
            bordered={true}
            columns={columns} dataSource={dataSource}
            pagination={false}
        />
  )
}

export default TableOrderSummary