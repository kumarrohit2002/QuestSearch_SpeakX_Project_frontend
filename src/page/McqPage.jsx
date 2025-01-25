import { useContext, useEffect, useState } from 'react';
import Pagination_Controller from '../components/Pagination_Controller';
import Search from '../components/Search';
import { QuestionContext } from '../context/QuestionContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const McqPage = () => {
    const { getQuestionById } = useContext(QuestionContext);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const base_url = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true); // Start loading
            try {
                const response = await fetch(
                    `${base_url}/api/questions?query=&page=${page}&limit=50&type=MCQ`
                );
                const data = await response.json();
                setQuestions(data.questions);
                setTotalPages(data.pagination.totalPages);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
            setLoading(false); // Stop loading
        };

        fetchQuestions();
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div>
            <Search />
            <div>
                <h1 className="text-center font-bold text-2xl m-4">All MCQ Questions</h1>

                {loading ? (
                    <Loader />
                ) : (
                    <div className="ml-5 flex flex-col gap-2 p-2 bg-red-200">
                        {questions.length > 0 ? (
                            questions.map((question, index) => (
                                <div key={question._id}>
                                    <h3
                                        className="text-md px-2 bg-gray-100 rounded-md cursor-pointer"
                                        onClick={() => {
                                            getQuestionById(question._id);
                                            navigate('/mcq');
                                        }}
                                    >
                                        {`${(page - 1) * 50 + index + 1}. ${question.title}`}
                                    </h3>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-600">No MCQ questions found.</p>
                        )}
                    </div>
                )}

                <Pagination_Controller handlePageChange={handlePageChange} page={page} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default McqPage;
