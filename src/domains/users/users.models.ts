import mongoose, { Schema } from "mongoose";
import { UserDTO } from "../shared/dto/users.dto";

export class User extends mongoose.Document {
  constructor() {
    super();
  }

  createdAt?: string;
  email: string;
  firstName?: string;
  isAdmin?: boolean;
  lastName?: string;
  password?: string;
  phone?: string;
  status: boolean;
  updatedAt?: string;

  public static fromUserDTO = (userDto: UserDTO): User => {
    //const user: User = Object.assign(new MyModel(), userDto);
    const user = new MyModel(userDto);
    user.createdAt = userDto.createdAt;
    user.updatedAt = userDto.updatedAt;
    user.email = userDto.email;
    user.firstName = userDto.firstName;
    user.isAdmin = userDto.isAdmin;
    user.lastName = userDto.lastName;
    user.password = userDto.password;
    user.phone = userDto.phone;
    user.status = userDto.status;
    return user;
  };

  public static toUserDTO = (user: User): UserDTO => {
    const userDto: UserDTO = { ...user };
    delete userDto.password;
    return userDto;
  };
}

const UserSchema: Schema = new Schema<User>(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    email: { default: "", type: String, unique: true },
    firstName: { default: "", type: String },
    isAdmin: { default: false, type: Boolean },
    lastName: { default: "", type: String },
    password: { default: "", type: String },
    phone: { default: "", type: String },
    status: { default: true, type: Boolean },
  },
  { timestamps: true }
);

const MyModel = mongoose.model<User>("User", UserSchema);
export default MyModel;
