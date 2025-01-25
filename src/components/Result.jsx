import { useContext } from "react";
import { QuestionContext } from "../context/QuestionContext";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import Pagination_Controller from "./Pagination_Controller"; // Import pagination component

const Result = () => {
  const { questions, getQuestionById, error, pagination, searchQuestions } = useContext(QuestionContext);
  const navigate = useNavigate();

  // Function to handle page change
  const pageHandler = (page) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      searchQuestions(null, page);
    }
  };

  // Function to handle navigation based on question type
  const navigateHandler = (type) => {
    const routes = {
      MCQ: "/mcq",
      ANAGRAM: "/anagram",
      READ_ALONG: "/read_along",
      CONTENT_ONLY: "/content_only",
    };
    navigate(routes[type] || "/");
  };

  return (
    <div>
      <Search/>
      <div className="p-6 bg-green-200">
        <h3 className="text-3xl font-bold text-center mb-4">Similar Question Titles</h3>
        <p className="text-xl font-semibold mb-2 text-gray-700">Title</p>

        {error && <p className="text-center text-red-600 text-lg">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions && questions.length > 0 ? (
            questions.map((question, index) => {
              // Corrected global indexing for pagination
              const globalIndex = (pagination.page - 1) * pagination.limit + index + 1;

              return (
                <div
                  key={question._id}
                  className="bg-gray-100 p-4 rounded-md shadow-md border hover:bg-gray-200 cursor-pointer transition duration-200"
                  onClick={() => {
                    navigateHandler(question.type);
                    getQuestionById(question._id);
                  }}
                >
                  <p className="text-lg font-medium text-gray-800">
                    <span className="font-bold">{globalIndex}.</span> {question.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-bold">Type:</span> {question.type}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600 text-lg">
              No questions found. Try searching for something!
            </p>
          )}
        </div>
      </div>

      {/* Pagination Component */}
      {pagination && pagination.totalPages > 1 && (
        <Pagination_Controller
          handlePageChange={pageHandler}
          page={pagination.page}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  );
};

export default Result;
