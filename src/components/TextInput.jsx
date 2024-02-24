// TextInput.jsx
const TextInput = (props) => {
  // eslint-disable-next-line react/prop-types
  const [ text, setText ] = props.textInputState;
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter JSON text"
        aria-label="Text Input"
      />
    </div>
  );
};

export default TextInput;