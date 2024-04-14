import React, { useContext } from 'react';
import { Button, Image, Modal } from 'antd';
import { converDate } from '../../components/FuctionGlobal';
import { useNavigate } from 'react-router-dom';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { CloseOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { MessageContextProvider } from '../../contexts/MessageContext';
import { deleteMovie } from '../../apis/movie';
const { confirm } = Modal;

interface IDetail {
    key: number
    data: any
    getFilms?: any
}

const Detail: React.FC<IDetail> = ({data, getFilms }) => {

    const navigate = useNavigate()
    const auth = useContext(AuthContextProvider)
    const user = auth?.userState.user

    const mess = useContext(MessageContextProvider)
    const success = mess?.success
    const error = mess?.error

    const showLogoutModal = (id: number) => {
        confirm({
            title: "Bạn có chắc chắn muốn xóa???",
            icon: <ExclamationCircleFilled />,
            okText: "Xóa",
            okType: 'danger',
            closeIcon: <CloseOutlined />,
            cancelText: "Hủy",
            async onOk() {
                try {
                    const res = await deleteMovie({ id: id });
                    if (res?.code === 200) {
                        getFilms()
                        success("Xoá thành công")
                    }
                    else {
                        error(res?.msg)
                    }
                } catch (error) {
                    console.log('', error);
                }
            },
            onCancel() { },
        });
    };

    if (!data) return <></>

    const type = data.types.map((type: any) => type.name)

    const urlImg = data.thumnails[0]?.url ? data.thumnails[0]?.url : ""
    return (
        <div className='Detail' key={data.id}>
            <div className='left_Detail'>
                <Image
                    width={250}
                    src={urlImg}
                    style={{minWidth: 250}}
                />
                <div>
                    <span style={{fontWeight: "bold", fontSize:"1.1rem"}}>Tên phim: {data.name}</span>
                    <span>Thể loại: {type.map((value: any, index: number) => <div key={index}>{value}{type.length - 1 === index ? "" : ", "}</div>)}</span>
                    <span>Mô tả: {data.description}</span>
                    <span>Thời lượng: {data.duration} phút</span>
                    <span>Ngày phát hành: {converDate(data.releaseDate)}</span>
                    <span style={{ alignItems: "center", display: "flex" }}>
                        Đánh giá: {data.score ? data.score : "Chưa có đánh giá"}
                        {
                            data.score && <img
                                style={{ width: "1rem" }}
                                src="https://res.cloudinary.com/dbduzdrla/image/upload/v1702803666/phuc/star_i5npej.png" alt=""
                            />
                        }
                    </span>
                </div>
            </div>

            <div className='right_Detail'>
                <div>
                    {
                        user && user.role.name === "SUPER_ADMIN" ?
                            <>
                                <Button
                                    onClick={() => {
                                        navigate(`/super-admin/movie-list/update/${data.id}`)
                                    }}
                                >Sửa</Button><br /><br />
                                <Button danger
                                    onClick={() => {
                                        showLogoutModal(data.id)
                                    }}
                                >Xóa</Button><br /><br />
                            </>
                            :
                            <></>
                    }

                    <Button
                        onClick={() => {
                            navigate(`${user?.role.name === "ADMIN" ? `${`/admin/movie-list/${data.id}`}` : user?.role.name === "SUPER_ADMIN" ? `${`/super-admin/movie-list/${data.id}`}` : `${`/movie-list/${data.id}`}`}`)
                        }}>Xem chi tiết
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Detail