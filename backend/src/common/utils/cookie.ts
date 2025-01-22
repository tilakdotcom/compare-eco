import { CookieOptions, Response } from "express";
import { fifteenMinuteFromNow, thirtyDaysFromNow } from "./customTime";

type setAuthParams = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const REFRESH_PATH = "/api/v1/auth/refresh";

const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: true,
};

const accessTokenCookieOptions = () => {
  return {
    ...defaultCookieOptions,
    expires: fifteenMinuteFromNow(),
    maxAge: fifteenMinuteFromNow(),
  };
};

const refreshTokenCookieOptions = () => {
  return {
    ...defaultCookieOptions,
    path: REFRESH_PATH,
    expires: thirtyDaysFromNow(),
    maxAge: thirtyDaysFromNow(),
  };
};

export const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: setAuthParams) => {
  
};
