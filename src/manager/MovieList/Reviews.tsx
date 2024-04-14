import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFilmById } from '../../apis/movie';
import { Image } from 'antd';
import { converDate } from '../../components/FuctionGlobal';
import ListComment from './ListComment';

const Reviews = () => {

  const { id } = useParams()

  const [data, setData] = useState<any>()

  useEffect(() => {
    if (id) {
      (async () => {
        const res = await getFilmById({ id: Number(id) })
        if (res?.code === 200) {
          setData(res.data)
        }
      })()
    }
  }, [id])

  if (!data) return <></>

  const urlImg = data.thumnails[0].url
  return (
    <div className='Reviews MovieSchedule'>
      <header>Chi tiết phim</header>
      <div className='left_Detail'>
        <Image
          width={250}
          src={urlImg}
        />
        <div>
          <span style={{fontWeight: "bold", fontSize: "1.1rem"}}>Tên phim: {data.name}</span>
          <span>Thể loại: </span>
          <span>Mô tả: {data.description}</span>
          <span>Thời lượng: {data.duration}phút</span>
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

      <div>
        <p className='review_people'>Đánh giá từ người xem</p>
        {
          data.ratings && data.ratings.map((rating: any) => {
            return (
              <ListComment data={rating} />
            )
          })
        }
      </div>

    </div>
  )
}

export default Reviews