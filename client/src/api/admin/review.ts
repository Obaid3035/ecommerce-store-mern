import axios from "axios";
import {getTokenFormat, PAGINATION_LIMIT} from "../../utils/helper";

export const getAllReviews = (page: number) => {
    return axios.get(`/admin/reviews?page=${page}&size=${PAGINATION_LIMIT}`, getTokenFormat())
}

export const getAllApprovedReviews = (page: number) => {
    return axios.get(`/admin/reviews/approved?page=${page}&size=${PAGINATION_LIMIT}`, getTokenFormat())
}

export const getAllRejectedReviews = (page: number) => {
    return axios.get(`/admin/reviews/rejected?page=${page}&size=${PAGINATION_LIMIT}`, getTokenFormat())
}

export const toApprovedReview = (reviewId: string) => {
    return axios.put(`/admin/reviews/approved/${reviewId}`, {}, getTokenFormat())
}

export const toRejectedReview = (reviewId: string) => {
    return axios.put(`/admin/reviews/rejected/${reviewId}`, {}, getTokenFormat())
}
