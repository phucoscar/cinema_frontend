import { Button } from 'antd';
import './index.css';
import HeaderWeb from '../../components/Header/HeaderWeb';
import { formatVNDCurrency } from '../../components/FuctionGlobal';
import { useEffect } from 'react';
import { resultInfoPayment } from '../../apis/payment';
import { useLocation, useNavigate } from 'react-router-dom';

function getAllUrlParams(url: string) {

  //lấy url sau dấu ?
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  let obj: { [key: string]: any } = {};

  if (queryString) {

    queryString = queryString.split('#')[0];

    //mảng params
    const arr = queryString.split('&');

    for (let i = 0; i < arr.length; i++) {
      const a = arr[i].split('=');

      let paramName = a[0];
      // let paramValue = typeof(a[1] === 'undefined' ? true : a[1])
      let paramValue = a[1]

      obj[paramName] = paramValue

    }
  }

  return obj;
}


// http://localhost:3000/?test=&vnp_Amount=24000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14256997&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+ve+xem+phim+cua%3A+tester1123%40gmail.com&vnp_PayDate=20231222154741&vnp_ResponseCode=00&vnp_TmnCode=AUTDGFEM&vnp_TransactionNo=14256997&vnp_TransactionStatus=00&vnp_TxnRef=04290762&vnp_SecureHash=00ae97b716ab62a84c3eea6ad61482e2e58268ecfcea8e721ebd2cb928747f6ea28bc7b7e257fdaf9cc9e9de67b5ea6e65addc3a8e1487eb783c9dead6782810
const PaymentSuccess = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const data = getAllUrlParams(location.search)
  console.log(1111)

  useEffect(() => {
    console.log(data)
    if (data.vnp_ResponseCode) {
      (async () => {
        const res = await resultInfoPayment({
          scheduleId: Number(localStorage.getItem('scheduleId')),
          userId: Number(localStorage.getItem('userId')),
          responseCode: data.vnp_ResponseCode,
          seats: String(localStorage.getItem('checkActive')).split(',')
        })
        console.log(res)
        if (res?.data === 200) {
          // scheduleId, userId, checkActive
          localStorage.removeItem("scheduleId")
          localStorage.removeItem("userId")
          localStorage.removeItem("checkActive")
        }
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <HeaderWeb />
      <div className='PaymentSuccess'>

        <div className='infor_PaymentSuccess'>

          <img src="https://pixlok.com/wp-content/uploads/2021/12/Green-Tick-Icon-SVG-03vd.png" alt="" />
          <header>Thanh toán thành công!!!</header>

          <div>Bạn đã thanh toán: {formatVNDCurrency(data.vnp_Amount / 100)}</div>
        </div>

        <div className='btn_PaymentSuccess'>
          <Button type='primary' ghost onClick={() => navigate('/booking-history')}>Lịch sử</Button>
          <Button type='primary' ghost onClick={() => navigate('/')}>Trang chủ</Button>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess