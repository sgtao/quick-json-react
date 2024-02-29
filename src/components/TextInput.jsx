// TextInput.jsx
import styled from 'styled-components';
import pasteIcon from '@/assets/paste-icon.svg';

const StyledInput = styled.input({
  minWidth: '24rem',
  height: '2rem',
  fontSize: 'large',
  border: 'solid 2px teal',
  borderRadius: '0.3rem',
});
const ClearButton = styled.button({
  fontSize: '1.5rem',
  padding: '0.2rem',
  margin: '0 0.3rem auto',
  color: 'tomato',
  backgroundColor: 'inherit',
  border: 'none',
  transition: 'transform 0.3s',
});

const PasteButton = styled.button({
  fontSize: '1.2rem',
  padding: '0.2rem',
  margin: '0 0.3rem auto',
  color: 'blue',
  backgroundColor: 'inherit',
  border: 'none',
  transition: 'transform 0.3s',
});

const TextInput = (props) => {
  // eslint-disable-next-line react/prop-types
  const [text, setText] = props.textInputState;
  // eslint-disable-next-line no-unused-vars
  const PasteIcon = () => (
    <i>
      {/* <img src={pasteIcon} style={IconImage} alt="paste from clipboard" /> */}
      <img
        src={pasteIcon}
        style={{ height: '1.2em' }}
        alt="paste from clipboard"
      />
    </i>
  );

  const handlePasteClick = async () => {
    try {
      const readText = await navigator.clipboard.readText();
      setText(readText);
    } catch (err) {
      alert('Faild to paste: clipboard may have no content.');
      console.error('Failed to paste: ', err);
    }
  };

  return (
    <div>
      <StyledInput
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter JSON text"
        aria-label="Text Input"
      />
      <ClearButton onClick={() => setText('')} aria-label="Clear Button">
        X
      </ClearButton>
      <PasteButton onClick={handlePasteClick} aria-label="Paste Button">
        <PasteIcon />
      </PasteButton>
    </div>
  );
};

export default TextInput;
