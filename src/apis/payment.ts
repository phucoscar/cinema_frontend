import { callApi } from "./callAPI"

// payment-service/api/v1/payment/create-payment
// public class OrderRequestDTO {
//     private Long amount;
//     private String orderInfor;
// }
// getmapping
export const createPayment = async(
    data: {
        amount: number
        orderInfor?: string
    }
) => {
    return await callApi<any>(`payment-service/api/v1/payment/create-payment`, "get", data)
}

// payment-service/api/v1/payment/result-info
// private Integer scheduleId;
//     private Integer userId;
//     private List<String> seats;
//     private String responseCode;

export const resultInfoPayment = async(
    data: {
        scheduleId: number
        userId: number
        responseCode: string
        seats: string[]
    }
) => {
    console.log(data)
    return await callApi<any>(`payment-service/api/v1/payment/result-info`, "post", data)
}
