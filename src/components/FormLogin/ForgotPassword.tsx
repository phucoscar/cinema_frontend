import React, { useContext, useState } from 'react';
import './Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../apis/auth';

// import { AuthContextProvider } from '../../contexts/AuthContext';
import { MessageContextProvider } from '../../contexts/MessageContext';

interface IFormLogin {
    email: string | undefined
}

const ForgotPassword = () => {
    // const auth = useContext(AuthContextProvider);
    const message = useContext(MessageContextProvider);
    // const setUserState = auth?.setUserState
    const success = message?.success
    const error = message?.error

    const [data, setData] = useState<IFormLogin>({ email: undefined })

    const navigate = useNavigate()
    const submitFormLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email } = data
        if (email) {
            const res = await forgotPassword({ email })
            if (res?.code === 200) {
                console.log(res)
                success("Mật khẩu đăng nhập đã được gửi về email của bạn. Vui lòng kiểm tra")
                navigate('/login')
            } else {
                error(res?.msg)
            }
        }
    };

    const navigateHome = async (e: any) => {
        e.preventDefault();
        navigate('/')
    };

    const changeInfor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='Form'>
            <div>
                <div className='forgot-password'>
                    <h1 onClick={navigateHome}>FILM BOOKING</h1>

                    <div className='instruct'>
                        <h3>Quên mật khẩu?</h3>
                        <p className='instruct-main'>Hãy làm theo các bước đơn giản sau để đặt lại tài khoản của bạn:</p>
                        <p>1. Nhập tên người dùng hoặc email của bạn.</p>
                        <p>2. Truy cập tài khoản email của bạn, mở email được Hệ thống gửi.</p>
                        <p>3. Sử dụng mật khẩu mới để đăng nhập.</p>
                    </div>

                    <form onSubmit={submitFormLogin}>
                        <div>
                            <label htmlFor="email">Nhập Email của bạn</label>
                            <input
                                id='email'
                                type="email"
                                name='email'
                                placeholder='email'
                                onChange={changeInfor}
                            />
                        </div>
                        <button>Lấy mật khẩu mới</button>
                    </form>

                    <p>Quay lại trang <Link to='/login'>Đăng Nhập</Link></p>
                </div>

                <div className='img-loginform'>
                    <img src={"https://kaliforms.com/wp-content/uploads/2021/04/movie-ticket-booking-form-scaled.jpg"} alt="" />
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword