import React from 'react';
import Avatar from '../../components/Avatar/Avatar';
import { postingTime } from '../../components/FuctionGlobal';
interface IListComment {
    data: any
}

const ListComment:React.FC<IListComment> = ({data}) => {

    const day = postingTime(new Date(data.createdAt))
    return (
        <div className='ListComment'>
            <div className='ListComment_infor'>
                <Avatar
                    width='50px'
                />
                <div className='ListComment_infor_text'>
                    <p>{data.user.fullname? data.user.fullname : "Ho va ten"}</p>
                    <p>{day}</p>
                </div>
            </div>
            <div className='des_ListComment'>
                <p className='star_ListComment'>
                    <img
                        style={{ width: "1rem" }}
                        src="https://res.cloudinary.com/dbduzdrla/image/upload/v1702803666/phuc/star_i5npej.png" alt=""
                    />
                    &nbsp; {`${data.star}/10`}
                </p>
                <div className='content_ListComment'>{data.comment? data.comment: ""}</div>
            </div>
        </div>
    )
}

export default ListComment