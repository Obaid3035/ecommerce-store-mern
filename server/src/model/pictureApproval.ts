import {model, Schema} from "mongoose";
import {IPictureApproval} from "../interface";

const PictureApprovalSchema: Schema<IPictureApproval> = new Schema({
  avatar: String,
  cloudinary_id: String,
});


const PictureApproval = model<IPictureApproval>('pictureApproval', PictureApprovalSchema);

export default PictureApproval;
