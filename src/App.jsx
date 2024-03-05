import { useState, useEffect } from 'react';
import JsonConverterCard from './components/JsonConverterCard';
import './App.css';
import {
  checkSupportLocalStorage,
  getStorageItemList,
} from './libs/accessLocalStorage.jsx';

function App() {
  const [encodedJson, setEncodedJson] = useState('');
  const checkUrlQuery = () => {
    console.log(window.location.pathname);
    const appPathName = window.location?.pathname;
    const segments = appPathName.split('/');
    const lastSegment = segments[segments.length - 1];
    if (lastSegment === 'json') {
      const params = new URLSearchParams(window.location.search);
      console.log(params.get('encoded'));
      setEncodedJson(`${params.get('encoded')}`);
    }
  };
  const consoleJsonList = (jsonList) => {
    jsonList.map((jsonItem) => {
      // console.log(JSON.stringify(jsonItem.value));
      const stringJson = JSON.stringify(jsonItem.value).replaceAll('\\"', '"');
      const trimmedtringJson = stringJson.slice(1, -1); // 文頭文末の`"`を削除
      console.log(`stringJson is ${trimmedtringJson}`);
      console.log(`json?encoded=${encodeURI(trimmedtringJson)}`);
    });
  };
  // useEffect(() => { 処理 }, 更新タイミング([]の場合は１回だけ実行))
  useEffect(() => {
    if (checkSupportLocalStorage()) {
      console.log('Web Storage is Supported');
      // console.log(getStorageItemList());
      consoleJsonList(getStorageItemList());
    }
    checkUrlQuery();
  }, []);
  return (
    <>
      <h1>quick-json-react</h1>
      <JsonConverterCard encodedJson={encodedJson} />
    </>
  );
}

export default App;
