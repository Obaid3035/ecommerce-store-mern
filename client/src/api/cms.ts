import axios from "axios";
import {getTokenFormat} from "../utils/helper";

export function getHomePage() {
    return axios.get(`/admin/cms/home`)
}

export function updateHomePage(userInput: any) {
    return axios.put(`/admin/cms/home`, userInput, getTokenFormat())
}

export function getAboutPage() {
    return axios.get(`/admin/cms/about`)
}

export function updateAboutPage(userInput: any) {
    return axios.put(`/admin/cms/about`, userInput, getTokenFormat())
}

export function getFooter() {
    return axios.get(`/admin/cms/footer`)
}

export function updateFooter(userInput: any) {
    return axios.put(`/admin/cms/footer`, userInput, getTokenFormat())
}

export function getContact() {
    return axios.get(`/admin/cms/contact`)
}

export function updateContact(userInput: any) {
    return axios.put(`/admin/cms/contact`, userInput, getTokenFormat())
}

export function getTerm() {
    return axios.get(`/admin/cms/term`)
}

export function updateTerm(userInput: any) {
    return axios.put(`/admin/cms/term`, userInput, getTokenFormat())
}

export function getPolicy() {
    return axios.get(`/admin/cms/policy`)
}

export function updatePolicy(userInput: any) {
    return axios.put(`/admin/cms/policy`, userInput, getTokenFormat())
}


export function getFaq() {
    return axios.get(`/admin/cms/faq`)
}

export function updateFaq(userInput: any) {
    return axios.put(`/admin/cms/faq`, userInput, getTokenFormat())
}


