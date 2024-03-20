import { useState, useEffect } from 'react';
import styled from 'styled-components';
import JsonConverterCard from './components/JsonConverterCard';
import HistorySideMenu from './components/HistorySideMenu';
import './App.css';
import {
  checkSupportLocalStorage,
  getStorageItemList,
} from './libs/accessLocalStorage.jsx';

const StyledAppBoard = styled.div({
  height: '100vh',
  minWidth: 'fit-content',
  // maxWidth: '100%',
  margin: '0 auto',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
});

function App() {
  const [encodedJson, setEncodedJson] = useState('');
  const [jsonHistory, setJsonHistory] = useState([]);
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
      console.log(`value of ${jsonItem.key} key is`);
      console.log(`${jsonItem.value}`);
      const itemValue = JSON.parse(jsonItem.value);
      const stringJson = JSON.stringify(itemValue.json).replaceAll('\\"', '"');
      console.log(`- savedAt: ${itemValue.savedAt}`);
      // const trimmedStringJson = stringJson.slice(1, -1); // 文頭文末の`"`を削除
      // console.log(`- stringJson: ${trimmedStringJson}`);
      console.log(`- stringJson: ${stringJson}`);
      // console.log(`- json?encoded=${encodeURI(trimmedStringJson)}`);
      console.log(`- json?encoded=${encodeURI(stringJson)}`);
    });
  };
  // useEffect(() => { 処理 }, 更新タイミング([]の場合は１回だけ実行))
  useEffect(() => {
    if (checkSupportLocalStorage()) {
      console.log('Web Storage is Supported');
      const getItemList = getStorageItemList();
      console.log(getItemList);
      if (Array.isArray(getItemList)) {
        consoleJsonList(getItemList);
        setJsonHistory(getItemList);
      }
    }
    checkUrlQuery();
  }, []);
  return (
    <StyledAppBoard id="app-board">
      <HistorySideMenu
        jsonHistory={jsonHistory}
        style={{ minWidth: '12rem' }}
      />
      <div style={{ minWidth: 'fit-content' }}>
        <h1>quick-json-react</h1>
        <JsonConverterCard encodedJson={encodedJson} />
      </div>
    </StyledAppBoard>
  );
}

export default App;
