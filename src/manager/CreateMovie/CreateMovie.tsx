import React, { useContext, useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import type { DatePickerProps } from 'antd';
import type { SelectProps } from 'antd';
import UploadImage from '../../components/UploadImage/UploadImage';
import { createMovies } from '../../apis/movie';
import { converThumnails } from '../../components/FuctionGlobal';
import { MessageContextProvider } from '../../contexts/MessageContext';

type FieldType = {};

// Tên phim, Thể loại, Mô tả, Ngày phát hành, Thời lượng(phút), Ảnh thumbnails
const CreateMovie = () => {
    const initialValues = {}

    const mess = useContext(MessageContextProvider)
    const success = mess?.success
    const error = mess?.error

    const [file, setFile] = useState<any>()

    const [data, setData] = useState<any>()

    const options: SelectProps['options'] = [
        {
            label: "Hài",
            value: 1
        },
        {
            label: "Hành động",
            value: 2
        },
        {
            label: "Kinh dị",
            value: 3
        },
        {
            label: "Gia đình",
            value: 4
        },
        {
            label: "Lãng mạn",
            value: 5
        },
        {
            label: "Khoa học - Viễn tưởng",
            value: 6
        },
        {
            label: "Hoạt hình",
            value: 7
        },
        {
            label: "Tài liệu",
            value: 8
        }
    ];


    const handleChange = (value: string[]) => {
        setData({
            ...data,
            typeIds: value
        })
    };
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setData({
            ...data,
            releaseDate: dateString
        })
    };
    const onFinish = async (values: FieldType) => {
        const newFile = converThumnails(file)
        const req = {
            ...values,
            ...data,
            ...newFile
        }
        const res = await createMovies(req)
        if(res?.code === 200) {
            success("Tạo mới phim thành công!!!!!!")
        } else {
            error(res?.msg)
        }
    };

    return (
        <div className='MovieSchedule'>
            <header>Tạo phim mới</header>
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
                    label="Tên phim"
                    name="name"
                    rules={[{ required: true, message: 'Bạn cần nhập tên phim!' }]}
                >
                    <Input placeholder='' />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Thể loại"
                    name="typeIds"
                    rules={[{ required: true, message: 'không được bỏ trống!' }]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Lựa chọn thể loại phim..."
                        onChange={handleChange}
                        options={options}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'không được bỏ trống!' }]}
                >
                    <Input placeholder='' />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Ngày phát hành"
                    name="releaseDate"
                    rules={[{ required: true, message: 'không được bỏ trống!' }]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        onChange={onChange}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Thời lượng(phút)"
                    name="duration"
                    rules={[{ required: true, message: 'không được bỏ trống!' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder=''
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Ảnh thumbnails"
                >
                    <UploadImage setFile={setFile} />
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

export default CreateMovie