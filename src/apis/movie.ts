import { callApi } from "./callAPI"

export const getAllMovies = async() => {
    return await callApi("")
}

// film-service/api/v1/film/create-film
export const createMovies = async(
    data: any
) => {
    return await callApi<any>("film-service/api/v1/film/create-film", "post", data, "multipart/form-data")
}

export const getAllFilms = async() => {
    return await callApi<any>("film-service/api/v1/film", "get")
}

// film-service//api/v1/film/{id}
// truyền lên id
// gửi dạng pathVariable
export const getFilmById = async(
    data: {
        id: number
    }
) => {
    return await callApi<any>(`film-service/api/v1/film/${data.id}`, "post")
}

// film-service/api/v1/film/{id}
// truyền lên  id
// post
// export const updateMovie = async(
//     data: any
// ) => {
//     return await callApi<any>(`film-service/api/v1/film/${data.id}`, "post")
// }

export const updateMovie = async(
    data: any
) => {
    return await callApi<any>(`film-service/api/v1/film/edit`, "post", data, 'multipart/form-data')
}


// film-service/api/v1/film/delete/{id}
// postmapping
export const deleteMovie = async(
    data: {
        id: number
    }
) => {
    return await callApi<any>(`film-service/api/v1/film/delete/${data.id}`, "post")
}

// review-service/api/v1/rating/create-rating
// private Integer filmId;
//     private Integer userId;
//     private Integer star;
//     private String comment;
export const rateMovie = async(
    data: {
        filmId: number,
        userId: number
        star: number,
        comment: string
    }
) => {
    return await callApi<any>(`review-service/api/v1/rating/create-rating`, "post", data)
}

// film-service/api/v1/film/search-film-by-name
// Getmapping
// gửi lên name
export const getMoviesByName = async(
    data: {
        name: string
    }
) => {
    return await callApi<any>(`film-service/api/v1/film/search-film-by-name`, "get", data)
}

// @GetMapping("/films")
//     public Result getFilms( @RequestParam(defaultValue = "0") int page,
//                             @RequestParam(defaultValue = "5") int perPage) {
//         return filmService.getFilms(page, perPage);
//     }
export const getAllFilmsPage = async(
    data: {
        page: number
        perPage: number
    }
) => {
    return await callApi<any>(`film-service/api/v1/film/films`, "get", data)
}