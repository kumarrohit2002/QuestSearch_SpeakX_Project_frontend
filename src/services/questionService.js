// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL ="https://demo-deployment-2c3s.onrender.com";

export const fetchSuggestions = async (query) => {
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

export const searchQuestions = async (query) => {
  try {
    if (!query || query.trim().length === 0) {
      throw new Error("Query cannot be empty");
    }

    const response = await fetch(`${BASE_URL}/api/questions?query=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.questions || [];
  } catch (error) {
    console.error("Error fetching questions:", error.message || error);
    return [];
  }
};

export const fetchQuestionById = async (questionId) => {
  try {
    if (!questionId) {
      throw new Error("Question ID is required");
    }

    const response = await fetch(`${BASE_URL}/api/questionsById/${questionId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch question details');
    }

    const data = await response.json();
    return data?.question || null;
  } catch (error) {
    console.error("Error fetching question by ID:", error.message || error);
    throw new Error(error.message || 'An error occurred while fetching the question');
  }
};
