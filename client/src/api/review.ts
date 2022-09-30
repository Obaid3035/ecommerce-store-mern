import axios from "axios";
import {getTokenFormat} from "../utils/helper";

export function getReviews() {
    return axios.get(`/reviews`)
}

export function getCurrentUserReviews() {
    return axios.get(`/reviews/current`, getTokenFormat())
}

export function createReview(userInput: any, orderId: string) {
    return axios.post(`/reviews/${orderId}`, userInput);
}


export function verifyOrder(orderId: string) {
    return axios.get(`/verify-order/${orderId}`)
}
