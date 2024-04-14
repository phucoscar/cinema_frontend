import React, { useContext } from 'react';
import { Button, Table } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { changeStatus } from '../../apis/user';
import { MessageContextProvider } from '../../contexts/MessageContext';

interface ITableRoom {
    dataSource: any
    getAccount: any
}

// STT, Họ Tên, Username, Email, Địa Chỉ, Trạng Thái, Rạp Quản Lý
const TableAdminAccounts: React.FC<ITableRoom> = ({ dataSource, getAccount }) => {

    const mess = useContext(MessageContextProvider)
    const success = mess?.success
    const error = mess?.error

    const change = async(id: number) => {
        const res = await changeStatus({id: id})
        if(res?.code === 200) {
            getAccount()
            success("Cập nhập trạng thái thành công")
        }
        else {
            error(res?.msg)
        }
    }

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
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            className: ''
        },
        {
            title: 'Username',
            key: 'username',
            dataIndex: 'username',
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
            title: 'Địa Chỉ',
            key: 'address',
            dataIndex: 'address',
            align: 'center',
            className: ''
        },
        {
            title: 'Rạp Quản Lý',
            key: 'nameCinema',
            dataIndex: 'nameCinema',
            align: 'center',
            className: ''
        },
        {
            title: 'Trạng Thái',
            key: 'blocked',
            dataIndex: 'blocked',
            render: (_, record) => {
                return (
                    <>
                        {!record.blocked ?
                            (
                                <div>
                                    <span style={{color:"green"}}>Hoạt động</span>
                                    <Button size='small' onClick={() => change(Number(record.id))}>Chặn</Button>
                                </div>
                            )
                            :
                            (
                                <div>
                                    <span style={{color:"red"}}>Đã chặn</span>
                                    <Button size='small' onClick={() => change(Number(record.id))}>Bỏ chặn</Button>
                                </div>
                            )
                        }
                    </>
                )
            },
            align: 'center',
            className: 'blocked_TableAdminAccounts'
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

export default TableAdminAccounts