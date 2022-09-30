import axios from "axios";
import { getTokenFormat } from "../../utils/helper";

export function getShippingCost() {
  return  axios.get("/shipping-cost", getTokenFormat())
}

export function updateShippingCost(userInput: any, shippingCostId: string) {
  return axios.put(`/shipping-cost/${shippingCostId}`, userInput, getTokenFormat())
}
