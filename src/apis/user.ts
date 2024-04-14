import { callApi } from "./callAPI"

export const findAllAdminAccount = async () => {
    return await callApi<any>("account-service/api/v1/user/admins", "get")
}

export const findAllCustomersAccount = async () => {
    return await callApi<any>("account-service/api/v1/user/customers", "get")
}

export const createAcount = async (
    data: {
        username: string,
        password: string,
        fullname: string,
        dateOfBirth: string,
        address: string,
        email: string,
        phone: string,
    }
) => {
    return await callApi<any>(`account-service/api/v1/sp-admin/create-admin-account`, "post", data)
}

export const findAllAdminAccountWithoutCinema = async () => {
    return await callApi<any>("account-service/api/v1/user/available-admins", "get")
}

// private int id;
//     private String username;
//     private String password;
//     private String fullname;
//     private String dateOfBirth;
//     private String address;
//     private String email;
//     private String phone;
// account-service/api/v1/user/edit-profile
// post

export const editAcount = async (
    // data: {
    //     id?: number
    //     username?: string,
    //     password?: string,
    //     fullname?: string,
    //     dateOfBirth?: string,
    //     address?: string,
    //     email?: string,
    //     phone?: string,
    // }
    data: any
) => {
    return await callApi<any>(`account-service/api/v1/user/edit-profile`, "post", data)
}

// account-service/api/v1/auth/change-password
// @RequestParam Integer userId,
//                          @RequestParam String oldPassword,
//                          @RequestParam String newPassword
export const changePassword = async (
    data: any
) => {
    return await callApi<any>(`account-service/api/v1/auth/change-password`, "get", data)
}

// account-service/api/v1/sp-admin/change-status
export const changeStatus = async (
    data: {
        id: number
    }
) => {
    return await callApi<any>(`account-service/api/v1/sp-admin/change-status?id=${data.id}`, "post")
}
