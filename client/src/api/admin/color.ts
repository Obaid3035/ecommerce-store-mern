import axios from "axios";
import { getTokenFormat, PAGINATION_LIMIT } from "../../utils/helper";


export function getColor(page: number) {
  return axios.get(
    `/admin/color?page=${page}&size=${PAGINATION_LIMIT}`,
    getTokenFormat()
  );
}

export function createColor(userInput: any) {
  return axios.post(`/admin/color`, userInput, getTokenFormat());
}

export function updateColor(userInput: any, colorId: string) {
  return axios.put(
    `/admin/color/${colorId}`,
    userInput,
    getTokenFormat()
  );
}

export function getColorById(colorId: string) {
  return axios.get(`/admin/color/${colorId}`, getTokenFormat());
}

export function deleteColor(productId: string) {
  return axios.delete(`/admin/color/${productId}`, getTokenFormat());
}

export function getColorOptions() {
  return axios.get("/admin/color-select", getTokenFormat())
}
