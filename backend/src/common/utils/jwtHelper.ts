import jwt, { SignOptions } from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../../constants/getEnv";
import { userDocument } from "../../database/models/user.model";

type AccessTokenParams = {
  userId: userDocument["_id"];
  email?: userDocument["email"];
};

type RefreshTokenParams = {
  userId: userDocument["_id"];
  email?: userDocument["email"];
};

type SignOptionsWithSecret = SignOptions & {
  secret: string;
};

const defaultOptions: SignOptions = {
  audience: "user",
};

export const accessTokenSignOptions: SignOptionsWithSecret = {
  expiresIn: "15m",
  secret: ACCESS_TOKEN_SECRET,
};

export const refreshTokenSignOptions: SignOptionsWithSecret = {
  expiresIn: "30d",
  secret: REFRESH_TOKEN_SECRET,
};

export const generateToken = (
  payload: AccessTokenParams | RefreshTokenParams,
  options: SignOptionsWithSecret
) => {
  const { secret, ...signOpts } = options;
  return jwt.sign(payload, secret, {
    ...defaultOptions,
    ...signOpts,
  });
};
