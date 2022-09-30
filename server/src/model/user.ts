import mongoose, { Model, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser } from '../interface';
import { UnAuthorized } from '../utils/errorCode';

interface UserModel extends Model<IUser> {
    userExist(email: string): Promise<boolean>;

    verify(token: string): Promise<{ _id: string }>;

    authenticate(credentials: object): Promise<IUser>;

    setUpConnectAccountLink(accountId: string): Promise<any>;
}

export enum UserRole {
    ADMIN = "admin",
    CUSTOMER = "customer",
    ALL = "all"
}


const UserSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    profilePicture: {
        avatar: String,
        cloudinary_id: String
    },
    roleName: {
        type: String,
        enum: UserRole,
        required: true
    },
    isSuperAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'role',
    },
});

UserSchema.pre("save", async function(next) {
    const user = this;
    if (user.password && user.isNew) {
        this.password = await bcrypt.hash(user.password, 10)
        next()
    }
})

UserSchema.statics.userExist = async function(email) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
        throw new UnAuthorized('User already exist');
    }
    return true;
}

UserSchema.statics.verify = async function(token) {
    const decode = <any>jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
        _id: decode.user._id,
    })
    if (!user) {
        throw new UnAuthorized("Session expired")
    }
}


UserSchema.statics.authenticate = async function(credentials) {
    const user = await User.findOne({
        email: credentials.email.toLowerCase(),
        roleName: credentials.role
    });


    if (!user) {
        throw new UnAuthorized('Unable to login. Please registered yourself');
    }
    const isMatch = await bcrypt.compare(credentials.password, user.password);

    if (!isMatch) {
        throw new UnAuthorized('Email or Password is incorrect');
    }
    return user;
}

UserSchema.methods.generateToken = async function() {
    const user = this;
    delete user.password
    return jwt.sign({ user }, process.env.JWT_SECRET);
}

const User = mongoose.model<IUser, UserModel>('user', UserSchema);

export default User;


