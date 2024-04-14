import { Button, Form, Input, Select } from 'antd'
import { useContext, useEffect, useState } from 'react';
import { findAllAdminAccountWithoutCinema } from '../../apis/user';
import { createCinema } from '../../apis/theater';
import { useNavigate } from 'react-router-dom';
import { MessageContextProvider } from '../../contexts/MessageContext';

type FieldType = {};

// Tên rạp, Địa chỉ, Admin
const CreateTheater = () => {

    const initialValues = {}
    const [options, setOptions] = useState<any>([])
    const [id, setId] = useState<number>()

    const navigate = useNavigate()

    const mess = useContext(MessageContextProvider)
  const success = mess?.success
  const error = mess?.error

    useEffect(() => {
        (async() => {
            const res = await findAllAdminAccountWithoutCinema()
            if(res?.code === 200) {
                const newData = res.data.map((value: any) => {
                    return({
                        ...value,
                        value: value.id,
                        label: value.fullname
                    })
                })
                setOptions(newData)
            }
        })()
    }, [])

    const handleChange = (value: string) => {
        setId(Number(value))
    };

    const onFinish = async (values: FieldType) => {
        const req = {
            adminId: id,
            ...values
        }
        const res = await await createCinema(req)
        if(res?.code === 200) {
            success("Tạo mới rạp thành công ^^")
            navigate("/super-admin/theater-list")
        } else {
            error(res?.msg)
        }
     };

    return (
        <div className='MovieSchedule'>
            <header>Tạo mới rạp</header>
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
                    label="Tên rạp"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng không thể để trống!' }]}
                >
                    <Input placeholder='' />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Vui lòng không thể để trống!' }]}
                >
                    <Input placeholder='' />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Admin"
                    name="id"
                    rules={[{ required: true, message: 'Vui lòng không thể để trống!' }]}
                >
                    <Select
                        placeholder="Lựa chọn admin"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        options={options}
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

export default CreateTheater