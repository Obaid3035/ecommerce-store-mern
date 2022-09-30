import axios from "axios";
import { getTokenFormat, PAGINATION_LIMIT } from "../../utils/helper";

export function getSubCategories(page: number, searchText: string) {
  return axios.get(
    `/admin/sub-category?page=${page}&size=${PAGINATION_LIMIT}&search=${searchText}`,
    getTokenFormat()
  );
}

export function createSubCategories(userInput: any) {
  return axios.post(`/admin/sub-category`, userInput, getTokenFormat());
}

export function updateSubCategories(userInput: any, categoryId: string) {
  return axios.put(
    `/admin/sub-category/${categoryId}`,
    userInput,
    getTokenFormat()
  );
}

export function getSubCategoryById(categoryId: string) {
  return axios.get(`/admin/sub-category/${categoryId}`, getTokenFormat());
}

export function deleteSubCategory(categoryId: string) {
  return axios.delete(`/admin/sub-category/${categoryId}`, getTokenFormat());
}

export function getSubCategoryOptions() {
  return axios.get("/admin/sub-category-select", getTokenFormat())
}

export function getCategoryByParentOption(parentCategoryId: string) {
  return axios.get(`/admin/sub-category-select/${parentCategoryId}`, getTokenFormat())
}
