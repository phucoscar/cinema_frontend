import React, { useEffect, useState } from 'react';
import TableGuestAccounts from '../../components/Table/TableGuestAccounts';
import { findAllCustomersAccount } from '../../apis/user';

const GuestAccounts = () => {
  const [listAccount, setListAccount] = useState<any>()

  const getAccount = async () => {
    const res = await findAllCustomersAccount()
    if (res?.code === 200) {
      const newData = res.data.map((value: any, index: number) => {
        return ({
          key: index,
          ...value

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
      <header>Danh sách tài khoản khách</header>
      <TableGuestAccounts dataSource={listAccount} getAccount={getAccount} />
    </div>
  )
}

export default GuestAccounts