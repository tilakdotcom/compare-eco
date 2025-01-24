import appAssert from "../../common/API/AppAssert";
import { quarrelSchema } from "../../common/schemas/quarrel";
import { BAD_REQUEST, CREATED } from "../../constants/http";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import { validateFileImage } from "../../middlewares/file.middleware";
import { newQuarrelService } from "../services/quarrel.service";

export const newQuarrel = asyncHandler(async (req, res) => {
  const data = quarrelSchema.parse(req.body);
  appAssert(req.file, BAD_REQUEST, "file not found in request");
  const { path } = validateFileImage(req.file as Express.Multer.File);
  const { quarrel } = await newQuarrelService({
    ...data,
    image: path,
    userId: req.userId as string,
  });

  return res.status(CREATED).json({
    message: "Quarrel created successfully",
    data: quarrel,
  });
});
