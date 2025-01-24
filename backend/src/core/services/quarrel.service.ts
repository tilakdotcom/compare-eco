import Quarrel from "../../database/models/quarrel.model";

type newQuarrelData = {
  userId: string;
  title: string;
  content: string;
  image: string;
  expireAt: Date;
};

export const newQuarrelService = async (data: newQuarrelData) => {
  const quarrel = await Quarrel.create({
    userId: data.userId,
    title: data.title,
    content: data.content,
    image: data.image,
    expireAt: data.expireAt,
  });

  return { quarrel };
};
