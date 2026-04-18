import { IMAGES } from "./vinylConstants";

export const formatVinylData = (record) => {
  return {
    ...record,
    title: record.title.trim() || "未命名專輯",
    releaseYear: Number(record.releaseYear),
    rating: Number(record.rating),
    coverUrl: record.coverUrl?.trim() || IMAGES.DEFAULT_COVER,
  };
};
