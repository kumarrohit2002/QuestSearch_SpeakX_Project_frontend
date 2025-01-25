import { Routes, Route, Navigate } from "react-router-dom";
import QuestionProvider from './context/QuestionContext';
import HomePage from './page/HomePage';
import McqPage from './page/McqPage';
import Read_AlongPage from './page/Read_AlongPage';
import Content_OnlyPage from './page/Content_OnlyPage';
import AllQuestionPage from './page/AllQuestionPage';
import AnagramPage from './page/AnagramPage';
import Mcq from './components/Mcq';
import READ_ALONG from './components/Read_Along';
import CONTENT_ONLY from './components/Content_Only';
import Anagram from './components/Anagram';

const App = () => {
  return (
    <QuestionProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/allquestionPage" element={<AllQuestionPage />} />
        <Route path="/content_onlypage" element={<Content_OnlyPage />} />
        <Route path="/anagrampage" element={<AnagramPage />} />
        <Route path="/read_alongpage" element={<Read_AlongPage />} />
        <Route path="/mcqpage" element={<McqPage />} />


        <Route path="/mcq" element={<Mcq />} />
        <Route path="/read_along" element={<READ_ALONG />} />
        <Route path="/anagram" element={<Anagram />} />
        <Route path="/content_only" element={<CONTENT_ONLY />} />
      </Routes>
    </QuestionProvider>
  );
};

export default App;
