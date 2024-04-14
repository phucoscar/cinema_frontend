import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
interface IUploadImage {
    setFile?: any
    listFile?: any
    setDeleteThumbnails?: any
    deleteThumbnails?: any
}

const checkObjectInArray = (arr: any, obj: any) => {
    return arr.find((item: any) => item.id === obj.id);
};

const filterArray = (array1: any, array2: any) => {
    const deleteElement = array1.filter((element: any) => {
        if (element.id) {
            return !checkObjectInArray(array2, element)
        }
        return []
    })

    return deleteElement
}

const UploadImage: React.FC<IUploadImage> = ({ setFile, listFile, deleteThumbnails, setDeleteThumbnails}) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);


    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        if (newFileList.length > 0) {
            const length = newFileList.length

            const isJpgOrPng = newFileList[length - 1].type === 'image/jpeg' || newFileList[length - 1].type === 'image/png' || newFileList[length - 1].uid;
            if (!isJpgOrPng) {
                message.error('Bạn chỉ có thể tải lên tệp JPG/PNG!');
            } else {
                setFileList(newFileList)
                if(true) {
                    setFile(newFileList)
                }
                const check = filterArray(fileList, newFileList)
                if (check.length && check[0].id && setDeleteThumbnails) {
                    setDeleteThumbnails([
                        ...deleteThumbnails,
                        check[0].id
                    ])
                }
            }
        }
    }

    // const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList)

    useEffect(() => {
        if (listFile) {
            setFileList(listFile)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listFile?.length])
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileList}
            // beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {fileList.length >= 8 ? null : uploadButton}
        </Upload>
    )
}

export default UploadImage