import React, { useState } from 'react';

const Option = ({ text, isSelected, onSelect }) => {
  return (
    <button
      className={`option ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      style={{
        display: 'block',
        padding: '10px',
        margin: '10px 0',
        fontSize: '16px',
        backgroundColor: isSelected ? '#007BFF' : '#f0f0f0',
        color: isSelected ? '#fff' : '#000',
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {text}
    </button>
  );
};

// Main MCQ Component
const MCQ = ({ question }) => {
  
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const submitAnswer = () => {
    if (!selectedOption) {
      alert('Please select an option before submitting.');
      return;
    }

    if (selectedOption.isCorrectAnswer) {
      alert('Correct!');
    } else {
      alert('Incorrect!');
    }
  };

  return (
    <div className='bg-orange-500 p-2 rounded-md'>
      <h3 className="text-2xl font-bold mb-4">{question.title}</h3>
      <div>
        {question.options.map((option, index) => (
          <Option
            key={index}
            text={option.text}
            isSelected={selectedOption === option}
            onSelect={() => handleOptionSelect(option)}
          />
        ))}
      </div>
      <button
        onClick={submitAnswer}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default MCQ;
