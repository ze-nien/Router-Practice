import { useWatch } from "react-hook-form";
import { IMAGES } from "../../utils/vinylConstants";

export const VinylCoverPreview = ({ control }) => {
  const watchCoverUrl = useWatch({
    control,
    name: "coverUrl",
    defaultValue: "",
  });

  if (!watchCoverUrl) return null;

  return (
    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-32 h-32 border border-gray-200 rounded-lg shadow-xl bg-white p-1 z-50 animate-in fade-in zoom-in duration-200">
      <img
        src={watchCoverUrl}
        alt="Vinyl Cover Preview"
        className="w-full h-full object-cover rounded"
        //圖片網址無效時顯示預設圖
        onError={(e) => {
          e.target.onError = null;
          e.target.src = IMAGES.NOT_FOUND_COVER;
        }}
      />
    </div>
  );
};
