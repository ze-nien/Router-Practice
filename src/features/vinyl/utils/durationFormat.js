/**
 * 將使用者輸入的各種時間字串轉為標準的 mm:ss 格式
 */
export const formatDuration = (value) => {
  if (!Number(value)) return "00:00";

  const cleanVal = value.replace("：", ":");

  if (cleanVal.includes(":")) {
    const parts = cleanVal.split(":");
    const mins = (parts[0] || "0").padStart(2, "0");
    const secs = (parts[1] || "00").padEnd(2, "0").slice(0, 2);
    return `${mins}:${secs}`;
  }

  if (/^\d+$/.test(cleanVal)) {
    const num = parseInt(cleanVal, 10);
    if (num < 100) {
      return `00:${cleanVal.padStart(2, "0")}`;
    } else {
      const s = cleanVal.slice(-2);
      const m = cleanVal.slice(0, -2);
      return `${m.padStart(2, "0")}:${s}`;
    }
  }
};
