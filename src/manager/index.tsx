import { Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import Siderbar from "../components/Siderbar/Siderbar";

import Statistical from "./Statistical/Statistical";
import MovieSchedule from "./MovieSchedule/MovieSchedule";
import UpdateSchedule from "./MovieSchedule/UpdateSchedule";
import ShowOrder from "./MovieSchedule/ShowOrder";
import ScheduleMovieShowings from "./ScheduleMovieShowings/ScheduleMovieShowings";
import ProjectionHistory from "./ProjectionHistory/ProjectionHistory";
import CreateRoom from "./CreateRoom/CreateRoom";
import RoomList from "./RoomList/RoomList";
import CreateMovie from "./CreateMovie/CreateMovie";
import MovieList from "./MovieList/MovieList";
import Reviews from "./MovieList/Reviews";
import UpdateInfor from "../components/PersonalInformation/UpdateInfor";

const Manager = () => {
  return (
    <div className="manager">
      <Header /> 
      <div>
        <Siderbar />
        <div className="content">
          <Routes>
            <Route path="/statistical" element={<Statistical />} />

            <Route path="/movie-schedule" element={<MovieSchedule />} />
            <Route path="/movie-schedule/update/:id" element={<UpdateSchedule />} />
            <Route path="/movie-schedule/view-all-booking/:id" element={<ShowOrder />} />

            <Route path="/schedule-movie-showings" element={<ScheduleMovieShowings />} />

            <Route path="/projection-history" element={<ProjectionHistory />} />
            <Route path="/projection-history/view-all-booking/:id" element={<ShowOrder />} />

            <Route path="/create-room" element={<CreateRoom />} />

            <Route path="/room-list" element={<RoomList />} />

            <Route path="/create-movies" element={<CreateMovie />} />

            <Route path="/movie-list" element={<MovieList />} />
            <Route path="/movie-list/:id" element={<Reviews />} />
            
            <Route path="/update-information" element={<UpdateInfor />} />

          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Manager