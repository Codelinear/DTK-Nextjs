// // src/utils/storageUtils.js

// export const setStoredData = (key, data) => {
//   sessionStorage.setItem(key, JSON.stringify(data));
//   localStorage.setItem(key, JSON.stringify(data));
// };

// export const getStoredData = (key) => {
//   const sessionData = sessionStorage.getItem(key);
//   return sessionData ? JSON.parse(sessionData) : null;
// };

// export const clearLocalStorageOnRefresh = () => {
//   const reloaded = sessionStorage.getItem("reloaded");
//   if (!reloaded) {
//     localStorage.clear();
//     sessionStorage.setItem("reloaded", "true");
//   }
// };

// utils/storageUtils.js

export const setStoredData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStoredData = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

export const clearLocalStorageOnRefresh = () => {
  window.addEventListener("beforeunload", () => {
    localStorage.clear();
  });
};
