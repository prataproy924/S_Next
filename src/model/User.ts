import mongoose, {Schema, Document} from "mongoose";


export interface Massage extends Document {
  content: string;
  createdAt: Date;
}
const MassageSchema:Schema<Massage> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpire: Date;
  isVerified:boolean;
  isAcceptingMassage: boolean;
  massages: Massage[];
}
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpire: {
    type: Date,
    required: true,
  },
  isAcceptingMassage: {
    type: Boolean,
    default: false,
  },
  massages: [MassageSchema],

});
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);
export default UserModel;

