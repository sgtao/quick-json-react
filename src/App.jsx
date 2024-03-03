import { useEffect } from 'react';
import JsonConverterCard from './components/JsonConverterCard';
import './App.css';
import {
  checkSupportLocalStorage,
  getStorageItemList,
} from './libs/accessLocalStorage.jsx';

function App() {
  // useEffect(() => { 処理 }, 更新タイミング([]の場合は１回だけ実行))
  useEffect(() => {
    if (checkSupportLocalStorage()) {
      console.log('Web Storage is Supported');
      console.log(getStorageItemList());
    }
  }, []);
  return (
    <>
      <h1>quick-json-react</h1>
      <JsonConverterCard />
    </>
  );
}

export default App;
