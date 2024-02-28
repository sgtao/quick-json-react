// TextInput.jsx
const TextInput = (props) => {
  // eslint-disable-next-line react/prop-types
  const [text, setText] = props.textInputState;
  const inputStyle = {
    minWidth: '480px',
    height: '2rem',
    fontSize: 'large',
    border: 'solid 2px teal',
    borderRadius: '0.3rem',
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter JSON text"
        aria-label="Text Input"
        style={inputStyle}
      />
    </div>
  );
};

export default TextInput;
