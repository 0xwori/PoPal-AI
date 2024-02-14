import React, { useMemo, useRef } from "react";
// import styled, { css } from "styled-components";
import { useState } from 'react';

const LineCountTextarea = ({
  value,
  numOfLines,
  onValueChange,
  onValueChangeWithNumbers, 
  placeholder = "Enter Message",
  name
}) => {
  const lineCount = useMemo(() => value.split("\n").length, [value]);
  const linesArr = useMemo(
    () =>
      Array.from({ length: Math.max(numOfLines, lineCount) }, (_, i) => i + 1),
    [lineCount, numOfLines]
  );

  const lineCounterRef = useRef(null);
  const textareaRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleTextareaChange = (event) => {
    onValueChange(event.target.value);
    const linesWithNumbers = event.target.value.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
    onValueChangeWithNumbers(linesWithNumbers);
    setCopied(false); // Reset copied state when text changes
  };

  const handleTextareaScroll = () => {
    if (lineCounterRef.current && textareaRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const copyToClipboard = () => {
    const linesWithNumbers = value.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
    console.log(linesWithNumbers)
    navigator.clipboard.writeText(linesWithNumbers);
    setCopied(true);
  };

  return (
    <div className="relative flex flex-col">
      <div className="relative flex">
        <div className="numbers flex flex-col overflow-y-hidden text-right bg-lightgrey border border-none p-4 w-12">
          {linesArr.map((count) => (
            <div className={`number ${count <= lineCount ? 'text-blue' : ''}`} key={count}>
              {count}
            </div>
          ))}
        </div>
        <textarea
          className="flex-1 border border-grey rounded p-4 resize-none outline-none"
          name={name}
          onChange={handleTextareaChange}
          onScroll={handleTextareaScroll}
          placeholder={placeholder}
          ref={textareaRef}
          value={value}
          wrap="off"
          style={{
            overflowY:'hidden'
          }}
        />
      </div>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={copyToClipboard}
      >
        {copied ? 'Copied!' : 'Copy Content with Line Numbers'}
      </button>
    </div>
  );
};

export default LineCountTextarea;
