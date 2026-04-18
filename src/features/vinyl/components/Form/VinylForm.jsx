import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { IMAGES } from "../../utils/vinylConstants";
import { INITIAL_FORM_STATE, GENRE_OPTIONS } from "../../utils/vinylConstants";
import { validateImg } from "../../utils/vinylValidators";

import { FormField } from "./FormField";
import { VinylCoverPreview } from "./VinylCoverPreview";
import { TrackListSection } from "./TrackListSection";
import { StarRatingField } from "./StarRatingField";

const VinylForm = ({ onSubmitRecord, editingRecord, onCancel }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: INITIAL_FORM_STATE });

  useEffect(() => {
    if (editingRecord) {
      reset(editingRecord);
    } else {
      reset(INITIAL_FORM_STATE);
    }
  }, [editingRecord, reset]);

  const onSubmit = async (record) => {
    const coverIsValid = await validateImg(record.coverUrl);
    const finalRecordData = {
      ...record,
      tracks: record.tracks.map((track, index) => ({
        ...track,
        trackNo: index + 1,
      })),
      coverUrl: coverIsValid ? record.coverUrl : IMAGES.NOT_FOUND_COVER,
    };
    onSubmitRecord(finalRecordData);
    reset(INITIAL_FORM_STATE);
  };
  return (
    <div className="p-2">
      <h2 className="text-xl font-bold pb-3">
        {editingRecord ? "編輯黑膠資訊" : "新增黑膠收藏"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-6 gap-x-2 items-center"
      >
        <FormField label="專輯名稱" id="title" error={errors.title}>
          <input
            type="text"
            id="title"
            className={`w-full border p-2 ${errors.title ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            {...register("title", { required: "必填專輯名稱" })}
          />
        </FormField>
        <FormField label="歌手/樂團名稱" id="artist" error={errors.artist}>
          <input
            type="text"
            id="artist"
            className={`w-full border p-2 ${errors.artist ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            {...register("artist", { required: "必填歌手/樂團名稱" })}
          />
        </FormField>
        <FormField label="音樂類型" id="genre">
          <select
            id="genre"
            className="border border-gray-300 p-2 bg-white w-full"
            {...register("genre")}
          >
            {GENRE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="發行年份" id="releaseYear" error={errors.releaseYear}>
          <input
            type="number"
            id="releaseYear"
            className="w-full border border-gray-300 p-2"
            {...register("releaseYear", {
              validate: (value) => {
                const currentYear = new Date().getFullYear();
                return (value >= 1900 && value <= currentYear) || "年份不合理";
              },
            })}
          />
        </FormField>
        <FormField label="封面圖片" id="coverUrl">
          <div className="relative flex items-center w-full">
            <input
              type="text"
              id="coverUrl"
              className="w-full border border-gray-300 p-2"
              placeholder="圖片網址"
              {...register("coverUrl")}
            />
            <VinylCoverPreview control={control} />
          </div>
        </FormField>
        <div className="flex-1 flex">
          <label htmlFor="tracks" className="w-24">
            曲目清單
          </label>
          <TrackListSection
            control={control}
            register={register}
            setValue={setValue}
            errors={errors}
          />
        </div>
        <FormField label="評分" id="rating" error={errors.rating}>
          <div>
            <StarRatingField
              name="rating"
              control={control}
              setValue={setValue}
              size="text-xl"
            />
            <input
              type="hidden"
              {...register("rating", {
                required: "請給評分",
                min: { value: 1, message: "最少 1 顆星" },
              })}
            />
          </div>
        </FormField>
        <FormField label="評語" id="comment">
          <textarea
            type="text"
            id="comment"
            rows="3"
            className="w-full border border-gray-300 p-2"
            {...register("comment")}
          />
        </FormField>
        <div className="flex justify-center gap-2">
          <button type="submit" className="bg-red-900 text-white px-6 py-2">
            {editingRecord ? "修改" : "新增"}
          </button>
          {editingRecord && (
            <button onClick={onCancel} className="bg-gray-200 px-6 py-2">
              取消
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VinylForm;
