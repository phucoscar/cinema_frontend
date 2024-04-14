import React, { useContext, useState } from 'react'
import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from "dayjs";
import { MessageContextProvider } from '../../contexts/MessageContext';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { editAcount, changePassword } from '../../apis/user';
import { useNavigate } from 'react-router-dom';

const UpdateInfor = () => {

    const auth = useContext(AuthContextProvider)
    const user = auth?.userState.user
    const setUserState = auth?.setUserState

    const mess = useContext(MessageContextProvider)
    const success = mess?.success
    const error = mess?.error
    const warning = mess?.warning

    const navigate = useNavigate()

    const dateFormat = "YYYY-MM-DD" // YYYY/MM/DD;
    const [changeDisplay, setChangeDisplay] = useState<boolean>(true)

    const checkDateOfBrith = user?.dateOfBirth?.replace("/", '-')

    const initialValues = {
        ...user,
        dateOfBrith: checkDateOfBrith ? dayjs(checkDateOfBrith) : "",
        password: ""
    };

    const change = () => {
        setChangeDisplay(!changeDisplay);
    };

    const updateInformation = async (values: any) => {
        const { fullname, email, phone, address, gender, dateOfBrith, username } = values;
        const newDate = `${dateOfBrith.$y}-${dateOfBrith.$M + 1}-${dateOfBrith.$D}`
        const data = {
            id: user?.id,
            fullname: fullname,
            phone: phone,
            address: address,
            email: email,
            gender: gender,
            dateOfBirth: newDate,
            username: username
        };
        try {
            const res = await editAcount(data)
            if (res?.code === 200) {
                success("Thay đổi thông tin thành công")
                setUserState?.({
                    isLogin: true,
                    user: res.data,
                    token: auth?.userState.token
                })

            } else {
                warning(res?.msg)
            }
        } catch (error: any) {
            console.log(error)
        }
    };

    const onChangPassword = async (values: any) => {
        const { password, newPassword, authenticationPassword } = values;
        if (newPassword !== authenticationPassword) {
            error("mật khẩu mới nhập lại sai");
        } else {
            const data = {
                userId: user?.id,
                oldPassword: password,
                newPassword: newPassword,
            };
            try {
                const res = await changePassword(data)
                if (res?.code === 200) {
                    navigate("/login")
                    success("Thay đổi mật khẩu thành công");
                } else {
                    warning(res?.msg)
                }
            } catch (error: any) {
                error(error?.message);
            }
        }
    };

    if (!user) return <></>

    return (
        <div>
            <h3 className='h3custom'>Thay đổi thông tin cá nhân</h3>
            {changeDisplay ? (
                <Form
                    name="personall_form"
                    labelCol={{ flex: "110px" }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 700, margin:"2rem auto" }}
                    onFinish={updateInformation}
                    initialValues={initialValues}
                >

                    <Form.Item label="Email" name="email">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item label="Tên đăng nhập" name="username">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item label="Họ và tên" name="fullname">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="phone">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Địa chỉ" name="address">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Ngày sinh" name="dateOfBrith">
                        <DatePicker
                            inputReadOnly={true}
                            format={dateFormat}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Thay đổi thông tin
                        </Button>
                        <span style={{ padding: "0 1rem" }} />
                        <Button type="link" htmlType="button" onClick={change}>
                            {`Mật khẩu ->`}
                        </Button>
                    </Form.Item>
                </Form>
            )
                :
                (
                    <Form
                        name="basic"
                        labelCol={{ flex: "110px" }}
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{ flex: 1 }}
                        colon={false}
                        style={{ maxWidth: 700, margin:"2rem auto" }}
                        onFinish={onChangPassword}
                        initialValues={initialValues}
                    >
                        <Form.Item label="Email" name="email">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Nhập lại mật khẩu mới"
                            name="authenticationPassword"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                            <Button type="link" htmlType="button" onClick={change}>
                                {`<- Thông tin`}
                            </Button>
                            <span style={{ padding: "0 1rem" }} />
                            <Button type="primary" htmlType="submit">
                                Thay đổi mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                )
            }
        </div>
    )
}

export default UpdateInfor