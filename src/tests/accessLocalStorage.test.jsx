// accessLocalStorage.test.js
import {
  expect,
  describe,
  it,
  afterAll,
  beforeAll,
  beforeEach,
  afterEach,
} from 'vitest';
import {
  checkSupportLocalStorage,
  getStorageItemList,
  setStorageItem,
} from '../libs/accessLocalStorage';

describe('checkSupportLocalStorage', () => {
  let localStorageBackup;
  beforeAll(() => {
    localStorageBackup = window.localStorage;
  });
  afterAll(() => {
    // テスト後にLocalStorageを元に戻す
    window.localStorage = localStorageBackup;
  });

  it('should return true if LocalStorage is supported', () => {
    const result = checkSupportLocalStorage();
    expect(result).toBe(true);
  });

  it('should return false if LocalStorage is not supported', () => {
    // テスト用にLocalStorageを削除する
    delete window.localStorage;

    const result = checkSupportLocalStorage();
    expect(result).toBe(false);
  });
});

describe('getStorageItemList', () => {
  beforeEach(() => {
    // テスト用にLocalStorageにデータを設定
    localStorage.setItem('test-key-1', 'test-value-1');
    localStorage.setItem('test-key-2', 'test-value-2');
  });

  afterEach(() => {
    // テスト後にLocalStorageをクリア
    localStorage.clear();
  });

  it('should return an array of storage items', () => {
    const storageData = getStorageItemList();
    expect(storageData).toEqual([
      { key: 'test-key-1', value: 'test-value-1' },
      { key: 'test-key-2', value: 'test-value-2' },
    ]);
  });
});

describe('setStorageItem', () => {
  beforeEach(() => {
    // テスト前にLocalStorageをクリア
    localStorage.clear();
  });

  it('should save item to localStorage with correct key', () => {
    let testData = { test: 'test-data' };
    // Act
    setStorageItem(testData);

    // Assert
    const firstKeyName = localStorage.key(0);
    console.log(`at setStorageItem, 1st keyName is ${firstKeyName}`);
    expect(localStorage.getItem(firstKeyName)).toBe(JSON.stringify(testData));
  });
});
