import appAssert from "../../common/API/AppAssert";
import {
  accessTokenSignOptions,
  generateToken,
  refreshTokenSignOptions,
  verifyToken,
} from "../../common/utils/jwtHelper";
import { BAD_REQUEST, UNAUTHORIZED } from "../../constants/http";
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

type LoginUserData = {
  email: string;
  password: string;
};

export const loginUserService = async (data: LoginUserData) => {
  const user = await User.findOne({ email: data.email });

  //validation
  appAssert(user, BAD_REQUEST, "invalid login user details");

  //password check
  const isMatch = await user.comparePassword(data.password);

  appAssert(isMatch, BAD_REQUEST, "invalid login user or password details");

  //generate tokens
  const accessToken = generateToken(
    {
      userId: user._id,
      email: user.email,
    },
    accessTokenSignOptions
  );

  const refreshToken = generateToken(
    {
      userId: user._id,
      email: user.email,
    },
    refreshTokenSignOptions
  );

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return {
    user: user.publicUser(),
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (refreshToken: string) => {
  const userId = verifyToken({
    token: refreshToken,
    options: refreshTokenSignOptions,
  });

  appAssert(userId.userId, UNAUTHORIZED, "invalid  refresh token");

  const user = await User.findOne({
    _id: userId.userId,
  });
  appAssert(user, UNAUTHORIZED, "User not found  in the database");

  const accessToken = generateToken(
    {
      userId: user._id,
      email: user.email,
    },
    accessTokenSignOptions
  );

  return {
    accessToken,
  };
};
