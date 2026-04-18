export const validateImg = (url) => {
  return new Promise((r) => {
    const img = new Image();
    img.src = url;
    img.onload = () => r(true);
    img.onerror = () => r(false);
    setTimeout(() => r(false), 3000);
  });
};
