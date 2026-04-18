export const VINYL_STORAGE_KEY = "my_vinyl_collection_v1";

export const GENRE_OPTIONS = [
  "Rock",
  "Jazz",
  "Pop",
  "Electronic",
  "Classical",
  "Hip Hop",
  "Soul",
  "Funk/Soul",
  "Blues",
];

export const IMAGES = {
  DEFAULT_COVER: "/public/assets/images/default_cover.jpg",
  NOT_FOUND_COVER: "/public/assets/images/default_cover_404.jpg",
};

export const INITIAL_FORM_STATE = {
  id: Date.now(),
  title: "", //專輯名稱 required
  artist: "", //歌手/樂團 required
  genre: "", //音樂類型
  releaseYear: new Date().getFullYear(), //發行年份
  coverUrl: "", //封面圖片
  tracks: [], //曲目清單
  rating: 0, // 評分 (1-5) required
  comment: "", // 評語
  createAt: new Date().toLocaleDateString("sv-SE"), // 建立時間
};
