import React, { useState } from 'react';
import QuizContext from './QuizContext';

const QuizProvider = ({ children }) => {
  const [quizId, setQuizId] = useState(null);
  const [quizName, setQuizName] = useState(null); // dodane
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  return (
    <QuizContext.Provider value={{ quizId, setQuizId, quizName, setQuizName, questions, setQuestions, userAnswers, setUserAnswers, currentQuestionIndex, setCurrentQuestionIndex }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
