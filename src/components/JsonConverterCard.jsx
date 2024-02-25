// JsonConverterCard.jsx
import { useState } from 'react';
import TextInput from './TextInput';

const JsonConverterCard = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <div className="card">
        <TextInput textInputState={[text, setText]} />
        <p>Entered Text: {text}</p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
};

export default JsonConverterCard;
