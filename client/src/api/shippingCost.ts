import axios from "axios";
import {getTokenFormat} from "../utils/helper";

export function getShippingCost() {
    return axios.get(`/customer/order/shipping`, getTokenFormat())
}
