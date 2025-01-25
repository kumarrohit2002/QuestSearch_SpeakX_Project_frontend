import { useContext, useState, useEffect } from "react";
import { QuestionContext } from "../context/QuestionContext";
import NavBar from "./NavBar";
import Loader from "./Loader";

const Option = ({ text, isSelected, isSubmitted, isCorrect, onSelect }) => {
  const bgColor = isSubmitted
    ? isCorrect
      ? "bg-green-100 border-green-500 text-green-700"
      : "bg-red-100 border-red-500 text-red-700"
    : isSelected
    ? "bg-blue-50 border-blue-500"
    : "bg-white border-gray-300";

  return (
    <div
      onClick={onSelect}
      className={`flex items-center p-3 my-2 rounded-lg border cursor-pointer transition-all hover:shadow-md ${bgColor}`}
    >
      <div
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 ${
          isSelected || isSubmitted
            ? isCorrect
              ? "bg-green-500 border-green-500"
              : "bg-red-500 border-red-500"
            : "border-gray-400"
        }`}
      />
      <span
        className={`font-medium ${
          isSubmitted ? (isCorrect ? "text-green-700" : "text-red-700") : ""
        }`}
      >
        {text}
      </span>
    </div>
  );
};

const MCQ = () => {
  const { selectedQuestion } = useContext(QuestionContext);
  const question = selectedQuestion;
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setSubmitted(false);
  }, [selectedQuestion]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const submitAnswer = () => {
    if (!selectedOption) return;
    setSubmitted(true);
  };

  if (!question) {
    return <div>
                <NavBar/>
                <Loader/>
            </div>
  }

  return (
    <div>
      <NavBar />
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
        {question!==null ? (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{question.title}</h3>
            <div>
              {question.options.map((option, index) => (
                <Option
                  key={index}
                  text={option.text}
                  isSelected={selectedOption === option}
                  isSubmitted={submitted}
                  isCorrect={submitted && option.isCorrectAnswer}
                  onSelect={() => handleOptionSelect(option)}
                />
              ))}
            </div>
            <button
              onClick={submitAnswer}
              className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
              disabled={submitted} // Disable button after submission
            >
              {submitted ? "Submitted" : "Submit"}
            </button>
          </>
        ) : (
          <p className="text-center text-gray-500 font-medium">Locating question...</p>
        )}
      </div>
    </div>
  );
};

export default MCQ;
