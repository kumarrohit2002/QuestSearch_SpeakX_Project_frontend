
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchSuggestions = async (query,) => {
  try {
    if (!query || query.trim().length === 0) {
      throw new Error("Query cannot be empty");
    }
    const response = await fetch(`${BASE_URL}/api/autocomplete?query=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error("Error fetching suggestions:", error.message || error);
    return [];
  }
};

export const searchQuestions = async (query, page = 1) => {
  try {
    if (!query) {
      query = localStorage.getItem('query');
    }
    if (!query || query.trim().length === 0) {
      throw new Error("Query cannot be empty");
    }

    const response = await fetch(
      `${BASE_URL}/api/questions?query=${query}&page=${page}&limit=30&type=all`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    localStorage.setItem('query', query); // Store query in localStorage
    const data = await response.json();

    return {
      questions: data.questions || [],
      pagination: data.pagination || {}, // Ensure pagination data is returned
    };
  } catch (error) {
    console.error("Error fetching questions:", error.message || error);
    return { questions: [], pagination: {} };
  }
};



export const fetchQuestionById = async (questionId) => {
  try {
    if (!questionId) {
      throw new Error("Question ID is required");
    }
    const response = await fetch(`${BASE_URL}/api/questionsById/${questionId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch question details");
    }
    const data = await response.json();
    const question = data?.question || null;
    return question;
  } catch (error) {
    console.error("Error fetching question by ID:", error.message || error);
    throw new Error(error.message || "An error occurred while fetching the question");
  }
};
