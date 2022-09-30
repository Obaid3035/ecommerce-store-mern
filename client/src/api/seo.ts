import axios from "axios";
import {getTokenFormat} from "../utils/helper";

export function showSeo(pageTitle: string) {
    return axios.get(`/seo/${pageTitle}`, getTokenFormat())
}


export function createSeo(userInput: any) {
    return axios.post(`/seo`, userInput, getTokenFormat())
}

export function showMenu() {
    return axios.get(`/menu`)
}


export function createMenu(userInput: any) {
    return axios.post(`/menu`, userInput, getTokenFormat())
}

export function updateMenu(userInput: any, menuId: string) {
    return axios.put(`/menu/${menuId}`, userInput, getTokenFormat())
}
