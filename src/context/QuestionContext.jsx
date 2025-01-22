import { createContext, useState } from 'react';
import { fetchQuestionById, searchQuestions as searchQuestionsFromService } from '../services/questionService';

export const QuestionContext = createContext();

// In QuestionProvider.jsx
export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchQuestions = async (query) => {
    setLoading(true);
    setError(null);
    try {
      setQuestions(null);
      const results = await searchQuestionsFromService(query); 
      setQuestions(results);
    } catch (err) {
      setError(err.message || 'Error fetching questions');
    } finally {
      setLoading(false);
    }
  };

  const getQuestionById = async (questionId) => {
    setLoading(true);
    setError(null);
    try {
      const question = await fetchQuestionById(questionId); 
      setSelectedQuestion(question); 
    } catch (err) {
      setError(err.message || 'Error fetching question by ID');
    } finally {
      setLoading(false);
    }
  };

  const clearSelectedQuestion = () => {
    setSelectedQuestion(null);
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        selectedQuestion,
        searchQuestions,
        getQuestionById,
        clearSelectedQuestion,
        loading,
        error,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;
