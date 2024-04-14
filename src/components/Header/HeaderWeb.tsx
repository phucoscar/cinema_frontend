import { useContext, useEffect, useState } from 'react';
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { Button, Dropdown, MenuProps, Modal, Space } from 'antd';
import Avatar from '../Avatar/Avatar';
import { CloseOutlined, ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const HeaderWeb = () => {

  const [urlCurrent, setUrlCurrent] = useState<string>('')
  const location = useLocation()

  const auth = useContext(AuthContextProvider)
  const user = auth?.userState
  const navigate = useNavigate();

  const navigateLoginForm = (e: any) => {
    e.preventDefault();
    navigate('/login')
  };

  const showLogoutModal = () => {
    confirm({
      title: "Bạn có chắc chắn đăng xuất???",
      icon: <ExclamationCircleFilled />,
      okText: "Đăng xuất",
      // okType: 'danger',
      closeIcon: <CloseOutlined />,
      cancelText: "Ở lại",
      onOk() {
        auth?.logout()
        navigate('/login')
      },
      onCancel() { },
    });
  };


  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/update-information">{`Thông tin cá nhân -->`}</Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/booking-history">{`Lịch sử đặt vé -->`}</Link>
      ),
    },
    {
      key: '3',
      label: (
        <Button onClick={showLogoutModal}>Đăng xuất</Button>
      ),
    },
  ];

  useEffect(() => {
    const checkUrl = location.pathname.split("/")[1]
    setUrlCurrent(checkUrl)
  }, [location])

  return (
    <div className='header'>
      <div className='logo'>FILM BOOKING</div>
      <div className='header-right'>
        <div className='option_main'>

        </div>

        {user?.isLogin ?
          <div
            style={{ fontSize: '1.2rem', display: "flex", alignItems: 'center' }}
            className='auth'
          >

            <Link to="/" className={`${urlCurrent === "" ? "bottomCurrent" : ""}`}><span>Trang chủ</span></Link>
            <Link to="/showtimes" className={`${urlCurrent === "showtimes" ? "bottomCurrent" : ""}`}><span>Lịch chiếu</span></Link>
            <Link to="/movie-list" className={`${urlCurrent === "movie-list" ? "bottomCurrent" : ""}`}><span>Phim chiếu</span></Link>

            <p className='name_header'> Xin chào {user.user?.username}</p>

            <Dropdown
              menu={{ items }}
              trigger={["click"]}
            >
              <Space style={{cursor:"pointer"}}>
                <Avatar width='50px' />
              </Space>
            </Dropdown>
          </div>
          :
          <div className='auth'>

            <Link to="/" className={`${urlCurrent === "" ? "bottomCurrent" : ""}`}><span>Trang chủ</span></Link>
            <Link to="/showtimes" className={`${urlCurrent === "showtimes" ? "bottomCurrent" : ""}`}><span>Lịch chiếu</span></Link>
            <Link to="/movie-list" className={`${urlCurrent === "movie-list" ? "bottomCurrent" : ""}`}><span>Phim chiếu</span></Link>


            <button onClick={navigateLoginForm}>Đăng nhập</button>
            <button onClick={() => {navigate("/register")}}>Đăng ký</button>
          </div>
        }

      </div>
    </div>
  )
}

export default HeaderWeb