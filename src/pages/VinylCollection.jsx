import { useState } from "react";
import { useVinylCollection } from "../features/vinyl/hooks/useVinylCollection";
import { formatVinylData } from "../features/vinyl/utils/vinylFormat";
import VinylForm from "../features/vinyl/components/Form/VinylForm";
import VinylList from "../features/vinyl/components/VinylList";

const VinylCollection = () => {
  const { records, addRecord, updateRecord, deleteRecord } =
    useVinylCollection();

  const [editingRecord, setEditingRecord] = useState(null);

  // 處理提交
  const handleSubmitRecord = (record) => {
    const cleanRecord = formatVinylData(record);
    if (editingRecord) {
      updateRecord(editingRecord.id, cleanRecord);
      setEditingRecord(null); // 結束編輯狀態
    } else {
      addRecord(cleanRecord);
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold mb-4">VinylCollection</h3>
      <VinylForm
        onSubmitRecord={handleSubmitRecord}
        editingRecord={editingRecord}
        onCancel={() => setEditingRecord(null)}
      />
      <VinylList
        records={records}
        setEditingRecord={setEditingRecord}
        onDelete={deleteRecord}
      />
    </>
  );
};

export default VinylCollection;
