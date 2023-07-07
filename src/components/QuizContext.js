import React, { createContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizId, setQuizId] = useState(null);
  const [quizName, setQuizName] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const negativ = 1;

  return (
    <QuizContext.Provider value={{ quizId, setQuizId, quizName, setQuizName, questions, setQuestions, userAnswers, setUserAnswers,negativ }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
