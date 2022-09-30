import axios from "axios";
import {getTokenFormat, PAGINATION_LIMIT} from "../utils/helper";

export function getCustomerOrder(page: number) {
    return axios.get(`/customer/order?page=${page}&size=${PAGINATION_LIMIT}`, getTokenFormat())
}

export function getGiftByCode(code: string) {
    return axios.get(`/customer/order/gift/${code}`);
}

export function getCouponByCode(code: string) {
    return axios.get(`/customer/order/coupon/${code}`);
}

export function createOrder(userInput: any) {
    return axios.post(`/customer/order`, userInput)
}

export function createPaymentIntent(userInput: any) {
    return axios.post(`/customer/order/payment-intent`, userInput)
}

export function getTaxOption() {
    return axios.get(`/customer/order/tax`);
}

export function toDisputedOrder(orderId: string, message: string) {
    return axios.put(`/customer/order/dispute/${orderId}`, {message}, getTokenFormat())
}


export function getShippingDetail() {
    return axios.get(`/customer/order/shipping`, getTokenFormat())
}

export function getCostDetail(taxId: string) {
    return axios.get(`/customer/order/cost/${taxId}`)
}

export function createShippingDetails(userInput: any) {
    return axios.post(`/customer/order/shipping`, userInput, getTokenFormat())
}
