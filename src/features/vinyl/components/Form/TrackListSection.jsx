import { useFieldArray } from "react-hook-form";
import { formatDuration } from "../../utils/durationFormat";
import { StarRatingField } from "./StarRatingField";

export const TrackListSection = ({ control, register, setValue, errors }) => {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "tracks",
  });

  //Textarea批量解析邏輯
  const handleBulkParse = (e) => {
    const rawText = e.target.value;
    if (!rawText.trim()) return;

    const lines = rawText.split("\n").filter((line) => line.trim() !== "");
    const parsedTracks = lines
      .map((line, index) => {
        const data = line.trim().split(/\s+/);
        if (data.length === 0) return null;

        let duration = "";
        const lastItem = data[data.length - 1];
        const isTime =
          lastItem.includes(":") ||
          lastItem.includes("：") ||
          /^\d+}$/.test(lastItem);
        if (isTime && data.length > 1) duration = data.pop();

        const title = data.join(" ");

        return {
          trackNo: index + 1,
          title: title || `未命名曲目 ${index + 1}`,
          duration: formatDuration(duration),
          rating: 0,
        };
      })
      .filter(Boolean);

    replace(parsedTracks); // 整批替換現有資料
    e.target.value = ""; // 清空 textarea
  };

  return (
    <div className="w-96 space-y-2 flex flex-col">
      {/* <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-lg font-bold text-gray-700">
          曲目清單 (Tracklist)
        </h3>
        <span className="text-xs text-gray-400">共 {fields.length} 首曲目</span>
      </div> */}

      {/* 批量錄入區塊 */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          快速錄入 (格式：歌名 03:45，換行代表下一首)
        </label>
        <textarea
          onBlur={handleBulkParse}
          placeholder={"Bohemian Rhapsody 05:55\nKiller Queen 03:01"}
          className="w-full p-2 text-sm border rounded focus:ring-1 focus:ring-red-500 outline-none h-24"
        />
      </div>

      {/* 動態曲目列表 */}
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center bg-white p-2 border rounded shadow-sm hover:border-red-400 transition-colors"
          >
            {/* 顯示編號 */}
            <span className="w-8 text-center font-mono text-gray-400 text-sm">
              {index + 1}.
            </span>
            {/* 隱藏的 trackNo 資料 */}
            <input type="hidden" {...register(`tracks.${index}.trackNo`)} />
            {/* 曲名輸入框 */}
            <div className="flex flex-col flex-1 relative justify-center">
              <input
                {...register(`tracks.${index}.title`, {
                  required: "請輸入曲名",
                })}
                placeholder="歌曲名稱"
                className="text-sm border-b border-transparent focus:border-red-500 outline-none"
              />
              {errors?.tracks?.[index]?.title && (
                <span className="absolute right-0 text-red-500 text-xs ml-8">
                  {errors.tracks[index].title.message}
                </span>
              )}
            </div>
            {/* 時間長度輸入框 */}
            <input
              {...register(`tracks.${index}.duration`)}
              placeholder="mm:ss"
              className="w-15 text-sm p-1 text-center border-b border-transparent focus:border-red-500 outline-none font-mono"
              onBlur={(e) => {
                const formatted = formatDuration(e.target.value);
                setValue(`tracks.${index}.duration`, formatted);
              }}
            />
            <div className="flex justify-center">
              <StarRatingField
                name={`tracks.${index}.rating`}
                control={control}
                setValue={setValue}
                size="text-ms"
              />
            </div>
            {/* 刪除按鈕 */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-1 text-gray-300 hover:text-red-500 transition-colors"
              title="刪除此曲目"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* 手動新增按鈕 */}
      <button
        type="button"
        onClick={() =>
          append({ trackNo: fields.length + 1, title: "", duration: "" })
        }
        className="w-full py-2 bg-white text-gray-600 rounded-md text-sm hover:bg-gray-50 active:bg-gray-100 transition-all flex justify-center items-center gap-2"
      >
        <span>+</span> 手動新增曲目
      </button>
    </div>
  );
};
