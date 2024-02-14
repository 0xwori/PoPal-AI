// components/TextInput.js
import { useState } from 'react';

const TextInput = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputText);
  };

  return (
    <div>
      <textarea value={inputText} onChange={handleChange} rows={10} cols={50} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TextInput;
