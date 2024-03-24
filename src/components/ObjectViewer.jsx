// ObjectViewer.jsx
import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';

// eslint-disable-next-line react/prop-types
const ObjectViewer = ({ obj: obj = null }) => {
  // const obj = props.obj ? props.obj : {};
  const [jsonString, setJsonString] = useState('');
  const [value, setValue] = useState('');
  useEffect(() => {
    setJsonString(JSON.stringify(obj, null, 2));
    // setValue(obj);
  }, [obj]);
  useEffect(() => {
    checkJsonFormat(value);
  }, [value]);

  const style = {
    margin: 'auto', // 配置を左右中央にする
    textAlign: 'left',
    minWidth: '28rem',
    border: '1px solid #777',
  };
  const checkJsonFormat = async (text) => {
    try {
      await JSON.parse(text);
      console.log('valid JSON format');
    } catch (e) {
      console.log(`Not JSON format : ${e}`);
    }
  };
  const onChangeEditor = (val) => {
    // console.log('val:', val);
    setValue(val);
  };
  return (
    <div>
      <CodeMirror
        style={style}
        value={jsonString}
        height="200px"
        // extensions={json()}
        onChange={onChangeEditor}
      />
    </div>
  );
};

export default ObjectViewer;
