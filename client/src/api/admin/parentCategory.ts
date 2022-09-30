import axios from "axios";
import { getTokenFormat, PAGINATION_LIMIT } from "../../utils/helper";

export function getParentCategory(page: number, searchText: string) {
    return axios.get(
        `/admin/parent-category?page=${page}&size=${PAGINATION_LIMIT}&search=${searchText}`,
        getTokenFormat()
    );
}

export function createParentCategory(userInput: any) {
    return axios.post(`/admin/parent-category`, userInput, getTokenFormat());
}

export function updateParentCategory(userInput: any, productTypeId: string) {
    return axios.put(
        `/admin/parent-category/${productTypeId}`,
        userInput,
        getTokenFormat()
    );
}

export function getParentCategoryById(productTypeId: string) {
    return axios.get(`/admin/parent-category/${productTypeId}`, getTokenFormat());
}

export function deleteParentCategory(productTypeId: string) {
    return axios.delete(`/admin/parent-category/${productTypeId}`, getTokenFormat());
}

export function getParentCategoryOptions() {
    return axios.get("/admin/parent-category-select", getTokenFormat())
}

export function getAllParentCategory() {
    return axios.get("/parent-category", getTokenFormat())
}
