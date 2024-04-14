import { useContext } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContextProvider } from '../../contexts/AuthContext';
import { Button, Dropdown, MenuProps, Modal, Space } from 'antd';
import { CloseOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import Avatar from '../Avatar/Avatar';

const { confirm } = Modal;

const Header = () => {
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

  const url_information = user?.user?.role.name === "ADMIN" ? "/admin/update-information" : "/super-admin/update-information"

  const items: MenuProps['items'] = [
    {
      key: '3',
      label: (
        <Link to={url_information}>{`Thông tin cá nhân -->`}</Link>
      ),
    },
    {
      key: '',
      label: (
        <Button onClick={showLogoutModal}>Đăng xuất</Button>
      ),
    },
  ];

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
            <span onClick={navigateLoginForm}>Đăng nhập</span>
            <span onClick={() => {navigate("/register")}}>Đăng ký</span>
          </div>
        }

      </div>
    </div>
  )
}

export default Header