export interface MenuItem {
    titleSidebar: string;
    key?: React.Key;
    url: string;
    children?: MenuItem[];
}