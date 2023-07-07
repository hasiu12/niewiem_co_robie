import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizProvider from './components/QuizProvider';
import QuizSelection from './components/QuizSelection';
import QuestionView from './components/QuestionView';
import QuizSummary from './components/QuizSummary';
import Login from './components/xD';

const App = () => {
  return (
    <QuizProvider>
      <Router>
      <Login />
        <Routes>
          <Route path="/" element={<QuizSelection />} />
          <Route path="/quiz/:quizId" element={<QuestionView />} />
          <Route path="/summary" element={<QuizSummary />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Login />
      </Router>
    </QuizProvider>
  );
};

export default App;
