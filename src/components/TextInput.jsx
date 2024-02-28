// TextInput.jsx
import styled from 'styled-components';

const StyledInput = styled.input({
  minWidth: '24rem',
  height: '2rem',
  fontSize: 'large',
  border: 'solid 2px teal',
  borderRadius: '0.3rem',
});
const ClearButton = styled.button({
  margin: '0 0.3rem auto',
  color: 'tomato',
  backgroundColor: 'inherit',
  border: 'none',
  transition: 'transform 0.3s',
});

const TextInput = (props) => {
  // eslint-disable-next-line react/prop-types
  const [text, setText] = props.textInputState;

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
    </div>
  );
};

export default TextInput;
