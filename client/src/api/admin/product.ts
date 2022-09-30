import axios from "axios";
import { getTokenFormat, PAGINATION_LIMIT } from "../../utils/helper";

export function getProduct(page: number, searchText: string) {
  return axios.get(`/admin/product?page=${page}&size=${PAGINATION_LIMIT}&search=${searchText}`, getTokenFormat()
  );
}

export function createProduct(userInput: any) {
  return axios.post(`/admin/product`, userInput, getTokenFormat());
}

export function updateProduct(userInput: any, productId: string) {
  return axios.put(
    `/admin/product/${productId}`,
    userInput,
    getTokenFormat()
  );
}

export function getProductById(productId: string) {
  return axios.get(`/admin/product/${productId}`, getTokenFormat());
}

export function deleteProduct(productId: string) {
  return axios.delete(`/admin/product/${productId}`, getTokenFormat());
}


export function deleteImage(productId: string, userInput: any) {
  return axios.post(`/admin/product/${productId}`, userInput, getTokenFormat());
}


export function uploadImages(productId: string, userInput: any) {
  return axios.put(`/admin/product/upload-images/${productId}`, userInput, getTokenFormat());
}





