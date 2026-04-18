import { useEffect, useState } from "react";
import { VINYL_STORAGE_KEY, INITIAL_FORM_STATE } from "../utils/vinylConstants";

export const useVinylCollection = () => {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem(VINYL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(VINYL_STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  //CRUD
  const addRecord = (newRecord) => {
    console.log("now add...");
    const recordWithId = {
      ...INITIAL_FORM_STATE,
      ...newRecord,
      id: crypto.randomUUID(),
    };
    setRecords((prev) => [recordWithId, ...prev]);
  };

  const deleteRecord = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRecord = (id, updatedData) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedData } : r)),
    );
  };

  return {
    records,
    addRecord,
    deleteRecord,
    updateRecord,
  };
};
