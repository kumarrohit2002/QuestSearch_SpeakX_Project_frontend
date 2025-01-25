import { useContext, useEffect } from 'react';
import { QuestionContext } from '../context/QuestionContext';
import NavBar from './NavBar';
const READ_ALONG = () => {
  const {selectedQuestion}=useContext(QuestionContext);
  const question=selectedQuestion;

  useEffect(() => {
  }, [question]); 

  if (!question) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <NavBar/>
      <div className="read-along-container p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-4">Read Along</h2>
      <p className="text-gray-700">{question.title}</p>
    </div>
    </div>
  );
};

export default READ_ALONG;
