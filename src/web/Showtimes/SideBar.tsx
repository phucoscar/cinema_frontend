import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

interface ISideBar {
  listTheater: any
  setTheater: any
}

const SideBar: React.FC<ISideBar> = ({ listTheater, setTheater }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    if(listTheater) {
      const data = listTheater.filter((value: any) => value.id === Number(id) )
      setTheater(data[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listTheater])
  return (
    <div className='SideBar-Showtimes'>
      {listTheater && listTheater.map((value: any, index: number) => {
        return (
          <div className={`name_theater-SideBar ${Number(id) === value.id? "check_name_theater-SideBar" :""}`} key={index}
            onClick={() => {
              setTheater(value)
              navigate(`/showtimes/${value.id}`)
            }}
          >
            <div>
              <span>
                <img src="https://res.cloudinary.com/dbduzdrla/image/upload/v1703260547/phuc/movie_qa1l92.png" alt="" />
                &nbsp;&nbsp;{value.name}
              </span>
              <img src="https://res.cloudinary.com/dbduzdrla/image/upload/v1703260409/phuc/next_1_r9ypi8.png" alt="" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SideBar