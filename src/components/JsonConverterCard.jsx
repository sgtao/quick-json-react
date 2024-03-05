// JsonConverterCard.jsx
import { useState, useEffect } from 'react';
import TextInput from './TextInput';
import ObjectViewer from './ObjectViewer';
import { setStorageItem } from '../libs/accessLocalStorage.jsx';

// eslint-disable-next-line react/prop-types
const JsonConverterCard = ({ encodedJson: encodedJson = null }) => {
  const [text, setText] = useState('');
  const [checkResult, setCheckResult] = useState('');
  const [isJson, setIsJson] = useState(false);
  const [shownObj, setShownObj] = useState({});

  const styleEnterText = {
    maxWidth: '38rem',
    textWrap: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '0 auto',
    marginBottom: '2rem',
  };
  const checkTextInput = async () => {
    try {
      const parsedJson = await JSON.parse(text);
      setCheckResult('JSON format');
      console.dir(parsedJson);
      setShownObj(parsedJson);
      const stringJson = await JSON.stringify(parsedJson, undefined, 2);
      console.log(stringJson);

      // localStorageに保存
      setStorageItem(parsedJson);

      setIsJson(true);
    } catch (e) {
      setIsJson(false);
      setCheckResult('Not JSON format');
    }
  };

  useEffect(() => {
    console.log(`encodedJson is ${encodedJson}`);
    if (encodedJson !== null) {
      setText(encodedJson);
    }
  }, [encodedJson]);

  return (
    <div>
      <div className="card">
        <TextInput textInputState={[text, setText]} />
        <p aria-label="Entered-Text" style={styleEnterText}>
          Entered Text: {text}
        </p>
        <button aria-label="Check-JSON" onClick={checkTextInput}>
          Check & Beautify
        </button>
        <p aria-label="Check-Result">Check Result: {checkResult}</p>
        {isJson && <ObjectViewer obj={shownObj} />}
      </div>
    </div>
  );
};

export default JsonConverterCard;
