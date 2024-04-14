import React, { useContext, useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import type { SelectProps } from 'antd';
import UploadImage from '../../components/UploadImage/UploadImage';
import { getFilmById, updateMovie } from '../../apis/movie';
import { converThumnails } from '../../components/FuctionGlobal';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from "dayjs";
import { MessageContextProvider } from '../../contexts/MessageContext';

type FieldType = {};

// Tên phim, Thể loại, Mô tả, Ngày phát hành, Thời lượng(phút), Ảnh thumbnails
const UpdateMovie = () => {

    const mess = useContext(MessageContextProvider)
    const success = mess?.success
    const error = mess?.error

    const navigate = useNavigate()

    const { id } = useParams()

    const [file, setFile] = useState<any>()

    const [movie, setMovie] = useState<any>()
    const [deleteThumbnails, setDeleteThumbnails] = useState<any>([])

    const dateFormat = "YYYY-MM-DD";

    const lisFile = movie?.thumnails.map((thumnail: any) => {
        return ({
            id: thumnail?.id,
            uid: thumnail?.id,
            name: thumnail?.publicId,
            status: "done",
            url: thumnail?.url,
        })
    })

    const initialValues = {
        ...movie,
        releaseDate: dayjs(movie?.releaseDate),
        types: movie?.types.map((type: any) => {
            return ({
                value: type.id,
                label: type.name
            })
        })
    }

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

    const onFinish = async (values: any) => {
        let checkFile
        if(file) {
            checkFile = file.filter((item: any) => {
                return item.id === undefined
            })
        }
        const newFile = converThumnails(checkFile)
        const { releaseDate, types, name,description, duration } = values
        const newDate = `${releaseDate.$y}-${releaseDate.$M + 1}-${releaseDate.$D}`
        const typeIds = types.map((type: any) => type.value)
        const req = {
            id: Number(id),
            releaseDate: newDate,
            typeIds,
            deleteThumbnails: deleteThumbnails,
            ...newFile,
            name, 
            description,
            duration
        }
        const res = await updateMovie(req)
        if(res?.code === 200) {
            success("Update thành công")
            navigate("/super-admin/movie-list")
        }  else {
            error(res?.msg)
        }
    };

    useEffect(() => {
        if (id) {
            (async () => {
                const res = await getFilmById({ id: Number(id) })
                if (res?.code === 200) {
                    setMovie(res.data)
                }
            })()
        }
    }, [id])

    if (!movie) return <></>

    return (
        <div className='MovieSchedule'>
            <header>Cập nhập phim</header>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                initialValues={initialValues}
                colon={false}
            >

                <Form.Item<FieldType>
                    label="Tên phim"
                    name="name"
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Thể loại"
                    name="types"
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Lựa chọn thể loại phim..."
                        options={options}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Mô tả"
                    name="description"
                >
                    <Input placeholder='' />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Ngày phát hành"
                    name="releaseDate"
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        inputReadOnly={true}
                        format={dateFormat}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Thời lượng(phút)"
                    name="duration"
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder=''
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Ảnh thumbnails"
                    name="thumnails"
                >
                    <UploadImage
                        setFile={setFile}
                        listFile={lisFile}
                        deleteThumbnails={deleteThumbnails}
                        setDeleteThumbnails={setDeleteThumbnails}
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

export default UpdateMovie