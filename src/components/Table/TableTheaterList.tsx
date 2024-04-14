import React from 'react';
import { Table } from "antd";
import type { ColumnsType } from 'antd/es/table';

interface ITableRoom {
    dataSource: any
}

// STT, Tên Rạp,  Địa Chỉ, Admin
const columns: ColumnsType<any> = [
    {
        title: 'STT',
        dataIndex: 'key',
        key: 'key',
        align: 'center',
        className: ''
    },
    {
        title: 'Tên Rạp',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        className: ''
    },
    {
        title: 'Địa Chỉ',
        key: 'address',
        dataIndex: 'address',
        align: 'center',
        className: ''
    },
    {
        title: 'Admin',
        key: 'fullname',
        dataIndex: 'fullname',
        align: 'center',
        className: ''
    },
];

const TableTheaterList:React.FC<ITableRoom> = ({ dataSource }) => {
    return (
        <Table
            bordered={true}
            columns={columns} dataSource={dataSource}
            pagination={false}
        />
    )
}

export default TableTheaterList