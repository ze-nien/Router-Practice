import React from "react";
import VinylCard from "./VinylCard";

const VinylList = ({ records, setEditingRecord, onDelete }) => {
  if (records.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl mt-8">
        <p className="text-gray-400">
          目前尚無收藏，開始新增你的第一張黑膠吧！
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl font-bold text-gray-800">館藏列表</h3>
        <span className="text-sm text-gray-500">
          共 {records.length} 張專輯
        </span>
      </div>

      {/* 網格佈局：自適應寬度 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {records.map((record) => (
          <VinylCard
            key={record.id}
            record={record}
            setEditingRecord={setEditingRecord}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
export default VinylList;
