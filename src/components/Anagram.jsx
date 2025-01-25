import { useContext, useState } from 'react';
import { QuestionContext } from '../context/QuestionContext';
import NavBar from './NavBar';
import Loader from './Loader';


// Block Component for individual letters
const Block = ({ text, onClick }) => {
  return (
    <button
      className="block"
      onClick={() => onClick(text)}
      style={{ margin: '5px', padding: '10px', fontSize: '20px', cursor: 'pointer' }}>
      {text}
    </button>
  );
};

// AnagramGame Component to handle the game logic for both WORD and SENTENCE
const AnagramGame = ({ blocks, solution, anagramType }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const handleLetterClick = (letter) => {
    setSelectedLetters((prev) => [...prev, letter]);
  };

  const checkAnswer = () => {
    const arrangedWord = selectedLetters.join('');
    if (anagramType === 'WORD') {
      if (arrangedWord === solution) {
        alert('Correct! You solved the anagram.');
      } else {
        alert('Incorrect! Try again.');
      }
    } else if (anagramType === 'SENTENCE') {
      // For SENTENCE type, handle space separation and check for the full sentence match
      const arrangedSentence = selectedLetters.join('').replace(/([a-zA-Z0-9])/g, ' ').trim();
      if (arrangedSentence === solution.trim()) {
        alert('Correct! You solved the anagram.');
      } else {
        alert('Incorrect! Try again.');
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        {blocks?.map((block, index) => (
          block.showInOption && (
            <Block key={index} text={block.text} onClick={handleLetterClick} />
          )
        ))}
      </div>

      <div>
        <p>Selected: {selectedLetters.join('')}</p>
        <button onClick={checkAnswer} style={{ marginTop: '10px', padding: '10px' }}>
          Check Answer
        </button>
      </div>
    </div>
  );
};
 

// Main ANAGRAM Component
const Anagram = () => {
  const {selectedQuestion}=useContext(QuestionContext);
  const question=selectedQuestion;
  if (!question) {
    return <div>
      <NavBar/>
      <Loader/>
    </div>
  }

  return (
    <div>
      <NavBar/>
      <div>
      <h3 className="text-2xl font-bold mb-4 bg-red-200">{question.title}</h3>
      <AnagramGame 
        blocks={question.blocks} 
        solution={question.solution} 
        anagramType={question.anagramType} 
      />
    </div>
    </div>
  );
};

export default Anagram;
