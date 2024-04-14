import { MenuItem } from "../types/MenuItem";

// Lịch chiếu phim, Lên lịch chiếu phim, Lịch sử chiếu, Tạo phòng, Danh sách phòng, Tạo phim, Danh  sách phim

export const listSidebarStaff: MenuItem[] = [
    {
        titleSidebar: "Thống kê",
        key: "statistical",
        url: "statistical",
    },
    {
        titleSidebar: "Lịch chiếu phim",
        key: "movie-schedule",
        url: "movie-schedule",
    },
    {
        titleSidebar: "Lên lịch chiếu phim",
        key: "schedule-movie-showings",
        url: "schedule-movie-showings",
    },
    {
        titleSidebar: "Lịch sử chiếu",
        key: "projection-history",
        url: "projection-history",
    },
    {
        titleSidebar: "Tạo phòng",
        key: "create-room",
        url: "create-room",
    },
    {
        titleSidebar: "Danh sách phòng",
        key: "room-list",
        url: "room-list",
    },
    {
        titleSidebar: "Danh  sách phim",
        key: "movie-list",
        url: "movie-list",
    },
];