// JsonConverterCard.jsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import ObjectViewer from './ObjectViewer';
import { setStorageItem } from '../libs/accessLocalStorage.jsx';

const StyledDivision = styled.div({
  display: 'flex',
  flexDirection: 'column', // Fix: Corrected property name
  alignItems: 'center',
});
const StyledButton = styled.button({
  borderRadius: '8px', // Fix: Added quotes and corrected property name
  border: '1px solid transparent', // Fix: Added quotes
  padding: '0.6em 1.2em',
  fontSize: '1em', // Fix: Added quotes and corrected property name
  fontWeight: 500,
  fontFamily: 'inherit',
  backgroundColor: '#f9f9f9',
  cursor: 'pointer',
  transition: 'border-color 0.25s', // Fix: Added quotes
  '&:hover': {
    borderColor: '#646cff',
  },
  '&:focus, &:focus-visible': {
    outline: '4px auto -webkit-focus-ring-color', // Fix: Added quotes
  },
});

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
    <StyledDivision className="card">
      <TextInput textInputState={[text, setText]} />
      <p aria-label="Entered-Text" style={styleEnterText}>
        Entered Text: {text}
      </p>
      <StyledButton aria-label="Check-JSON" onClick={checkTextInput}>
        Check & Beautify
      </StyledButton>
      <p aria-label="Check-Result">Check Result: {checkResult}</p>
      {isJson && <ObjectViewer obj={shownObj} />}
    </StyledDivision>
  );
};

export default JsonConverterCard;
