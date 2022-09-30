import { ILogin } from "../../Interfaces";
import axios from "axios";
import { getTokenFormat } from "../../utils/helper";

export const signUp = (userInput: any) => {
  return axios.post("/auth/register", userInput)
}

export const login = (userInput: ILogin) => {
  return axios.post("/auth/login", userInput)
}

export function getProfile() {
  return axios.get("/profile", getTokenFormat())
}

export function updateProfile(userInput: any) {
  return axios.put("/profile", userInput, getTokenFormat())
}

export function resetPassword(userInput: any, token: string) {
  return axios.put("/auth/reset-password", {
    password: userInput.password,
    oldPassword: userInput.oldPassword
  }, { headers: { Authorization: `Bearer ${token}` } })
}

export function authenticate(token: string) {
  return axios.get(`/auth/authorize/${token}`);
}

export function forgetPassword(userInput: any) {
  return axios.post(`/auth/reset-link`, userInput)
}

