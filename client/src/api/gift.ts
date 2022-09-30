import axios from "axios";
import {getTokenFormat, PAGINATION_LIMIT} from "../utils/helper";

export function getCustomerGift(page: number) {
    return axios.get(`/e-gift?page=${page}&size=${PAGINATION_LIMIT}`, getTokenFormat());
}

export function buyGiftCard(userInput: any) {
    return axios.post(`/e-gift`, userInput,getTokenFormat());

}
