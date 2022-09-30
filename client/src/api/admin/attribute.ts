import axios from "axios";
import { getTokenFormat, PAGINATION_LIMIT } from "../../utils/helper";

export function getAttributes(page: number, searchText: string) {
  return axios.get(
    `/admin/attribute?page=${page}&size=${PAGINATION_LIMIT}&search=${searchText}`,
    getTokenFormat()
  );
}

export function deleteAttributes(attributeId: string) {
  return axios.delete(`/admin/attribute/${attributeId}`, getTokenFormat());
}

export function createAttributes(userInput: any) {
  return axios.post(`/admin/attribute`, userInput, getTokenFormat());
}

export function updateAttributes(userInput: any, attributeId: string) {
  return axios.put(
    `/admin/attribute/${attributeId}`,
    userInput,
    getTokenFormat()
  );
}

export function getAttributesById(attributeId: string) {
  return axios.get(`/admin/attribute/${attributeId}`, getTokenFormat());
}

export function getAttributesOptions() {
  return axios.get("/admin/attribute-select", getTokenFormat())
}



