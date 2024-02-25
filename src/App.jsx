import { useState } from 'react';
import './App.css';
import TextInput from './components/TextInput';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <>
      <h1>json-viewer</h1>
      <div className="card">
        <TextInput textInputState={[text, setText]} />
        <p>Entered Text: {text}</p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
