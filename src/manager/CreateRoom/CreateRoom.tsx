import React, { useContext, useEffect } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { MoviesContextProvider } from '../../contexts/Movies';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { MessageContextProvider } from '../../contexts/MessageContext';
import { createRoom } from '../../apis/theater';

type FieldType = {};

const CreateRoom = () => {

    const auth = useContext(AuthContextProvider)
    const user = auth?.userState.user

    const moviesContext = useContext(MoviesContextProvider)
    const findCinema = moviesContext?.findCinema
    const cinema = moviesContext?.movies.cinema

    const mess = useContext(MessageContextProvider)
    const success = mess?.success
    const error = mess?.error

    const initialValues = {}
    const onFinish = async(value: any) => {
        const req = {
            ...value,
            cinemaId: cinema.id
        }
        const res = await createRoom(req)
        if(res?.code === 200) {
            success("Tạo phòng thành công :vv")
        }else {
            error(res?.msg)
        }
    }

    useEffect(() => {
        if (user) {
            findCinema(user.id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <div className='MovieSchedule'>
            <header>Tạo phòng </header>

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
                initialValues={initialValues}
            >
                <Form.Item<FieldType>
                    label="Tên phòng"
                    name="name"
                    rules={[{ required: true, message: 'Không được để trống!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Số hàng ghế"
                    name="verticalSeats"
                    rules={[{ required: true, message: 'Không được để trống!' }]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Số chỗ mỗi hàng"
                    name="horizontalSeats"
                    rules={[{ required: true, message: 'Không được để trống!' }]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default CreateRoom