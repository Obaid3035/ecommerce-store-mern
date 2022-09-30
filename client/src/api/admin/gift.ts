import axios from "axios";
import { getTokenFormat, PAGINATION_LIMIT } from "../../utils/helper";


export function getGift(page: number) {
  return axios.get(`/admin/e-gift?page=${page}&size=${PAGINATION_LIMIT}`, getTokenFormat());
}

export function getGiftHistory(page: number) {
  return axios.get(`/admin/e-gift/history?page=${page}&size=${PAGINATION_LIMIT}`, getTokenFormat())
}

export const createGift = (userInput: any) => {
  return axios.post(`/admin/e-gift`, userInput, getTokenFormat())
}

export const deleteGift = (giftId: string) => {
  return axios.delete(`/admin/e-gift/${giftId}`, getTokenFormat())
}

export function getGiftById(giftId: string) {
  return axios.get(`/admin/e-gift/${giftId}`, getTokenFormat())
}


export function updateGiftById(giftId: string, userInput: any) {
  return axios.put(`/admin/e-gift/${giftId}`, userInput, getTokenFormat())
}
