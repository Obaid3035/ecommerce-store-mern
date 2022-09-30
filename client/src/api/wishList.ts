import axios from "axios";
import {getTokenFormat} from "../utils/helper";

export function getWishList() {
    return axios.get(`/wishlist`, getTokenFormat())
}

export function createWishList(productId: string) {
    return axios.post(`/wishlist/${productId}`, {}, getTokenFormat())
}


export function deleteWishList(wishList: string) {
    return axios.delete(`/wishlist/${wishList}`, getTokenFormat())

}
