import { StarRatingField } from "./Form/StarRatingField";

const VinylCard = ({ record, setEditingRecord, onDelete }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col">
      {/* 封面圖片區 */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={record.coverUrl}
          alt={record.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* 懸浮在圖片上的評分標籤 */}
        <div className="absolute z-1 top-2 right-2 bg-black/60 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded text-xs font-bold">
          ★ {record.rating}
        </div>

        {/* 2. 懸停遮罩層 */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col p-4">
          <h4 className="text-white text-sm font-bold border-b border-white/30 pb-2 mb-2">
            TRACKLIST
          </h4>

          {/* 3. 曲目清單（可滾動） */}
          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {record.tracks.map((track, idx) => (
                <li key={idx} className="group/track">
                  <div className="flex justify-between items-center text-white text-xs">
                    <span className="truncate">
                      {idx + 1}. {track.title}
                    </span>
                    {/* 顯示單曲評分（如果有） */}
                    {track.rating > 0 && (
                      <StarRatingField readonly={true} value={track.rating} />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 文字資訊區 */}
      <div className="p-3 flex-1 flex flex-col">
        <h4
          className="font-bold text-gray-900 truncate mb-0.5"
          title={record.title}
        >
          {record.title}
        </h4>
        <p className="text-gray-500 text-xs truncate mb-2">{record.artist}</p>

        <div className="text-[10px] text-gray-400 mt-auto flex justify-between items-center">
          <span>
            {record.releaseYear} · {record.genre}
          </span>
        </div>

        {/* 操作按鈕：平常半透明，Hover 時顯現 */}
        <div className="mt-3 pt-3 border-t border-gray-50 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditingRecord(record)}
            className="flex-1 text-xs py-1.5 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition"
          >
            編輯
          </button>
          <button
            onClick={() => onDelete(record.id)}
            className="flex-1 text-xs py-1.5 bg-red-50 text-red-500 rounded hover:bg-red-100 transition"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  );
};

export default VinylCard;
