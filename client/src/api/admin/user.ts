import axios from "axios";
import { getTokenFormat, PAGINATION_LIMIT } from "../../utils/helper";

export function getUsers(page: number) {
  return axios.get(`/admin/user?page=${page}&size=${PAGINATION_LIMIT}`, getTokenFormat())
}

export function createUsers(userInput: any) {
  return axios.post(`/admin/user`, userInput, getTokenFormat())
}

export function getUserById(userId: string) {
  return axios.get(`/admin/user/${userId}`, getTokenFormat())
}

export function updateUsers(userInput: any, userId: string) {
  return axios.put(`/admin/user/${userId}`, userInput, getTokenFormat())
}

export function deleteUsers(userId: string) {
  return axios.delete(`/admin/user/${userId}`, getTokenFormat())
}
