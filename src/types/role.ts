enum typeRole {
    "SUPER_ADMIN",
    "ADMIN",
    "CUSTOMER",
}

export interface role {
    id: number
    name: typeRole
}