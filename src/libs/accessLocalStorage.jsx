// accessLocalStorage.jsx
const checkSupportLocalStorage = () => {
  try {
    localStorage.setItem('test-test-test', 'test');
    localStorage.removeItem('test-test-test');
    console.log('LocalStorage is supported.');
    return true;
  } catch (e) {
    alert('Web Storage Not Supported');
    console.log('LocalStorage is not supported.');
    return false;
  }
};

const getStorageItemList = () => {
  // const storageData = Object.localStorage;
  let storageData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(key + ': ' + JSON.stringify(value));
    storageData.push({ key: key, value: value });
  }
  console.log(storageData);
  console.log('in accessLocalStorage');
  return storageData;
};

const setStorageItem = (itemData) => {
  // localStorageに保存したいので前準備
  const now = new Date();
  // const setKey = now.toISOString().replace(/\D/g, '-').slice(0, 16);
  // const setKey = now.toISOString().slice(0, 16);
  const setKey =
    now.getFullYear().toString().slice(-2) +
    '.' +
    now.getMonth().toString().padStart(2, '0') +
    '.' +
    now.getDate().toString().padStart(2, '0') +
    '-' +
    now.getHours().toString().padStart(2, '0') +
    ':' +
    now.getMinutes().toString().padStart(2, '0') +
    '.' +
    now.getSeconds().toString().padStart(2, '0');
  console.log(`In accessLocalStorage, set parsedJson to ${setKey}`);
  localStorage.setItem(setKey, JSON.stringify(itemData));
};

export { checkSupportLocalStorage, getStorageItemList, setStorageItem };
