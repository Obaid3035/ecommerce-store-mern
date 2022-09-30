import axios from "axios";
import { getTokenFormat, PAGINATION_LIMIT } from "../../utils/helper";

export function getCoupon(page: number, searchText: string) {
  return axios.get(`/admin/coupon?page=${page}&size=${PAGINATION_LIMIT}&search=${searchText}`, getTokenFormat());
}

export function deleteCoupon(couponId: string){
  return axios.delete(`/admin/coupon/${couponId}`,  getTokenFormat())
}


export function createCoupon(userInput: any){
  return axios.post(`/admin/coupon`,  userInput, getTokenFormat())
}

export function editCoupon(userInput: any, couponID: string){
  return axios.put(`/admin/coupon/${couponID}`,  userInput, getTokenFormat())
}

export function getCouponById(couponId: string) {
  return axios.get(`/admin/coupon/${couponId}`,  getTokenFormat())
}
