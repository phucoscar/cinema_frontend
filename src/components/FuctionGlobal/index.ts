export const converDate = (startTimeISO: string | any) => {

    const startTimeDate: Date = new Date(startTimeISO);

    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const startTimeFormatted: string = startTimeDate.toLocaleDateString('vi-VN', options);

    return startTimeFormatted
}

export const converTime = (startTimeISO: string | any) => {

    // Chuyển đổi từ ISO 8601 sang đối tượng Date
    const startTimeDate: Date = new Date(startTimeISO);

    // Lấy giờ và phút từ đối tượng Date
    const hours: number = startTimeDate.getHours();
    const minutes: number = startTimeDate.getMinutes();

    // Định dạng giờ và phút
    const startTimeFormatted: string = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    // In ra kết quả
    return startTimeFormatted
}

export function converThumnails(arr: any[]): { [key: string]: any } {
    const result: { [key: string]: any } = {};

    if (arr) {
        arr.forEach((value, index) => {
            if (value.originFileObj) {
                result[`thumnails[${index}]`] = value.originFileObj;
            }
        });
    }

    return result;
}

export const postingTime = (date: any) => {
    let currentMin = (new Date()).getMinutes()
    let currentHour = (new Date()).getHours()
    let currentDay = (new Date()).getDate()
    let currentMonth = (new Date()).getMonth()
    let currentYear = (new Date()).getFullYear()

    if (currentYear - date.getFullYear() <= 1) {
        if (currentYear - date.getFullYear() < 1) {
            if (currentMonth - date.getMonth() <= 1) {
                if (currentMonth - date.getMonth() < 1) {
                    if (currentDay - date.getDate() <= 1) {
                        if (currentDay - date.getDate() < 1) {
                            if (currentHour - date.getHours() <= 1) {
                                if (currentHour - date.getHours() < 1) {
                                    return `${currentMin - date.getMinutes()} phút trước`;
                                } else {
                                    if (currentMin + (60 - date.getMinutes()) > 60) {
                                        return `${currentHour - date.getHours()} giờ trước`;
                                    } else {
                                        return `${currentMin + (60 - date.getMinutes())} phút trước`;
                                    }
                                }
                            } else {
                                return `${currentHour - date.getHours()} giờ trước`;
                            }
                        } else {
                            if (currentHour + (24 - date.getHours()) > 24) {
                                return `${currentDay - date.getDate()} ngày trước`;
                            } else {
                                return `${currentHour + (24 - date.getHours())} giờ trước`;
                            }
                        }
                    } else {
                        return `${currentDay - date.getDate()} ngày trước`;
                    }
                } else {
                    if (currentDay + (30 - date.getDate()) > 30) {
                        return `${currentMonth - date.getMonth()} tháng trước`;
                    } else {
                        return `${currentDay + (30 - date.getDate())} ngày trước`;
                    }
                }
            } else {
                return `${currentMonth - date.getMonth()} tháng trước`;
            }
        } else {
            if (currentMonth + (12 - date.getMonth()) > 12) {
                return `${currentYear - date.getFullYear()} năm trước`;
            } else {
                return `${currentMonth + (12 - date.getMonth())} tháng trước`;
            }
        }
    } else {
        return `${currentYear - date.getFullYear()} năm trước`;
    }

}

export function formatVNDCurrency(value: number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return formatter.format(value);
}

export function formatVNDCurrency1(value: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const formattedValue = formatter.format(value);

    // Remove the currency symbol ₫ and replace it with VND
    const formattedResult = formattedValue.replace(/₫/g, 'VND');

    return formattedResult;
}