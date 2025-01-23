import appAssert from "../../common/API/AppAssert";
import { loginSchema, registerSchema } from "../../common/schemas/auth";
import {
  clearAuthCookie,
  setAccessTokenCookie,
  setAuthCookies,
} from "../../common/utils/cookie";
import {
  accessTokenSignOptions,
  generateToken,
  refreshTokenSignOptions,
  verifyToken,
} from "../../common/utils/jwtHelper";
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from "../../constants/http";
import User from "../../database/models/user.model";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import { createUserService, loginUserService } from "../services/auth.service";

//signup
export const signup = asyncHandler(async (req, res) => {
  const body = registerSchema.parse(req.body);
  //using services
  const { user } = await createUserService(body);

  res.status(CREATED).json({
    message: "user created successfully",
    data: user,
  });
});

//login
export const login = asyncHandler(async (req, res) => {
  const body = loginSchema.parse(req.body);

  const { accessToken, refreshToken, user } = await loginUserService(body);

  const cooki = setAuthCookies({ res, accessToken, refreshToken });

  return cooki.status(OK).json({
    message: "Logged in successfully",
    data: user,
  });
});

//logout
export const logout = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshToken: null,
      },
    },
    { new: true }
  );

  appAssert(user, BAD_REQUEST, "User not found  in the database");

  return clearAuthCookie(res).status(OK).json({
    message: "Logged out successfully",
  });
});

export const accessTokenRefresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  appAssert(refreshToken, UNAUTHORIZED, "Refresh token  not found");
  // userId
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

  return setAccessTokenCookie({ res, accessToken }).status(OK).json({
    message: "Access token refreshed successfully",
  });
});
