import Search from './components/Search';
import Result from './components/Result';
import QuestionProvider from './context/QuestionContext';

const App = () => {

  const handleRefresh = () => {
    window.location.reload(); 
  };

  return (
    <QuestionProvider>
      <div>
        <h1 className="text-3xl font-bold ml-5 mt-1 cursor-pointer" onClick={handleRefresh}>QuestSearch</h1>
        <Search />
        <Result />
      </div>
    </QuestionProvider>
  );
};

export default App;
