import { useState, useContext } from 'react';
import { fetchSuggestions } from '../services/questionService';
import { QuestionContext } from '../context/QuestionContext';

const Search = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const { searchQuestions, setQuestions } = useContext(QuestionContext);
  let timer;
  const [searching, setSearching] = useState(false); 

  const handleInputChange = (e) => {
    const value = e.target.value || ''; 
    setQuery(value);

    if (value.length > 3) {
      clearTimeout(timer);
      setIsLoading(true);
      timer = setTimeout(async () => {
        try {
          const data = await fetchSuggestions(value);
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async (searchQuery = query) => {
    if (searchQuery && !searching) {
      setSearching(true); 
      setQuestions(null);
      setSuggestions([]); 
      setActiveSuggestionIndex(-1); 

      try {
        await searchQuestions(searchQuery);
      } catch (error) {
        console.error("Error searching questions:", error);
      } finally {
        setSearching(false); 
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveSuggestionIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestionIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      setQuery(suggestions[activeSuggestionIndex]);
      handleSearch(suggestions[activeSuggestionIndex]);
    } else if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4">
      <div className="relative w-full sm:w-1/3">
        <input
          type="text"
          className="border-2 border-gray-400 text-lg px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search questions..."
        />
        {isLoading && <p className="absolute top-full left-0 text-sm text-gray-500">Loading...</p>}
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border mt-1 rounded-md w-full shadow-lg">
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                onClick={() => handleSuggestionClick(s)}
                className={`px-4 py-2 cursor-pointer ${activeSuggestionIndex === idx ? 'bg-gray-200' : ''} hover:bg-gray-200`}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={() => handleSearch()}
        disabled={!query.trim() || searching} 
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
