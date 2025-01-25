import { useContext, useEffect } from "react";
import { QuestionContext } from "../context/QuestionContext";
import NavBar from "./NavBar";

const CONTENT_ONLY = () => {
  const { selectedQuestion } = useContext(QuestionContext);
  const question = selectedQuestion;

  useEffect(() => {
  }, [question]); 
  
  if (!question) {
    return <div className="text-center text-gray-500 font-medium">Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="content-only-container p-4 border rounded-lg shadow-lg bg-sky-400">
        <h2 className="text-lg font-bold mb-4">Content Only</h2>
        <p className="text-gray-700">{question.title}</p>
      </div>
    </div>
  );
};

export default CONTENT_ONLY;
