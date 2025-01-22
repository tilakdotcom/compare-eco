import appAssert from "../../common/API/AppAssert";
import { BAD_REQUEST } from "../../constants/http";
import User from "../../database/models/user.model";

type CreateUserData = {
  email: string;
  password: string;
  user: string;
};

export const createUserService = async (data: CreateUserData) => {
  const userExists = await User.exists({ email: data.email });

  appAssert(!userExists, BAD_REQUEST, "user already exists");

  const user = await User.create({
    user: data.user,
    email: data.email,
    password: data.password,
  });

  return {
    user: user.publicUser(),
  };
};

// type LoginUserData = {
//   email: string;
//   password: string;
// };

// export const loginUserService = async (data: LoginUserData) => {
//   const user = await User.findOne({ email: data.email });

//   //validation
//   appAssert(user, BAD_REQUEST, "invalid login user details");

//   //password check
//   const isMatch = await user.comparePassword(data.password);

//   appAssert(isMatch, BAD_REQUEST, "invalid login user or password deatails");

//   //generate tokens
//   const accessToken = signToken({
//     userId: user._id,
//   });

//   const refreshToken = signToken(
//     {
//       userId: user._id,
//     },
//     refreshTokenSignOptions
//   );

//   user.refreshToken = refreshToken;
//   await user.save({ validateBeforeSave: false });

//   return {
//     user: user.omitPassword(),
//     accessToken,
//     refreshToken,
//   };
// };
