import { loginSchema, registerSchema } from "../../common/schemas/auth";
import { CREATED } from "../../constants/http";
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
// export const logout = asyncHandler(async (req, res) => {
//   const userId = req.userId;
//   const user = await User.findByIdAndUpdate(
//     userId,
//     {
//       $set: {
//         refreshToken: null,
//       },
//     },
//     { new: true }
//   );

//   appAssert(user, BAD_REQUEST, "User not found  in the database");

//   return clearAuthCookie(res).status(OK).json({
//     message: "Logged out successfully",
//   });
// });