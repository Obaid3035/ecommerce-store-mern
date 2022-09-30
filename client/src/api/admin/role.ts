import axios from "axios";
import { getTokenFormat, PAGINATION_LIMIT } from "../../utils/helper";

export function getRole(page: number) {
  return axios.get(`/admin/roles?page=${page}&size=${PAGINATION_LIMIT}`, getTokenFormat());
}

export function deleteRole(roleId: string){
  return axios.delete(`/admin/roles/${roleId}`,  getTokenFormat())
}

export function createRole(userInput: any){
  return axios.post(`/admin/roles`,  userInput, getTokenFormat())
}


export function editRole(userInput: any, roleId: string){
  return axios.put(`/admin/roles/${roleId}`,  userInput, getTokenFormat())
}

export function getRoleById(roleId: string) {
  return axios.get(`/admin/roles/${roleId}`,  getTokenFormat())
}


export function roleSelect() {
  return axios.get(`/admin/roles-select`,  getTokenFormat())
}
