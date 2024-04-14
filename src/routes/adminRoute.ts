import { MenuItem } from "../types/MenuItem";

export const listSidebarAdmin: MenuItem[] = [
    {
        titleSidebar: "Danh sách rạp",
        key: "theater-list",
        url: "theater-list",
    },
    {
        titleSidebar: "Danh sách tài khoản admin",
        key: "admin-accounts",
        url: "admin-accounts",
    },
    {
        titleSidebar: "Danh sách tài khoản khách",
        key: "guest-accounts",
        url: "guest-accounts",
    },
    {
        titleSidebar: "Tạo mới tài khoản admin",
        key: "create-account",
        url: "create-account",
    },
    {
        titleSidebar: "Tạo mới rạp",
        key: "create-theater",
        url: "create-theater",
    },
    {
        titleSidebar: "Danh sách phim",
        key: "movie-list",
        url: "movie-list",
    },
    {
        titleSidebar: "Tạo phim",
        key: "create-movies",
        url: "create-movies",
    },
];