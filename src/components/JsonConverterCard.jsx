// JsonConverterCard.jsx
import { useState } from 'react';
import TextInput from './TextInput';

const JsonConverterCard = () => {
  const [text, setText] = useState('');
  const [checkResult, setCheckResult] = useState('');
  const checkTextInput = () => {
    setCheckResult('');
    const checkJson = (text) => {
      let resultCheck = '';
      try {
        JSON.parse(text);
        resultCheck = 'JSON format';
      } catch (e) {
        resultCheck = 'Not JSON format';
      }
      return resultCheck;
    };
    setCheckResult(checkJson(text));
  };

  return (
    <div>
      <div className="card">
        <TextInput textInputState={[text, setText]} />
        <p aria-label="Entered-Text">Entered Text: {text}</p>
        <button aria-label="Check-JSON" onClick={checkTextInput}>
          Check & Beautify
        </button>
        <p aria-label="Check-Result">Check Result: {checkResult}</p>
      </div>
    </div>
  );
};

export default JsonConverterCard;
