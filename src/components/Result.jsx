import { useContext, useEffect } from 'react';
import { QuestionContext } from '../context/QuestionContext';
import Mcq from './Mcq';
import Anagram from './Anagram';
import ReadAlong from './READ_ALONG';
import ContentOnly from './CONTENT_ONLY';

const Result = () => {
  const { questions, selectedQuestion, getQuestionById, error } = useContext(QuestionContext);

  useEffect(() => {
  }, [questions]); 

  return (
    <div className="p-6 bg-green-200">
      <h3 className="text-3xl font-bold text-center mb-4">Similar Titles</h3>
      <p className="text-xl font-semibold mb-2 text-gray-700">Title</p>

      {error && <p className="text-center text-red-600 text-lg">{error}</p>}

      {selectedQuestion ? (
        selectedQuestion.type === 'MCQ' ? (
          <Mcq question={selectedQuestion} />
        ) : selectedQuestion.type === 'ANAGRAM' ? (
          <Anagram question={selectedQuestion} />
        ) : selectedQuestion.type === 'READ_ALONG' ? (
          <ReadAlong question={selectedQuestion} />
        ) : selectedQuestion.type === 'CONTENT_ONLY' ? (
          <ContentOnly question={selectedQuestion} />
        ) : (
          <p className="text-center text-gray-600">No valid question type found.</p>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions?.length > 0 ? (
            questions.map((question, id) => (
              <div
                key={id}
                className="bg-gray-100 p-4 rounded-md shadow-md border hover:bg-gray-200 cursor-pointer transition duration-200"
                onClick={() => getQuestionById(question._id)}
              >
                <p className="text-lg font-medium text-gray-800">
                  <span className="font-bold">{id + 1}.</span> {question.title}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-bold">Type:</span> {question.type}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg">No questions found. Try searching for something!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Result;
