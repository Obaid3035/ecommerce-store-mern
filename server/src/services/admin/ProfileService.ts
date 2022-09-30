import { Service } from "typedi";
import { IUser } from "../../interface";
import User from "../../model/user";
import cloudinary from "../../utils/cloudinary";
import { BadRequest } from "../../utils/errorCode";


@Service()
class ProfileService {
  async show( currUserId: string) {
    const profile = await User.findById(currUserId);
    return profile
  }

  async update(userInput: IUser, currUser: IUser, file: { path: string }) {
    if (file) {
      if(Object.keys(currUser.profilePicture).length === 0) {
        const deletedProfileImage = await cloudinary.v2.uploader.destroy(
          currUser.profilePicture.cloudinary_id
        );
        if (!deletedProfileImage) {
          throw new BadRequest('Profile cannot be updated');
        }
      }

      const profilePicture = await cloudinary.v2.uploader.upload(file.path);
      if (!profilePicture) {
        throw new BadRequest('Products cannot be updated');
      }
      userInput.profilePicture = {
        avatar: profilePicture.secure_url,
        cloudinary_id: profilePicture.public_id,
      };
    } else {
      delete userInput.profilePicture;
    }

    await User.findByIdAndUpdate(currUser._id, userInput);
    return {
      message: "Profile updated successfully!"
    }
  }
}

export default ProfileService
