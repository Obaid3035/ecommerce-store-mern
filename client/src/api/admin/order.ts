import axios from "axios";
import {getTokenFormat, PAGINATION_LIMIT} from "../../utils/helper";

export function getOrder(page: number, searchText: string) {
    return axios.get(`/admin/orders?page=${page}&size=${PAGINATION_LIMIT}&search=${searchText}`, getTokenFormat())
}


export function getPendingOrder(page: number, searchText: string) {
    return axios.get(`/admin/orders/pending?page=${page}&size=${PAGINATION_LIMIT}&search=${searchText}`, getTokenFormat())
}

export function getInProgressOrder(page: number, searchText: string) {
    return axios.get(`/admin/orders/in-progress?page=${page}&size=${PAGINATION_LIMIT}&search=${searchText}`, getTokenFormat())
}

export function getCancelledOrder(page: number, searchText: string) {
    return axios.get(`/admin/orders/cancelled?page=${page}&size=${PAGINATION_LIMIT}&search=${searchText}`, getTokenFormat())
}

export function getCompletedOrder(page: number, searchText: string) {
    return axios.get(`/admin/orders/completed?page=${page}&size=${PAGINATION_LIMIT}&search=${searchText}`, getTokenFormat())
}

export function getOrderById(orderId: string) {
    return axios.get(`/admin/orders/${orderId}`, getTokenFormat())
}


export function toInProgressOrder(orderId: string) {
    return axios.put(`/admin/orders/in-progress/${orderId}`, {},getTokenFormat())
}


export function toCompletedOrder(orderId: string) {
    return axios.put(`/admin/orders/completed/${orderId}`, {},getTokenFormat())
}

export function toCancelledOrder(orderId: string) {
    return axios.put(`/admin/orders/cancelled/${orderId}`, {},getTokenFormat())
}


export function getMonthlySales() {
    return axios.get(`/admin/orders/sales/monthly`,getTokenFormat())
}


export function getYearlySales() {
    return axios.get(`/admin/orders/sales/yearly`,getTokenFormat())
}
