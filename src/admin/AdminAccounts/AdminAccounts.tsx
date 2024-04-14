import React, { useEffect, useState } from 'react';
import TableAdminAccounts from '../../components/Table/TableAdminAccounts';
import { findAllAdminAccount } from '../../apis/user';

const AdminAccounts = () => {

  const [listAccount, setListAccount] = useState<any>()

  const getAccount = async () => {
    const res = await findAllAdminAccount()
    if (res?.code === 200) {
      const newData = res.data.map((value: any, index: number) => {
        return ({
          id: value.user.id,
          key: index,
          name: value.user.fullname,
          username: value.user.username,
          email: value.user.email,
          address: value.user.address,
          blocked: value.user.blocked,
          nameCinema: value.cinema?.name
        })
      })
      setListAccount(newData)
    }
  }

  useEffect(() => {
    getAccount()
  }, [])

  return (
    <div className='MovieSchedule'>
      <header>Danh sách tài khoản admin</header>
      <TableAdminAccounts dataSource={listAccount} getAccount={getAccount} />
    </div>
  )
}

export default AdminAccounts