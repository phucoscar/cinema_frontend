import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MessageContextProvider } from '../../contexts/MessageContext';
import { register } from '../../apis/auth';

interface IFormRegister {
    email: string | undefined
    password: string | undefined
    phone: string | undefined,
    role: string | undefined,
    address: string | undefined,
    fullname: string | undefined,
    dateOfBirth: string | undefined,
    username: string | undefined,
}

const Register = () => {

    const message = useContext(MessageContextProvider);
    const success = message?.success
    const error = message?.error
    const warning = message?.warning

    const [data, setData] = useState<IFormRegister>({
        email: undefined,
        phone: undefined,
        role: "CUSTOMER",
        address: undefined,
        password: undefined,
        dateOfBirth: undefined,
        fullname: undefined,
        username: undefined
    })
    const navigate = useNavigate()

    const submitFormLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, phone, address, password, dateOfBirth, fullname, username } = data
        if (!email || !phone || !address || !password ||
            !dateOfBirth || !fullname || !username) {
            warning('Vui lòng nhập đầy đủ thông tin ạ...')
        } else {
            const res = await register(data)
            if (res?.code === 200) {
                success("Thành công!!!")
                navigate("/login")
            } else {
                error(res?.msg)
            }
        }
    };

    const changeInfor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const navigateHome = async (e: any) => {
        e.preventDefault();
        navigate('/')
    };

    return (
        <div className='Form'>
            <div>
                <div className='register-form'>
                    <h1 onClick={navigateHome}>FILM BOOKING</h1>
                    <form onSubmit={submitFormLogin}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id='email'
                                type="email"
                                name='email'
                                placeholder='email@gmail.com'
                                onChange={changeInfor}
                            />
                        </div>
                        <div>
                            <label htmlFor="fullname">Họ và tên:</label>
                            <input
                                id='fullname'
                                type="text"
                                name='fullname'
                                placeholder='typing...'
                                onChange={changeInfor}
                            />
                        </div>

                        <div>
                            <label htmlFor="dateOfBirth">Ngày sinh:</label>
                            <input
                                id='dateOfBirth'
                                type="date"
                                name='dateOfBirth'
                                placeholder=''
                                onChange={changeInfor}
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Địa chỉ:</label>
                            <input
                                id='address'
                                type="text"
                                name='address'
                                placeholder='address'
                                onChange={changeInfor}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone">Điện thoại:</label>
                            <input
                                id='phone'
                                type="text"
                                name='phone'
                                placeholder='phone'
                                onChange={changeInfor}
                            />
                        </div>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                id='username'
                                type="text"
                                name='username'
                                placeholder='username'
                                onChange={changeInfor}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                id='password'
                                type="password"
                                name='password'
                                placeholder='******'
                                onChange={changeInfor}
                            />
                        </div>

                        <br />
                        <br />
                        <button>Đăng Ký</button>
                    </form>

                    <p>Bạn đã có tài khoản <Link to='/login'>Đăng Nhập</Link></p>
                </div>

                <div className='img-loginform'>
                    <img src={"https://kaliforms.com/wp-content/uploads/2021/04/movie-ticket-booking-form-scaled.jpg"} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Register