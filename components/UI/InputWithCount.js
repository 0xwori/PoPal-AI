import { useState } from 'react';

const InputWithCount = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const lineCount = text.split('\n').length;

  return (
    <div className="flex">
      <div className="flex flex-col items-end mr-2">
        {Array.from({ length: lineCount }, (_, i) => (
          <span key={i} className="text-xs text-gray-500">{i + 1}</span>
        ))}
      </div>
      <textarea
        className="flex-grow border border-gray-300 p-2 resize-none"
        value={text}
        onChange={handleChange}
        rows={lineCount}
      />
    </div>
  );
};

export default InputWithCount;
