import axios from "axios";
import { getTokenFormat, PAGINATION_LIMIT } from "../../utils/helper";

export function getTax(page: number, searchText: string){
  return axios.get(`/admin/tax?page=${page}&size=${PAGINATION_LIMIT}&search=${searchText}`, getTokenFormat())
}

export function updateTax(userInput: any, taxId: string) {
  return axios.put(`/admin/tax/${taxId}`, userInput, getTokenFormat())
}
