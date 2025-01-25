import { useState, useContext } from 'react';
import { fetchSuggestions } from '../services/questionService';
import { QuestionContext } from '../context/QuestionContext';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Search = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const { searchQuestions, setQuestions } = useContext(QuestionContext);
  const navigate = useNavigate();
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
        navigate(`/`);
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
    <div>
      <NavBar/>
      <div className="flex flex-col items-center justify-center  bg-gray-100 p-4">
        <h1 className="text-6xl font-bold text-[#fe913a] mb-4">SpeakX</h1>
        <div className="relative w-full max-w-[480px]">
          <div className="flex items-center border-2 border-gray-400 rounded-full shadow-md bg-white">
            <input
              type="text"
              className="flex-1 text-lg px-4 py-3 rounded-full focus:outline-none focus:ring-0"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search questions..."
            />
            <button
              onClick={() => handleSearch()}
              disabled={!query.trim() || searching}
              className={`${
                !query.trim() || searching
                  ? 'bg-orange-400 text-gray-200 cursor-not-allowed'
                  : 'bg-[#fe913a] text-white'
              } w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-110 mx-2`}
            >
              <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M10.5,0C4.686,0,0,4.686,0,10.5S4.686,21,10.5,21c2.543,0,4.876-0.91,6.706-2.394l5.352,5.352 c0.391,0.391,1.022,0.391,1.414,0s0.391-1.022,0-1.414l-5.352-5.352C19.09,15.376,21,13.043,21,10.5C21,4.686,16.314,0,10.5,0z M10.5,18c-4.134,0-7.5-3.366-7.5-7.5S6.366,3,10.5,3S18,6.366,18,10.5S14.634,18,10.5,18z"
                />
              </svg>
            </button>
          </div>

          {isLoading && (
            <p className="absolute top-full left-0 text-sm text-gray-500">Loading...</p>
          )}
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
      </div>
    </div>
  );
};

export default Search;
