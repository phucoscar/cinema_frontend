import React from 'react';
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { converDate, converTime } from '../FuctionGlobal';

interface ITableRoom {
    dataSource: any
}
const TableBooked: React.FC<ITableRoom> = ({ dataSource }) => {

    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            className: ''
        },
        {
            title: 'Họ Tên',
            dataIndex: 'fullname',
            key: 'fullname',
            align: 'center',
            className: ''
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
            align: 'center',
            className: ''
        },
        {
            title: 'Thời gian đặt',
            key: 'bookedTime',
            dataIndex: 'bookedTime',
            render: (_, record) => {
                return (
                    <>
                        <span>{converDate(record.bookedTime)}</span><br />
                        <span>{converTime(record.bookedTime)}</span>
                    </>
                )
            },
            align: 'center',
            className: ''
        },
        {
            title: 'Số lượng vé',
            key: 'numberOfTicket',
            dataIndex: 'numberOfTicket',
            align: 'center',
            className: ''
        },
        {
            title: 'Loại ghế',
            key: 'username',
            dataIndex: 'username',
            render: (_, record) => {
                return (
                    <Space size={"small"}>
                        <Tag bordered={false} color="green">{`Thường: ${record.regulars}`}</Tag>
                        <Tag bordered={false} color="yellow">{`VIP: ${record.vips}`}</Tag>
                    </Space>
                )
            },
            align: 'center',
            className: ''
        },
        {
            title: 'Vị trí ngồi',
            key: 'seats',
            dataIndex: 'seats',
            align: 'center',
            className: ''
        },
        {
            title: 'Thanh toán',
            key: 'totalPaid',
            dataIndex: 'totalPaid',
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

export default TableBooked