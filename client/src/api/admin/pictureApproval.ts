import axios from "axios";
import {getTokenFormat} from "../../utils/helper";

export function createPictureApproval(userInput: any) {
    return axios.post("/admin/picture-approval", userInput)
}

export function getPictureApproval() {
    return axios.get("/admin/picture-approval",  getTokenFormat())
}
